import Curso from "../models/curso.model.js"

const criarCurso = async (dados, isProfessor) => {
  
  if (! isProfessor){
    throw{ status: 401, message: "Apenas professores podem cadastrar novos professores!" }
  }
  
  const curso = new Schema(dados)
  const resultado = await curso.save()
  return resultado
}

const listarCurso = async (id) => { 
  const curso = await Curso.findById(id)
  return curso
}

const atualizarCurso  = async (id, dados, isProfessor) => {

  if (!isProfessor){
    throw{ status: 401, message: "Apenas professores podem cadastrar novos professores!" }
  }

  const curso = await Curso.findByIdAndUpdate(id, dados, { new: true})
  return curso
}

const listarInfoCurso = async (nome) => {
  const curso = await Curso.findOne({ name: nome })
   .populate("professor_responsavel", "name email")
   .populate({
     path: "matriculas",
     populate: { path: "estudante", select: "name email" },
   })
   return curso;
}
  
const deletarCurso = async (id, isProfessor) => {

  if (!isProfessor){
    throw{ status: 401, message: "Apenas professores podem cadastrar novos professores!" }
  }

  const curso = await Curso.findByIdAndUpdate(id, { situacao: true })
  return curso
}

export {
  criarCurso,
  listarCurso,
  atualizarCurso,
  deletarCurso,
  listarInfoCurso
}
