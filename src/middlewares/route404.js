export default function undefinedRoute(req, res, next) {
  return res.render("errors", { errors: "Route Undefined" });
}
