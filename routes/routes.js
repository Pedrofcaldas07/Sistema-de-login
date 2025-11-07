import express from 'express'
import * as controller from "../controllers/controller.js";
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get("/", controller.abrirTela)
router.get("/register", controller.abrirTelaRegister)
router.post("/register", controller.criarUser)
router.get("/login", controller.abrirTelaLogin)
router.post("/login", controller.procurarUser)
router.get("/perfil", controller.abrirTelaPerfil)
router.get("/user/data", controller.getUserData)
router.get("/perfil/edit", controller.abritTelaEdit)
router.patch("/perfil/edit/:id", controller.editPerfil);
router.delete("/perfil/delete/:id", controller.apagarUser)
router.get("/usuarios", controller.abriTelaUser)
router.get("/buscar/usuarios", controller.buscarUsers)

export default router;
