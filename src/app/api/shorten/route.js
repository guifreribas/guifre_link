// pages/api/shorten.js
import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
	const { originalUrl } = await request.json();

	try {
		const client = await clientPromise;
		const db = client.db("shorturl");

		// Generar l'URL curta
		const shortName = Math.random().toString(36).substring(2, 9);
		const shortUrl = shortName;

		// Inserir a la base de dades
		await db.collection("urls").insertOne({
			originalUrl,
			shortUrl,
			createdAt: new Date(),
		});

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
