import { ENV } from "./config";

let base_url;
if (ENV === "prod") {
	base_url = "https://guifre.link/";
} else {
	base_url = "http://localhost:3000/";
}

export const BASE_URL = base_url;
