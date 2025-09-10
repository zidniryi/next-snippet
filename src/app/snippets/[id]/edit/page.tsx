import {db} from "@/db";
import Link from "next/link";
import {redirect} from "next/navigation";

export default async function EditSnippetPage({params}: {params: Promise<{id: string}>}) {

	async function editSnippet(formData: FormData) {
		"use server";
		const title = formData.get("title") as string;
		const code = formData.get("code") as string;
		const id = formData.get("id") as string;
		await db.snippet.update({
			where: {
				id: parseInt(id),
			},
			data: {
				title,
				code,
			},
		});
		redirect(`/snippets/${id}`);
	}

	async function getSnippet(id: string) {
		"use server";
		const snippet = await db.snippet.findUnique({
			where: {id: parseInt(id)},
		});
		return snippet;
	}

	async function deleteSnippet(formData: FormData) {
		"use server";
		const id = formData.get("id") as string;
		await db.snippet.delete({
			where: {id: parseInt(id)},
		});
		redirect("/");
	}

	const resolvedParams = await params;
	const snippet = await getSnippet(resolvedParams.id);

	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<div>
							<h1 className="text-3xl font-bold text-gray-900">Edit Snippet</h1>
							<p className="text-gray-600 mt-1">Update your code snippet</p>
						</div>
						<div className="flex flex-col sm:flex-row gap-3">
							<Link
								href={`/snippets/${resolvedParams.id}`}
								className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
							>
								<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
								</svg>
								Back to Snippet
							</Link>
							<form action={deleteSnippet}>
								<input type="hidden" name="id" value={resolvedParams.id} />
								<button
									className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
									type="submit"
									formAction={deleteSnippet}
								>
									<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
									</svg>
									Delete
								</button>
							</form>
						</div>
					</div>
				</div>

				{/* Form */}
				<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
					<form action={editSnippet} className="space-y-6">
						<input type="hidden" name="id" value={resolvedParams.id} />

						{/* Title Field */}
						<div>
							<label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
								Title
							</label>
							<input
								type="text"
								id="title"
								name="title"
								placeholder="Enter snippet title..."
								defaultValue={snippet?.title || ""}
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
								required
							/>
						</div>

						{/* Code Field */}
						<div>
							<label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
								Code
							</label>
							<textarea
								id="code"
								name="code"
								placeholder="Enter your code here..."
								defaultValue={snippet?.code || ""}
								rows={15}
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900 placeholder-gray-500 font-mono text-sm resize-vertical"
								required
							/>
						</div>

						{/* Submit Button */}
						<div className="flex justify-end pt-4 border-t border-gray-200">
							<button
								className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 shadow-sm"
								type="submit"
							>
								<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
								</svg>
								Save Changes
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}