import express from "express";

const webRoutes = express.Router();

webRoutes.get("/", (req, res) => {
  res.send("hello");
});
export default webRoutes;
