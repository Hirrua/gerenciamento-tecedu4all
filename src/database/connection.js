import mongoose from "mongoose"
import {dotenv} from "dotenv"

const conexao = process.env.DB_CONNECTION

mongoose.connect(conexao, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro na conexão com o banco de dados:'));
db.once('open', function() {
  console.log('Conexão com o banco de dados estabelecida com sucesso.');
});

export default db;
