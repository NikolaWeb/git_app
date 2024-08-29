import express from "express";
import cors from "cors";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import messageRoute from "./routes/message.route.js";
import chatRoute from "./routes/chat.route.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
// import path from "path";

const app = express();
const port = process.env.PORT || 8800;

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

dotenv.config();

app.use(express.json());

app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/messages", messageRoute);
app.use("/api/chats", chatRoute);

// const __dirname1 = path.resolve();

// app.use(express.static(path.join(__dirname1, "../client/dist")));

// app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname1, "../client", "dist", "index.html"));
// });

app.listen(port, () => {
    console.log("Server is running!");
});