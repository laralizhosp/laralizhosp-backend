import { Router } from "express";
import { assessmentController } from "./app/controller/AssessmentController";
import { userController } from "./app/controller/UsersController";

const router: Router = Router();

router.get("/assessment", assessmentController.list);
router.post("/assessment", assessmentController.create);

router.get("/users", userController.list);
router.get("/users/search", userController.search);
router.get("/users/:id", userController.get);
router.post("/users", userController.create);

export { router };