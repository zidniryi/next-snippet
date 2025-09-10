import {db} from "@/db";
import Link from "next/link";

export default async function Home() {
  const snippets = await db.snippet.findMany();

  const renderSnippets = snippets.map((snippet) => (
    <Link key={snippet.id} className="flex justify-between items-center border-b border-gray-300 pb-4 mb-4" href={`/snippets/${snippet.id}`}>
      <Link href={`/snippets/${snippet.id}`} className=" hover:underline text-lg font-bold">{snippet.title}</Link>
      <Link href={`/snippets/${snippet.id}`} className="text-blue-500 hover:text-blue-700 hover:underline text-lg font-bold">View Snippet</Link>
    </Link>
  ));

  const renderedSnippets = renderSnippets.length > 0 ? renderSnippets : <p>No snippets found</p>;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-12 border-b border-gray-300 pb-2 pt-2">
        <h1 className="text-2xl font-bold">Snippets</h1>
        <Link href="/snippets/new" className="bg-blue-500 text-white p-2 rounded-md">New Snippet</Link>
      </div>
      {renderedSnippets}
    </div>
  );
}
