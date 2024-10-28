import express from "express";
import apiRoutes from "./api-routes/index.mjs";
import "./helpers/db.mjs";
import path from "path";

const PORT = process.env.PORT || 8080;
const app = express();

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//   })
// );
app.use("/", express.static("build"));

app.use(express.json());
app.use("/api", apiRoutes);

app.get("*", function (req, res) {
  const indexHTML = path.resolve("build", "index.html");
  res.sendFile(indexHTML);
});

app.use(function (err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err.message });
});
app.use((req, res) => {
  res.status(404).json({ msg: "Not found" });
});

app.get("/", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Server start: http://localhost:${PORT} `);
});
