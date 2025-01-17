const express = require("express");

const app = express();

app.get("/",(req, res) => {
  res.send("Hello from server");
});

app.use("/test",(req, res) => {
    res.send("Hello from test routes");
  });

  app.use("/test1",(req, res) => {
    res.send("Hello from test routes 1");
  });

  app.use("/test2",(req, res) => {
    res.send("Hello from test routes 2");
  });

app.listen(3004, () => {
  console.log("server sucessfully listening on port 3004");
});
