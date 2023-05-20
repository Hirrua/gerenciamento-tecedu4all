import { Router } from "express"
import {
  criarCurso,
  listarCurso,
  atualizarCurso,
  deletarCurso,
  listarInfoCurso
} from "../services/curso.service.js"
import authenticationMiddleware from '../middlewares/auth.middleware.js'
import {cursoSchema} from "../utils/schemaValidation.js"

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

cursoRoutes.get("info_curso/", async (req, res) => {
  const { nome } = req.query;

  try {    
    const curso = await listarInfoCurso(nome);
    if (!curso) {
      throw { status: 404, message: "Curso não encontrado" };
    }

    res.status(200).json(curso);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
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