import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  id: Number,
  name: String,
  image_profile: String,
  email: String,
  password: String,
  biografia: String,
  experiencia: String,
  git_hub: String,
  linkedin: String,
  status: Boolean,
  professor_responsavel: { type:mongoose.Types.ObjectId, ref: "professor" }
}, { collection: 'professor' });

const Professor = mongoose.model('professor', schema);

export default Professor;