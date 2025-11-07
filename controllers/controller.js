import * as model from "../models/models.js";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import router from "../routes/routes.js";
import { log } from "console";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const abrirTela = async (req, res) => {
  res.sendFile(path.join(__dirname, "../view/index.html"));
};
export const abrirTelaRegister = async (req, res) => {
  res.sendFile(path.join(__dirname, "../view/register.html"));
};
export const abrirTelaLogin = async (req, res) => {
  res.sendFile(path.join(__dirname, "../view/login.html"));
};
export const abrirTelaPerfil = async (req, res) =>{
  res.sendFile(path.join(__dirname, "../view/perfil.html"));
}
export const abritTelaEdit = async (req, res)=>{
  res.sendFile(path.join(__dirname, "../view/perfilEdit.html"))
}
export const abriTelaUser = async(req, res)=>{
  res.sendFile(path.join(__dirname, "../view/usuarios.html"))
}

export const criarUser = async (req, res) => {
  try {
    const { nome, email, senha, cpf } = req.body;

    const cleanCpf = cpf.replace(/[^\d]/g, "");
    const saltRounds = 10;
    const hashedPw = await bcrypt.hash(senha, saltRounds);

    model.criarUser(nome, email, cleanCpf, hashedPw);
    console.log(`User criado com ID`);
    res.json({ message: "Usuário registrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const procurarUser = async (req, res) => {
  const { email, senha } = req.body;
  const user = await model.procurarUser(email);
  try{
    const isMatch = await bcrypt.compare(senha, user.senha);
    if (isMatch) {
        return res.status(200).json({ 
        message: user.id,
        user_id: user.id})
    } else {
      return res.status(401).json({ message: "Credenciais invalidas" });
    }
  } catch(error){
    console.error("Erro na comparação de senha:", error);
    return res.status(500).json({ message: "Erro interno no servidor." });
  }
};
export const getUserData = async (req, res)=>{
  const userId = req.query.id

  try{
    const userData = await model.getUserId(userId)

    if(!userData){
       return res.status(404).json({ message: "Usuário não encontrado." });
    }
    return res.status(200).json({
      nome: userData.nome,
      email: userData.email,
      cpf: userData.cpf
    })
  } catch(error){
    console.log("Erro ao buscar dados do usuario", error)
    return res.status(500).json({message: "Erro interno"})
  }
}
export const editPerfil = async (req, res)=>{
  const userId = req.params.id;
  const { nome, email, cpf } = req.body;
  const dadosAtu = {nome, email, cpf}
  try{
    const checkAtualizacoes = await model.editPerfil(userId, dadosAtu);

    if (checkAtualizacoes > 0) {
        res.status(200).json({ message: "Usuário atualizado com sucesso" });
      } else {
         res.status(404).json({ message: "Usuário não encontrado ou sem alterações" });
    }
  } catch(error){
    res.status(500).json({error: error.message})
  }
}
export const apagarUser = async (req, res)=>{
  const userId = req.params.id;
  try{
    const deletar = await model.deletarUsuario(userId)

    if (deletar > 0) {
    return res.status(200).json({ message: "Conta excluída com sucesso." });
  } else {
    return res.status(404).json({ message: "Usuário não encontrado." });
  }
  } catch (error) {
        console.error("Erro ao deletar usuário:", error);
  }
}
export const buscarUsers = async (req, res)=>{
  try{
    const buscar = await model.procurarUserGeral()
    res.status(200).json(buscar)
  }catch (error) {
        console.error("Erro ao buscar usuários:", error);
  }
}