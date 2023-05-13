import { Decimal128 } from 'mongodb';
import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  id: Number,
  name: String,
  descricao: String,
  carga_horaria: Date,
  avaliacao: String,
  value: Decimal128,
  logo: String,
  professor: {type: mongoose.Types.ObjectId, ref: "professor"},
  status: Boolean,
}, { collection: 'curso' });

const Curso = mongoose.model('curso', schema);

export default Curso;