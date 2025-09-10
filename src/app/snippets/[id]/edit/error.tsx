'use client';

import {useEffect} from 'react';
import Link from 'next/link';

export default function Error({
	error,
	reset,
}: {
	error: Error & {digest?: string};
	reset: () => void;
}) {
	useEffect(() => {
		console.error('Edit snippet error:', error);
	}, [error]);

	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="bg-white rounded-lg shadow-sm border border-red-200 p-6">
					<div className="text-center">
						<svg className="mx-auto h-12 w-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
						</svg>
						<h2 className="mt-4 text-lg font-medium text-gray-900">Failed to load snippet editor</h2>
						<p className="mt-2 text-sm text-gray-600">
							There was an error loading the snippet editor. This might be due to a network issue or the snippet might not exist.
						</p>
						<div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
							<button
								onClick={reset}
								className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
							>
								Try again
							</button>
							<Link
								href="/"
								className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
							>
								Back to Snippets
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
