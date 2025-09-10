import {db} from "@/db";
import Link from "next/link";
import {notFound} from "next/navigation";

export default async function SnippetDetailPage({params}: {params: {id: string}}) {

	const snippet = await db.snippet.findUnique({
		where: {
			id: parseInt(params.id),
		},
	});

	if (!snippet) {
		notFound();
	}

	return (<div className="max-w-3xl mx-auto">
		<div className="flex justify-between items-center mb-12 border-b border-gray-300 pb-2 pt-2">
			<h1 className="text-2xl font-bold">{snippet?.title}</h1>
			<Link href="/" className="text-blue-500 hover:text-blue-700 hover:underline text-lg font-bold">Back to Snippets</Link>

		</div>
		<div className="flex justify-between items-center border-b border-gray-300 pb-2 pt-2">
			<button className="bg-green-500 text-white p-2 rounded-md">Edit</button>
			<button className="bg-red-500 text-white p-2 rounded-md">Delete</button>
		</div>
		<h1 className="text-2xl font-bold mb-12 mt-4">{snippet?.title}</h1>
		<pre className="bg-gray-100 p-4 rounded-md">
			<code>
				{snippet?.code}
			</code>
		</pre>
	</div>);
}