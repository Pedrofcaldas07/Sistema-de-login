import { log } from 'console';
import connection from '../config/db.js'

export const criarUser = async(nome, email, cleanCpf, senhaHashed)=>{
    try {
    const [result] = await connection.query("INSERT INTO usuarios (nome, email, cpf, senha) VALUES (?, ?, ?, ?)",
    [nome, email, cleanCpf, senhaHashed])
    return result.insertId;
  } catch (error) {
    console.error("Erro ao inserir usuário no model:", error);
    throw error;
  }
}
export const procurarUser = async(email)=>{
    try{
        const [rows] = await connection.query("SELECT id, nome, email, senha FROM usuarios WHERE email = ?",
        [email])
        return rows[0] || null
    } catch (error){
        console.log(`Erro na procura de usuario (MODEL): ${error}`)
        throw error;
    }
}
export const getUserId = async(id)=>{
  try{
    const [rows] = await connection.query(
      "SELECT id, nome, email, cpf FROM usuarios WHERE id = ?",
      [id]
    )
    return rows[0] || null
  } catch (error){
    console.log("Erro na busca por id"+error)
    return null
  }
}
export const editPerfil = async (userId, dados)=>{
  const { nome, email, cpf } = dados;
  const valores = [nome, email, cpf, userId];
  try{
    const [result] = await connection.query(
      'UPDATE usuarios SET nome = ?, email = ?, cpf = ? WHERE id = ?', 
       [nome, email, cpf, userId]
    );
    return result.affectedRows;
  } catch (error) {
    console.error("Erro no Model editPerfil (SQL ou conexão):", error);
    throw error;}
}
export const deletarUsuario = async(userId)=>{
  try{
    const [result] = await connection.query(
      'DELETE FROM usuarios WHERE id = ?', [userId]
    )
    return result.affectedRows;
  } catch (error){
    console.error("Erro no mode", error)
  }
}
export const procurarUserGeral = async(email)=>{
    try{
        const query = await connection.query("SELECT id, nome, email, cpf FROM usuarios")
        return query
    } catch (error){
        console.log(`Erro na procura de usuario (MODEL): ${error}`)
        throw error;
    }
}