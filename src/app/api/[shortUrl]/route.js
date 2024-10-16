import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

export async function GET(request, { params }) {
	const { shortUrl } = params;

	try {
		const client = await clientPromise;
		const db = client.db("shorturl");

		const urlEntry = await db
			.collection("urls")
			.findOne({ shortUrl: String(shortUrl) });

		if (!urlEntry) {
			return NextResponse.json(
				{ message: "URL no trobada" },
				{ status: 404 }
			);
		}
		return NextResponse.redirect(urlEntry.originalUrl, 301);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Error al recuperar l'URL" },
			{ status: 500 }
		);
	}
}
