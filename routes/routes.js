const express = require("express");
const routers = express.Router();

const OlseraAuthMiddleware = require("../middleware/OlseraAuthMiddleware");
const authRoute = require("../controllers/auth/auth.routes");
const aboutRoute = require("../controllers/about/about.routes");
const productRoute = require("../controllers/product/product.routes");
const cartRoute = require("../controllers/cart/cart.routes");
const orderRoute = require("../controllers/order/order.routes");
const olseraAuthRoute = require("../controllers/olseraAuth/olseraAuth.routes");

routers.use(OlseraAuthMiddleware);

routers.use("/olseraauth", olseraAuthRoute);
routers.use("/user", authRoute);
routers.use("/about", aboutRoute);
routers.use("/products", productRoute);
routers.use("/cart", cartRoute);
routers.use("/order", orderRoute);

module.exports = routers;
