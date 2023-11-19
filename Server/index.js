const connectToMongo = require("./db")
const express = require('express');
const app = express();
connectToMongo()

var cors = require("cors");
app.use(cors())

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/hello.html");
});

app.use(express.json())
app.use("/auth", require("./routes/auth"))
app.use("/notes", require("./routes/notes"))

app.listen(5000, () => {
    console.log("Server is running")
})