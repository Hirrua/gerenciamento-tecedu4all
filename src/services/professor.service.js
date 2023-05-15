import bycript from "bcrypt"
import Professor from "../models/professor.model.js"
import { generateJWTToken} from "../utils/jwt.js"

const criarProfessor = async (dados, isProfessor) => {

  if (isProfessor){
    throw{ status: 401, message: "Apenas professores podem cadastrar novos professores!" }
  }

  dados.password = bycript.hashSync(dados.password, 8)
  const professor = new Schema(dados)
  const resultado = await professor.save()
  return resultado
}

const listarProfessor = async (id) => {
  const professor = await Professor.findById(id).select("-password")
  return professor
}

const atualizarProfessor  = async (id, dados, isProfessor) => {
  
  if (isProfessor){
    throw{ status: 401, message: "Apenas professores podem cadastrar novos professores!" }
  }
  
  dados.password = bycript.hashSync(dados.password, 8)
  const professor = await Professor.findByIdAndUpdate(id, dados, { new: true})
  return professor
}

const deletarProfessor = async (id, isProfessor) => {

  if (isProfessor){
    throw{ status: 401, message: "Apenas professores podem cadastrar novos professores!" }
  }

  const professor = await Professor.findByIdAndUpdate(id, { situacao: true })
  return professor
}

const authentication = async ({ email, password }) => {
  if (!email || !password) {
    throw { status: 401, message: "Existe campos em branco!" }
  }

  const professor = await Professor.findOne({ email })

  const comparePassword = bycript.compareSync(password, professor.password)

  if (!professor || !comparePassword) {
    throw{ status: 401, message: "Usuario ou senha invalidos!" }
  }

  const { _id, name } = professor

  const token = generateJWTToken({ _id, name, email })
  return {token}
}

export {
  criarProfessor,
  listarProfessor,
  atualizarProfessor,
  deletarProfessor,
  authentication
}
