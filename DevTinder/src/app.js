const express = require('express');
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

const authRoute = require("./routes/auth");
const profileRoute = require("./routes/profile");
const requestRoute = require("./routes/request");
const userRoute = require("./routes/user");
const initializeSocket = require('./utils/socket');
const chatRoute = require('./routes/chat');

app.use("/",authRoute);
app.use("/", profileRoute);
app.use("/", requestRoute);
app.use("/", userRoute);
app.use("/", chatRoute);

const server = http.createServer(app);

initializeSocket(server);
    

connectDB()
.then(() => {
    console.log("MongoDB connected");
    server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
    });
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});




