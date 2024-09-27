const express =  require("express");

const app = express();

app.use("/auth", require("./auth.route"));
app.use("/post", require("./blog.route"));



module.exports = app;