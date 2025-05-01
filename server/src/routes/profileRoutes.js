import { getProfile } from "../controllers/profileController.js";

async function profileRoutes(app, options) {
  app.get("/profile", getProfile);
}

export default profileRoutes;
