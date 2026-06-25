
import appointmentRoute from "../features/appointments/appointment.route.js";
import attachmentRoute from "../features/attachments/attachment.route.js";

import authRoutes from "../features/auth/auth.routes.js";
import userRoutes from "../features/user/user.route.js";
import type { Routes } from "./route.types.js";

export const routes : Routes = [
  authRoutes,
  userRoutes,
  appointmentRoute,
  attachmentRoute
];