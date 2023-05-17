import { Router } from "express"
import {
  criarProfessor,
  listarProfessor,
  atualizarProfessor,
  deletarProfessor
} from "../services/professor.service.js";
import authenticationMiddleware from "../middlewares/auth.middleware.js"

import {professorSchema} from "../utils/schemaValidation.js"

const professorRoutes = Router()

professorRoutes.get("/", authenticationMiddleware, async (req, res) => {
  const professor = await listarProfessor();
  return res.status(200).json(professor);
});

professorRoutes.get("/:id", authenticationMiddleware, async (req, res) => {
  const { id } = req.params;

  const professor = await listarProfessor(id, res.locals.payload.isProfessor);
  return res.status(200).json(professor);
});

professorRoutes.post("/", authenticationMiddleware, async (req, res) => {
  const { error } = await professorSchema.validate(req.body);

  if (error) {
    throw { status: 401, message: error.message };
  }

  const professorCriado = await criarProfessor(id, res.locals.payload.isProfessor)

  return res.status(200).json(professorCriado);
});

professorRoutes.put("/:id", authenticationMiddleware, async (req, res) => {
  const { id } = req.params;

  const { error } = await professorSchema.validate(req.body);

  if (error) {
    throw { status: 401, message: error.message };
  }

  const professorAtualizado = await atualizarProfessor(id, req.body)
  return res.status(200).json(professorAtualizado)
})

professorRoutes.delete("/:id", authenticationMiddleware, async (req, res) => {
  const { id } = req.params
  const professorDeletado = await deletarProfessor(id, res.locals.payload.isProfessor)
  return res.status(200).json(professorDeletado)
})

professorRoutes.post('/login', authenticationMiddleware, async (req, res) => {
  const token = await authentication(req.body)
  res.status(200).json(token)
})

export default professorRoutes