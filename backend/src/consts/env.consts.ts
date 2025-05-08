import "dotenv/config";

export const PORT: number = Number(process.env.PORT) || 5000;
export const MONGO_URI: string = String(process.env.MONGO_URI || "");
