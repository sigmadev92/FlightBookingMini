import express from "express";

const apiRoutes = express.Router();

apiRoutes.get("/", (req, res) => {
  res.send("/api");
});
export default apiRoutes;
