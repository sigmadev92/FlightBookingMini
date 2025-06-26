import express from "express";

const webRoutes = express.Router();

webRoutes.get("/", (req, res) => {
  res.send("hello");
});
webRoutes.get("/users/register", (req, res) => {
  res.render("register");
});
webRoutes.get("/users/login", (req, res) => {
  res.render("login");
});
webRoutes.get("/offers", (req, res) => {
  res.render("offers");
});

webRoutes.get("/faqs", (req, res) => {
  res.render("faq");
});

export default webRoutes;
