import {PrismaClient} from "../generated/prisma";

export const db = new PrismaClient();


db.snippet.create({
	data: {
		title: "Test",
		code: "console.log('Hello, world!');",
	},
});