const express = require("express");
const mongoose = require("mongoose");
const app = express();
// const router = import("./router")
require("dotenv").config({ path: ".env" });

// mongoose.connect(process.env.mongodb+srv, {useNewUrlParser: true , useUnifiedTopology: true, useNewUrlParser: true  });


// app.use("/", router)

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    poolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
  };

//   console.log(process.env)
//   mongoose.connect(process.env, options);

var mongoDB = "mongodb://127.0.0.1/";
mongoose.connect(mongoDB, options);

const myDb = mongoose.connection;
myDb.on("error", console.error.bind(console, "connection error:"));
myDb.once("open", () => console.log(`we're connected!`));

const mySchema = new mongoose.Schema({
  name: String,
  nickName: String,
  age: Number,
});

const myModel = mongoose.model("modelName", mySchema);

// const example = new myModel({ name: "Silence", nickName: "alaa", age: 31 });
// console.log(example.name);

app.post("/", (req, res) =>{
  console.log(req.body)
  const user = req.body;

user.save((err, user) => {
  if (err) throw err;
  console.log(`${user.nickName} saved to myDb`);
});
})
const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`app is listening to http://localhost:${PORT}/`)
);
