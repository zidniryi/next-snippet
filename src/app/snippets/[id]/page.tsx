import {db} from "@/db";
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

	return <div>
		<h1 className="text-2xl font-bold">{snippet?.title}</h1>
		<p className="text-gray-500">{snippet?.code}</p>
	</div>;
}