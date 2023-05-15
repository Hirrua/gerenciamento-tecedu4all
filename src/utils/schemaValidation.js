import Joi from 'joi'

const estudanteSchema = Joi.object({
    name: Joi.string().required().max(50),
    image_profile: Joi.link().required().max(50),
    email: Joi.string().email().required().max(50),
    cpf: Joi.string().regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/).required(),
    telephone: Joi.string().regex(/^\d{2}-\d{4,5}-\d{4}$/).required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")).max(8),
    status: Joi.boolean().required(),
})

const professorSchema = Joi.object({
    name: Joi.string().required().max(50),
    image_profile: Joi.string().required().max(50),
    email: Joi.string().email().required().max(50),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")).max(8),
    linkedin: Joi.string().linkedin().required().max(50),
    biografia: Joi.string().linkedin().required().max(50),
    experiencia: Joi.string().linkedin().required().max(50),
    git_hub: Joi.string().linkedin().required().max(50),
    status: Joi.boolean().required(),
    professor_responsavel: Joi.number().required()
})

const cursoSchema = Joi.object({
    name: Joi.string().required().max(50),
    carga_horaria: Joi.date().required(),
    logo: Joi.link().required(),
    avaliacao: Joi.number().required(),
    value: Joi.number().required().precision(2),
    status: Joi.boolean().required(),
})

const matriculaSchema = Joi.object({
    data_matricula: Joi.date().required(),
    estudante: Joi.number().format('DD/MM/YYYY').utc().max('now').required(),
    curso: Joi.number().required(),
    status: Joi.boolean().required(),
})

export {
    estudanteSchema,
    professorSchema,
    cursoSchema,
    matriculaSchema
}