import { Router } from "express";
import {
  criarEstudante,
  listarEstudante,
  atualizarEstudante,
  deletarEstudante
} from "../services/estudante.service.js";
import authenticationMiddleware from "../middlewares/auth.middleware.js";

import estudanteSchema from "../utils/schemaValidation.js";

const estudanteRoutes = Router();

estudanteRoutes.get("/", async (req, res) => {
  const estudante = await listarEstudante();
  return res.status(200).json(estudante);
});

estudanteRoutes.get("/:id", authenticationMiddleware, async (req, res) => {
  const { id } = req.params;

  const estudante = await listarEstudante(id);
  return res.status(200).json(estudante);
});

estudanteRoutes.post("/", async (req, res) => {
  const { error } = await studentSchema.validate(req.body);

  if (error) {
    throw { status: 401, message: error.message };
  }

  const studentCreated = await createStudent(req.body);

  return res.status(200).json(studentCreated);
});

estudanteRoutes.put("/:id", async (req, res) => {
  const { id } = req.params;

  const { error } = await estudanteSchema.validate(req.body);

  if (error) {
    throw { status: 401, message: error.message };
  }

  const estudanteAtualizado = await atualizarEstudante(id, req.body);
  return res.status(200).json(estudanteAtualizado);
});

estudanteRoutes.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const estudanteDeletado = await deletarEstudante(id);
  return res.status(200).json(estudanteDeletado);
});

export default estudanteRoutes;