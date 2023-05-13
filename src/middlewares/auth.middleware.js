//importo a funcao de validar o token
import { authenticateToken } from "../utils/jwt.js";

//crio um midleware que valida o token
//pego o token do cabeçalho (headers), na propriedade Authorization
//chamo a funcao authenticateToken para verificar o token
//se der erro, jogo a mensagem
//se estiver certo, salvo o payload
//e dou o next, ou seja, pode seguir executando o resto do codigo solicitado
const authenticationMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;

    const payload = await authenticateToken(token);
    if (!payload) {
        throw { status: 401, message: "token inválido" };
    }

    res.locals.payload = payload;

    next();
}

export default authenticationMiddleware;