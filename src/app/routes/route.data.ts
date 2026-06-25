import authRoutes from "../features/auth/auth.routes.js";
import userRoutes from "../features/user/user.route.js";
import type { Routes } from "./route.types.js";

export const routes : Routes = [
  authRoutes,
  userRoutes
];