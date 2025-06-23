export default function undefinedRoute(req, res, next) {
  return res.status(400).send("Route not found");
}
