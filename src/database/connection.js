import mongoose from "mongoose";

mongoose.connect('mongodb+srv://dupla:dupladouglashirrua@projeto.mr6kua4.mongodb.net/?retryWrites=true&w=majoritymongodb://localhost:27017/project', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro na conexão com o banco de dados:'));
db.once('open', function() {
  console.log('Conexão com o banco de dados estabelecida com sucesso.');
});

export default db;
