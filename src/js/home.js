import { requireAuth } from "./auth.js";
import { loadProfileImage } from "./profile-image.js";

requireAuth();

loadProfileImage();
