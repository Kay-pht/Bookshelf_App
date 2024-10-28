import express from "express";
import booksRouter from "./books.mjs";

const apiRoutes = express.Router();
apiRoutes.use("/books", booksRouter);

export default apiRoutes;
