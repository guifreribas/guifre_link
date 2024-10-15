// pages/api/shorten.js
import { NextResponse } from "next/server";
import clientPromise from "../../lib/mongodb";

export async function POST(request) {
	const { originalUrl } = await request.json();

	try {
		const client = await clientPromise;
		const db = client.db("shorturl");

		// Generar l'URL curta
		const baseUrl = "https://link.guifre.dev";
		const shortName = Math.random().toString(36).substring(2, 7);
		const shortUrl = `${baseUrl}/${shortName}`;
		console.log(db, originalUrl);
		console.log({ shortUrl });

		// Inserir a la base de dades
		const result = await db.collection("urls").insertOne({
			originalUrl,
			shortUrl,
			createdAt: new Date(),
		});
		console.log(result);

		return NextResponse.json({ success: true, shortUrl }, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{
				error: "Error al guardar a la base de dades",
				message: error.message,
			},
			{ status: 500 }
		);
	}
}

export async function GET() {
	return NextResponse.json({ message: "HELLO!" });
}
