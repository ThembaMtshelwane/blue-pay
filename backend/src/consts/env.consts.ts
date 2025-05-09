import "dotenv/config";

export const PORT: number = Number(process.env.PORT) || 5000;
export const MONGO_URI: string = String(process.env.MONGO_URI || "mongodb+srv://thembamtshelwane3:8N0BXljG7IeyXpmi@cluster0.g5wyh0n.mongodb.net/bluepay?retryWrites=true&w=majority&appName=Cluster0");
export const NODE_ENV: string = String(process.env.NODE_ENV || "");
