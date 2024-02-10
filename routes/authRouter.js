const { Router } = require("express");
const { validateBody, isUserAuthenticate } = require("../middlewares");
const { joiUserSchema } = require("../schemas");
const { ctrlAuth } = require("../controllers");

const authRouter = Router();

authRouter.post(
  "/register",
  validateBody(joiUserSchema.registerSchema),
  ctrlAuth.registerUser
);

authRouter.post(
  "/login",
  validateBody(joiUserSchema.loginSchema),
  ctrlAuth.loginUser
);

authRouter.get("/current", isUserAuthenticate, ctrlAuth.getCurrentUser);

authRouter.patch("/logout", isUserAuthenticate, ctrlAuth.logoutUser);

authRouter.patch(
  "/",
  isUserAuthenticate,
  validateBody(joiUserSchema.updateSubscriptionSchema),
  ctrlAuth.updateUserSubscription
);

module.exports = authRouter;
