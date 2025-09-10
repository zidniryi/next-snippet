'use client';

import {useState, useRef} from 'react';
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
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

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
				console.error('Failed to save snippet');
				alert('Failed to save snippet. Please try again.');
			}
		} catch (error) {
			console.error('Error saving snippet:', error);
			alert('An error occurred while saving the snippet.');
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleEditorChange = (value: string | undefined) => {
		setCode(value || '');
	};

	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
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
