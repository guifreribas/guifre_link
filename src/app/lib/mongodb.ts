import { MongoClient, MongoClientOptions } from "mongodb";
import { MONGODB_CONFIG } from "@/app/config/mongodb";

const uri: string = MONGODB_CONFIG.uri;
const options: MongoClientOptions = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Tipatge explícit per a globalThis
interface CustomNodeJsGlobal extends NodeJS.Global {
	_mongoClientPromise?: Promise<MongoClient>;
}

// Assignar globalThis a la variable amb el tipus definit
const globalWithMongoClientPromise: CustomNodeJsGlobal =
	global as CustomNodeJsGlobal;

if (!uri) {
	throw new Error("Missing MONGODB_URI - Please check your environment variables");
}

if (process.env.NODE_ENV === "development") {
	if (!globalWithMongoClientPromise._mongoClientPromise) {
		client = new MongoClient(uri, options);
		globalWithMongoClientPromise._mongoClientPromise = client.connect();
	}
	clientPromise = globalWithMongoClientPromise._mongoClientPromise;
} else {
	client = new MongoClient(uri, options);
	clientPromise = client.connect();
}

const setupTTLIndex = async () => {
	try {
		const client = await clientPromise;
		const db = client.db(MONGODB_CONFIG.dbName);
		await db.collection(MONGODB_CONFIG.collections.urls).createIndex({ createdAt: 1 }, { expireAfterSeconds: MONGODB_CONFIG.ttl.seconds });
		console.log("TTL index created successfully");
	} catch (error) {
		console.error("Error creating TTL index:", error);
	}
}

setupTTLIndex();

export default clientPromise;
