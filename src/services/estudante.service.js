import bycript from "bcrypt"
import Estudante from "../models/estudante.model.js"
import Users from "../models/user.models.js"
import { generateJWTToken} from "../utils/jwt.js"

const criarEstudante = async (dados) => {
  dados.password = bycript.hashSync(dados.password, 8)
  const estudante = new Schema(dados)
  const resultado = await estudante.save()
  return resultado
}

const listarEstudante = async (id) => {
  const estudante = await Estudante.findById(id).select("-password")
  return estudante
}

const atualizarEstudante  = async (id, dados) => {
  dados.password = bycript.hashSync(dados.password, 8)
  const estudante = await Estudante.findByIdAndUpdate(id, dados, { new: true})
  return estudante
}

const deletarEstudante = async (id) => {
  const estudante = await Estudante.findByIdAndUpdate(id, { situacao: true }, { new: true })
  return estudante
}

const authentication = async ({ email, password }) => {
  if (!email || !password) {
    throw { status: 401, message: "Existe campos em branco!" }
  }

  const user = await Users.findOne({ email })

  const comparePassword = bycript.compareSync(password, user.password)

  if (!user || !comparePassword) {
    throw{ status: 401, message: "Usuario ou senha invalidos!" }
  }

  const { _id, name } = user

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
