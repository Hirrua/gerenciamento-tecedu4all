import { Router } from "express"
import {
  criarCurso,
  listarcurso,
  atualizarCurso,
  deletarCurso
} from "../services/curso.service.js"

import cursoSchema from "../utils/schemaValidation.js"

const cursoRoutes = Router();

cursoRoutes.get("/", authenticationMiddleware, async (req, res) => {
  const curso = await listarCurso();
  return res.status(200).json(curso);
});

cursoRoutes.get("/:id",  async (req, res) => {
  const { id } = req.params;

  const curso = await listarcurso(id);
  return res.status(200).json(curso);
});

cursoRoutes.post("/",  authenticationMiddleware, async (req, res) => {
  const { error } = await cursoSchema.validate(req.body);

  if (error) {
    throw { status: 401, message: error.message };
  }

  const cursoCriado = await criarCurso(req.body);

  return res.status(200).json(cursoCriado);
});

cursoRoutes.put("/:id", authenticationMiddleware,  async (req, res) => {
  const { id } = req.params;

  const { error } = await cursoSchema.validate(req.body);

  if (error) {
    throw { status: 401, message: error.message };
  }

  const cursoAtualizado = await atualizarCurso(id, req.body);
  return res.status(200).json(cursoAtualizado);
});

cursoRoutes.delete("/:id",  authenticationMiddleware, async (req, res) => {
  const { id } = req.params;
  const cursoDeletado = await deletarCurso(id);
  return res.status(200).json(cursoDeletado);
});

cursoRoutes.post('/login',  authenticationMiddleware, async (req, res) => {
  const token = await authentication(req.body);
  res.status(200).json(token);
})

export default cursoRoutes;