import {db} from "@/db";
import Link from "next/link";

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

export default async function Home() {
  const snippets = await db.snippet.findMany({
    orderBy: {
      id: 'desc'
    }
  });

  const renderSnippets = snippets.map((snippet) => (
    <div key={snippet.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{snippet.title}</h3>
          <p className="text-gray-600 text-sm mb-3">
            {snippet.code.length} characters • {snippet.code.split('\n').length} lines
          </p>
          <div className="bg-gray-50 rounded-md p-3 mb-4">
            <pre className="text-sm text-gray-700 font-mono overflow-hidden">
              <code className="line-clamp-3">{snippet.code.substring(0, 200)}{snippet.code.length > 200 ? '...' : ''}</code>
            </pre>
          </div>
        </div>

      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <Link
          href={`/snippets/${snippet.id}`}
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          View
        </Link>
        <Link
          href={`/snippets/${snippet.id}/edit`}
          className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit
        </Link>
      </div>
    </div>
  ));

  const emptyState = (
    <div className="text-center py-12">
      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <h3 className="mt-2 text-sm font-medium text-gray-900">No snippets</h3>
      <p className="mt-1 text-sm text-gray-500">Get started by creating a new code snippet.</p>
      <div className="mt-6">
        <Link
          href="/snippets/new"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Snippet
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Code Snippets</h1>
              <p className="text-gray-600 mt-1">
                {snippets.length === 0
                  ? "No snippets yet"
                  : `${snippets.length} snippet${snippets.length === 1 ? '' : 's'} total`
                }
              </p>
            </div>
            <Link
              href="/snippets/new"
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 shadow-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Snippet
            </Link>
          </div>
        </div>

        {/* Snippets List */}
        <div className="space-y-6">
          {snippets.length > 0 ? renderSnippets : emptyState}
        </div>
      </div>
    </div>
  );
}
