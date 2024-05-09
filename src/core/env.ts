import dotenv from "dotenv";

dotenv.config();

process.env.BOT_TOKEN = process.env.BOT_TOKEN || "#abb1c2";

export default process.env;
