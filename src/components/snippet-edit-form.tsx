'use client';

import {useState, useEffect} from 'react';
import Editor from '@monaco-editor/react';
import {useRouter} from 'next/navigation';

interface SnippetEditFormProps {
	snippet?: {
		id: number;
		title: string;
		code: string;
	};
	isEditing?: boolean;
}

export default function SnippetEditForm({snippet, isEditing = false}: SnippetEditFormProps) {
	const [title, setTitle] = useState(snippet?.title || '');
	const [code, setCode] = useState(snippet?.code || '');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isMounted, setIsMounted] = useState(false);
	const router = useRouter();

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError(null);

		try {
			const formData = new FormData();
			formData.append('title', title);
			formData.append('code', code);
			if (snippet) {
				formData.append('id', snippet.id.toString());
			}

			const url = isEditing ? `/api/snippets/${snippet?.id}` : '/api/snippets';
			const method = isEditing ? 'PUT' : 'POST';

			const response = await fetch(url, {
				method,
				body: formData,
			});

			if (response.ok) {
				if (isEditing) {
					router.push(`/snippets/${snippet?.id}`);
				} else {
					router.push('/');
				}
			} else {
				const errorData = await response.json();
				setError(errorData.error || 'Failed to save snippet. Please try again.');
			}
		} catch (error) {
			console.error('Error saving snippet:', error);
			setError('An error occurred while saving the snippet. Please check your connection and try again.');
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleEditorChange = (value: string | undefined) => {
		setCode(value || '');
	};

	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
			{error && (
				<div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
					<div className="flex">
						<svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
						</svg>
						<div>
							<h3 className="text-sm font-medium text-red-800">Error</h3>
							<p className="text-sm text-red-700 mt-1">{error}</p>
						</div>
					</div>
				</div>
			)}
			<form onSubmit={handleSubmit} className="space-y-6">
				{/* Title Field */}
				<div>
					<label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
						Title
					</label>
					<input
						type="text"
						id="title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Enter snippet title..."
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
						required
					/>
				</div>

				{/* Code Editor */}
				<div>
					<label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
						Code
					</label>
					<div className="border border-gray-300 rounded-lg overflow-hidden">
						{isMounted ? (
							<Editor
								height="400px"
								defaultLanguage="javascript"
								value={code}
								onChange={handleEditorChange}
								theme="vs-dark"
								options={{
									minimap: {enabled: false},
									scrollBeyondLastLine: false,
									fontSize: 14,
									lineNumbers: 'on',
									roundedSelection: false,
									scrollbar: {
										vertical: 'auto',
										horizontal: 'auto',
									},
									automaticLayout: true,
									tabSize: 2,
									insertSpaces: true,
									wordWrap: 'on',
									folding: true,
									lineDecorationsWidth: 10,
									lineNumbersMinChars: 3,
									renderLineHighlight: 'line',
									selectOnLineNumbers: true,
									cursorStyle: 'line',
									cursorBlinking: 'blink',
								}}
							/>
						) : (
							<div className="h-[400px] flex items-center justify-center bg-gray-50">
								<div className="text-center">
									<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
									<p className="text-sm text-gray-600">Loading editor...</p>
								</div>
							</div>
						)}
					</div>
				</div>

				{/* Submit Button */}
				<div className="flex justify-end pt-4 border-t border-gray-200">
					<button
						type="submit"
						disabled={isSubmitting || !title.trim() || !code.trim()}
						className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isSubmitting ? (
							<>
								<svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
									<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
									<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
								{isEditing ? 'Updating...' : 'Creating...'}
							</>
						) : (
							<>
								<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
								</svg>
								{isEditing ? 'Update Snippet' : 'Create Snippet'}
							</>
						)}
					</button>
				</div>
			</form>
		</div>
	);
}
