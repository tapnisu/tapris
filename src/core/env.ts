import dotenv from "dotenv";

dotenv.config();
process.env.BOT_COLOR = process.env.BOT_COLOR || "#abb1c2";

export default process.env;
