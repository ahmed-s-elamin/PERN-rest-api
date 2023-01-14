const express = require("express");
const cors = require("cors");

const app = express();

//middleware
app.use(express.json());
app.use(cors());

//routes
const todoRouter = require("./routes/todos");
app.use("/todos", todoRouter);

//listening and port
const port = process.env.port || 3030;
app.listen(port, () => console.log("server running"));
