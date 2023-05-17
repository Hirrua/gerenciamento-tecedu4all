import { Router } from "express"
import {
  criarMatricula,
  listarMatricula,
  atualizarMatricula,
  deletarMatricula
} from "../services/matricula.service.js"
import authenticationMiddleware from '../middlewares/auth.middleware.js'
import {matriculaSchema} from "../utils/schemaValidation.js"

const matriculaRoutes = Router();

matriculaRoutes.get("/", authenticationMiddleware, async (req, res) => {
  const matricula = await listarMatricula();
  return res.status(200).json(matricula);
});

matriculaRoutes.get("/:id",  async (req, res) => {
  const { id } = req.params;

  const matricula = await listarmMtricula(id);
  return res.status(200).json(matricula);
});

matriculaRoutes.post("/",  authenticationMiddleware, async (req, res) => {
  const { error } = await matriculaSchema.validate(req.body);

  if (error) {
    throw { status: 401, message: error.message };
  }

  const matriculaCriado = await criarMatricula(req.body);

  return res.status(200).json(matriculaCriado);
});

matriculaRoutes.put("/:id", authenticationMiddleware,  async (req, res) => {
  const { id } = req.params;

  const { error } = await matriculaSchema.validate(req.body);

  if (error) {
    throw { status: 401, message: error.message };
  }

  const matriculaAtualizado = await atualizarMatricula(id, req.body);
  return res.status(200).json(matriculaAtualizado);
});

matriculaRoutes.delete("/:id",  authenticationMiddleware, async (req, res) => {
  const { id } = req.params;
  const matriculaDeletado = await deletarMatricula(id);
  return res.status(200).json(matriculaDeletado);
});

matriculaRoutes.post('/login',  authenticationMiddleware, async (req, res) => {
  const token = await authentication(req.body);
  res.status(200).json(token);
})

export default matriculaRoutes;