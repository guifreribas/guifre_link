// src/global.d.ts o global.d.ts
import { MongoClient } from "mongodb";

declare global {
	// Afegim la propietat global per MongoDB
	namespace NodeJS {
		interface Global {
			_mongoClientPromise?: Promise<MongoClient>;
		}
	}
}

export {};
