export const MONGODB_CONFIG = {
    uri: process.env.MONGODB_URI || "",
    dbName: "shorturl",
    collections: {
        urls: "urls"
    },
    ttl: {
        seconds: 86400
    }

} as const;