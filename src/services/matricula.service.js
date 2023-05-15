import Matricula from "../models/matricula.model.js"

const criarMatricula = async (dados) => {
  const matricula = new Schema(dados)
  const resultado = await matricula.save()
  return resultado
}

const listarMatricula = async (id) => {
  const matricula = await Matricula.findById(id).select("-password")
  return matricula
}

const atualizarMatricula  = async (id, dados) => {
  const matricula = await Matricula.findByIdAndUpdate(id, dados, { new: true})
  return matricula
}

const deletarMatricula = async (id) => {
  const matricula = await Matricula.findByIdAndUpdate(id, { situacao: true })
  return matricula
}

export {
  criarMatricula,
  listarMatricula,
  atualizarMatricula,
  deletarMatricula
}
