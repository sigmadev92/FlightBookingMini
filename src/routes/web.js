import express from "express";
import userWebRoutes from "../features/user/user.web.routes.js";

const webRoutes = express.Router();

webRoutes.use("/users", userWebRoutes);

webRoutes.get("/offers", (req, res) => {
  res.render("offers");
});

webRoutes.get("/faqs", (req, res) => {
  res.render("faq");
});

export default webRoutes;
