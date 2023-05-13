import { Router } from "express";
import userController from "../controllers/user.controller.js";
import estudanteController from "../controllers/estudante.controller.js"

const routes = Router();

routes.use('/users', userController);
routes.use('/estudantes', estudanteController);


export default routes;