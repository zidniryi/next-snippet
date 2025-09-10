import {db} from "@/db";
import {NextRequest, NextResponse} from "next/server";

export async function POST(request: NextRequest) {
	try {
		const formData = await request.formData();
		const title = formData.get("title") as string;
		const code = formData.get("code") as string;

		if (!title || !code) {
			return NextResponse.json(
				{error: "Title and code are required"},
				{status: 400}
			);
		}

		const snippet = await db.snippet.create({
			data: {
				title,
				code,
			},
		});

		return NextResponse.json(snippet);
	} catch (error) {
		console.error("Error creating snippet:", error);
		return NextResponse.json(
			{error: "Failed to create snippet"},
			{status: 500}
		);
	}
}
