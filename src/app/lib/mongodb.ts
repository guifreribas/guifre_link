import { MongoClient, MongoClientOptions } from "mongodb";

const uri: string = process.env.MONGODB_URI || "";
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
	throw new Error("Please add your Mongo URI to .env.local");
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

export default clientPromise;
