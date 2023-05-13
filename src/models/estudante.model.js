import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  id: Number,
  name: String,
  image_profile: String,
  email: String,
  cpf: String,
  telefone: String,
  password: String,
  status: Boolean,
}, { collection: 'estudante' });

const Estudante = mongoose.model('estudante', schema);

export default Estudante;