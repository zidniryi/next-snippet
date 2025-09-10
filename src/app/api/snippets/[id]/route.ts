import {db} from "@/db";
import {NextRequest, NextResponse} from "next/server";

export async function PUT(
	request: NextRequest,
	{params}: {params: Promise<{id: string}>}
) {
	try {
		const resolvedParams = await params;
		const formData = await request.formData();
		const title = formData.get("title") as string;
		const code = formData.get("code") as string;
		const id = resolvedParams.id;

		if (!title || !code) {
			return NextResponse.json(
				{error: "Title and code are required"},
				{status: 400}
			);
		}

		const snippet = await db.snippet.update({
			where: {
				id: parseInt(id),
			},
			data: {
				title,
				code,
			},
		});

		return NextResponse.json(snippet);
	} catch (error) {
		console.error("Error updating snippet:", error);
		return NextResponse.json(
			{error: "Failed to update snippet"},
			{status: 500}
		);
	}
}
