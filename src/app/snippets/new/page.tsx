export default function NewSnippetPage() {
	return (
		<form >
			<h2 className="text-2xl font-bold">New Snippet</h2>
			<div className="flex flex-col gap-4 mb-5">
				<div className="flex flex-col gap-2">
					<label className="w-12" htmlFor="title">Title</label>
					<input className="border border-gray-300 rounded-md p-2" type="text" name="title" placeholder="Title" id="title" />
				</div>
				<div className="flex flex-col gap-2">
					<label className="w-12" htmlFor="code">Code</label>
					<textarea className="border border-gray-300 rounded-md p-2" name="code" placeholder="Code" id="code" />
				</div>
			</div>
			<button className="bg-blue-500 max-w-xs text-white p-2 rounded-md" type="submit">Create</button>
		</form >

	)
}