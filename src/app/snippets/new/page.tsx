import Link from "next/link";
import SnippetEditForm from "@/components/snippet-edit-form";

export default function NewSnippetPage() {
	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<div>
							<h1 className="text-3xl font-bold text-gray-900">New Snippet</h1>
							<p className="text-gray-600 mt-1">Create a new code snippet</p>
						</div>
						<Link
							href="/"
							className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
						>
							<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
							</svg>
							Back to Snippets
						</Link>
					</div>
				</div>

				{/* Form */}
				<SnippetEditForm isEditing={false} />
			</div>
		</div>
	);
}