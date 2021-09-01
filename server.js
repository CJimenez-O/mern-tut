const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const port = 4000;

mongoose.connect("mongodb://localhost/todo", {
	useUnifiedTopology: true,
	useNewUrlParser: true,
});

const userSchema = mongoose.Schema({
	username: String,
	password: String,
});

const User = mongoose.model("User", userSchema);

app.use(cors());

app.post("/register", async (req, res) => {
	const { username, password } = req.body;
	const users = await User.findOne({ username: username }).exec();
	if (users) {
		res.status(500);
		res.json({
			message: "user already exist",
		});
		return;
	}
	await User.create({ username, password });
	res.json({
		message: "success",
	});
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
	app.listen(port, () => {
		console.log(`Example app listening at http://localhost:${port}`);
	});
});
