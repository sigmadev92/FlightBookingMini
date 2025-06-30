export default function validate_new_flight(req, res, next) {
  console.log(req.body);
  console.log(":hjhj");
  if (!req.body) {
    if (req.requestType === "web") {
      return res
        .status(400)
        .render("admin-dashboard", { errors: ["Body missing"] });
    }
    return res.status(400).send("BODY MISSING");
  }
  let errors = [];
  const { isFirst } = req.body;
  if (isFirst === undefined) {
    if (req.requestType === "web") {
      req.body.isFirst = false;
    } else {
      errors.push("Please specify if this is a first light or not");
    }
  } else if (![true, false, "true", "false"].includes(isFirst)) {
    errors.push("Invalid value for isFirst");
  } else {
    req.body.isFirst = ["true", true].includes(isFirst);
  }

  if (req.body.isFirst) {
    delete req.body.returningFlight;
  }
  if (!req.body.isFirst && !req.body.returningFlight) {
    errors.push("Returning Flight ID is required");
  }
  if (errors.length > 0) {
    if (req.requestType === "web")
      return res.render("admin-dashboard", { tab: "tab-1", errors });

    return res.status(400).send(errors);
  }
  req.body.flightImage = req.file.filename;
  next();
}
