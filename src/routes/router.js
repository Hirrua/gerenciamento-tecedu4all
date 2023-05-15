import { Router } from "express"
import estudanteController from "../controllers/estudante.controller.js"
import professorController from "../controllers/professor.controller.js"
import cursoController from "../controllers/curso.controller.js"
import matriculaController from "../controllers/matricula.controller.js"

const routes = Router()

routes.use('/estudantes', estudanteController)
routes.use('/professor', professorController)
routes.use('/cursos', cursoController)
routes.use('matricula', matriculaController)

export default routes