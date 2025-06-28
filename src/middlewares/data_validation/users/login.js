export default function validate_user_login(req, res, next) {
  if (!req.body) {
    if (req.requestType === "web") {
      return res.render("tease-hacker", { message: "Nice hacking into Kiddo" });
    } else {
      return res.status(400).send("Body missing");
    }
  }
  console.log(req.body);
  let errors = [];
  const { email, password } = req.body;

  if (!email || !password) {
    errors.push("Email and password required");
  }

  if (errors.length > 0) {
    if (req.requestType === "web") {
      return res.render("login", { errors });
    }
    return res.status(400).send(errors);
  }
  console.log("PAssed Validation");
  next();
}
