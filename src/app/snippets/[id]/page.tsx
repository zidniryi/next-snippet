import {db} from "@/db";
import Link from "next/link";
import {notFound, redirect} from "next/navigation";

export default async function SnippetDetailPage({params}: {params: Promise<{id: string}>}) {

	const resolvedParams = await params;

	const snippet = await db.snippet.findUnique({
		where: {
			id: parseInt(resolvedParams.id),
		},
	});

	if (!snippet) {
		notFound();
	}

	async function deleteSnippet(formData: FormData) {
		"use server";
		const id = formData.get("id") as string;
		await db.snippet.delete({
			where: {id: parseInt(id)},
		});
		redirect("/");
	}

	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<div>
							<h1 className="text-3xl font-bold text-gray-900">{snippet.title}</h1>
							<p className="text-gray-600 mt-1">Code Snippet</p>
						</div>
						<div className="flex flex-col sm:flex-row gap-3">
							<Link
								href="/"
								className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
							>
								<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
								</svg>
								Back to Snippets
							</Link>
							<Link
								href={`/snippets/${resolvedParams.id}/edit`}
								className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
							>
								<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
								</svg>
								Edit Snippet
							</Link>
							<form action={deleteSnippet}>
								<input type="hidden" name="id" value={resolvedParams.id} />
								<button
									className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
									type="submit"
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

				{/* Code Display */}
				<div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
					<div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
						<div className="flex items-center justify-between">
							<h2 className="text-sm font-medium text-gray-700">Code</h2>
							<div className="text-xs text-gray-500">
								{snippet.code.split('\n').length} lines • {snippet.code.length} characters
							</div>
						</div>
					</div>
					<div className="p-6">
						<pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto text-sm leading-relaxed">
							<code className="font-mono whitespace-pre-wrap">{snippet.code}</code>
						</pre>
					</div>
				</div>

				{/* Metadata */}
				<div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
					<h3 className="text-lg font-medium text-gray-900 mb-4">Snippet Details</h3>
					<dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div>
							<dt className="text-sm font-medium text-gray-500">Title</dt>
							<dd className="mt-1 text-sm text-gray-900">{snippet.title}</dd>
						</div>
						<div>
							<dt className="text-sm font-medium text-gray-500">ID</dt>
							<dd className="mt-1 text-sm text-gray-900">#{snippet.id}</dd>
						</div>
						<div>
							<dt className="text-sm font-medium text-gray-500">Code Length</dt>
							<dd className="mt-1 text-sm text-gray-900">{snippet.code.length} characters</dd>
						</div>
						<div>
							<dt className="text-sm font-medium text-gray-500">Lines</dt>
							<dd className="mt-1 text-sm text-gray-900">{snippet.code.split('\n').length} lines</dd>
						</div>
					</dl>
				</div>
			</div>
		</div>
	);
}