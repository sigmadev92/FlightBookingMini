import { isValidEmail, isValidPassword } from "../../validation-helper.js";

export function validate_user_reg(req, res, next) {
  if (!req.body) {
    if (req.requestType === "web") {
      return res.render("tease-hacker", { message: "Nice hacking into Kiddo" });
    } else {
      return res.status(400).send("Body missing");
    }
  }
  let errors = [];
  console.log(req.body);
  console.log(req.file);
  if (req.file) {
    //what is signiqfies?
    // It ensures user has send the data throught multipart form data which includes a file for sure.
    // req.body doesn't contain the field profilePicture
    // Request.body is not in JSON format
    req.body.profilePicture = req.file.filename;
  }
  const { name, email, password, role, gender, profilePicture, testMail } =
    req.body;

  if (testMail === undefined || testMail === "false" || testMail === false) {
    req.body.testMail = false;
  } else {
    req.body.testMail = true;
  }
  if (!name) {
    errors.push("Name is required");
  } else if (name.trim().length < 4) {
    errors.push("Name must be atleast 4 characters");
  }

  if (!email) {
    errors.push("Email is required");
  } else if (!isValidEmail(email)) {
    errors.push("Email is Invalid");
  }

  if (!password) {
    errors.push("Password is required");
  } else if (!isValidPassword(password)) {
    errors.push("Invalid Password");
  }

  if (!gender) {
    errors.push("Gender is required");
  } else if (!["male", "female"].includes(gender)) {
    errors.push("Invalid Gender");
  }

  if (!role) {
    errors.push("Role is required");
  } else if (!["user", "admin"].includes(role)) {
    errors.push("Invalid Role");
  }

  if (!req.file && !profilePicture) {
    errors.push("Profile picture is required");
  }

  if (errors.length > 0) {
    if (req.requestType === "web") {
      return res.render("register", { errors: errors });
    }
    return res.status(400).send(errors);
  }

  next();
}
