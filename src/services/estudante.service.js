import bycript from "bcrypt"
import Estudante from "../models/estudante.model.js"
import { generateJWTToken} from "../utils/jwt.js"

const criarEstudante = async (dados) => {

  const {cpf, name, email} = (dados)

  const estudanteExistente = await Estudante.findOne({$or: [{cpf}, {name}, {email}]})

  if (estudanteExistente) {
    throw { status: 400, message: "Já existe um estudante com esses dados." }
  }

  dados.password = bycript.hashSync(dados.password, 8)
  const estudante = new Schema(dados)
  const resultado = await estudante.save()
  return resultado
}

const listarEstudante = async (id) => {
  if (id){
    const estudante = await Estudante.findById(id).select('-password')
    return estudante
  }
    const estudante = await Estudante.find().select("-password")
  return estudante
}

const atualizarEstudante  = async (id, dados) => {

  const [{cpf}, {name}, {email}] = dados

  const estudanteExistente = await Estudante.findOne({
    $and: [
      { _id: { $ne: id } },
      { $or: [{ cpf }, { name }, { email }] }
    ]
  })
  
  if (estudanteExistente) {
    throw { status: 400, message: "Já existe um estudante com esses dados." }
  }

  dados.password = bycript.hashSync(dados.password, 8)
  const estudante = await Estudante.findByIdAndUpdate(id, dados, { new: true})
  return estudante
}

const deletarEstudante = async (id) => {
  const estudante = await Estudante.findByIdAndUpdate(id, { situacao: true })
  return estudante
}

const authentication = async ({ email, password }) => {
  if (!email || !password) {
    throw { status: 401, message: "Existe campos em branco!" }
  }

  const estudante = await Estudante.findOne({ email })

  const comparePassword = bycript.compareSync(password, estudante.password)

  if (!estudante || !comparePassword) {
    throw{ status: 401, message: "Usuario ou senha invalidos!" }
  }

  const { _id, name } = estudante

  const token = generateJWTToken({ _id, name, email })
  return {token}
}

export {
  criarEstudante,
  listarEstudante,
  atualizarEstudante,
  deletarEstudante,
  authentication
}
