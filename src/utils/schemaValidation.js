import Joi from 'joi'
import JoiDate from '@joi/date'

const JoiExtend = Joi.extend(JoiDate)

const estudanteSchema = JoiExtend.object({
    name: JoiExtend.string().required().max(50),
    image_profile: JoiExtend.link().required(),
    email: JoiExtend.string().email().required().max(50),
    cpf: JoiExtend.string().regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/).required(),
    telephone: JoiExtend.string().regex(/^\d{2}-\d{4,5}-\d{4}$/).required(),
    password: JoiExtend.string().pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")).max(8),
    status: JoiExtend.boolean().required(),
})

const professorSchema = JoiExtend.object({
    name: JoiExtend.string().required().max(50),
    image_profile: JoiExtend.string().required().max(50),
    email: JoiExtend.string().email().required().max(50),
    password: JoiExtend.string().pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")).max(8),
    linkedin: JoiExtend.string().required().max(50),
    biografia: JoiExtend.string().required().max(50),
    experiencia: JoiExtend.string().required().max(50),
    git_hub: JoiExtend.string().required().max(50),
    status: JoiExtend.boolean().required(),
    professor_responsavel: JoiExtend.number().required()
})

const cursoSchema = JoiExtend.object({
    name: JoiExtend.string().required().max(50),
    carga_horaria: JoiExtend.date().required(),
    logo: JoiExtend.link().required(),
    avaliacao: JoiExtend.number().required(),
    value: JoiExtend.number().required().precision(2),
    status: JoiExtend.boolean().required(),
})

const matriculaSchema = JoiExtend.object({
    data_matricula: JoiExtend.date().required(),
    estudante: JoiExtend.date().format('DD/MM/YYYY').utc().max('now').required(),
    curso: JoiExtend.number().required(),
    status: JoiExtend.boolean().required(),
})

export {
    estudanteSchema,
    professorSchema,
    cursoSchema,
    matriculaSchema
}