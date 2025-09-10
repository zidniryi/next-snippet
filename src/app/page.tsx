import {db} from "@/db";

export default async function Home() {
  const snippets = await db.snippet.findMany();

  const renderSnippets = snippets.map((snippet) => (
    <div key={snippet.id}>
      <h2>{snippet.title}</h2>
      <p>{snippet.code}</p>
    </div>
  ));

  const renderedSnippets = renderSnippets.length > 0 ? renderSnippets : <p>No snippets found</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">Home</h1>
      {renderedSnippets}
    </div>
  );
}
