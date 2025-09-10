import Link from "next/link";
import {notFound} from "next/navigation";

export default function SnippetNotFoundPage() {
	return <div>
		<h1 className="text-2xl font-bold">Snippet not found</h1>
		<p className="text-gray-500">The snippet you are looking for does not exist.</p>
		<Link href="/">Go back to the home page</Link>
	</div>;
}