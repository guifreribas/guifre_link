// pages/api/shorten.js
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
	if (req.method === "POST") {
		const { originalUrl } = req.body;

		try {
			const client = await clientPromise;
			const db = client.db("shorturl");

			// Generar l'URL curta
			const shortUrl = Math.random().toString(36).substring(2, 7);

			// Inserir a la base de dades
			const result = await db.collection("urls").insertOne({
				originalUrl,
				shortUrl,
				createdAt: new Date(),
			});
			console.log(result);

			res.status(200).json({ shortUrl });
		} catch (error) {
			res.status(500).json({
				error: "Error al guardar a la base de dades",
				message: error.message,
			});
		}
	} else {
		res.status(405).json({ message: "Només s'accepten peticions POST" });
	}
}
