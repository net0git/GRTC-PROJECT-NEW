"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioController_1 = __importDefault(require("../controllers/usuarioController"));
class UsuariosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/api/usuario', usuarioController_1.default.listarUsuarios);
        this.router.get('/api/usuario/detalle', usuarioController_1.default.listarUsuariosDetalle);
        this.router.get('/api/usuario/:id_usuario', usuarioController_1.default.ObtenerUsuario);
        this.router.get('/api/usuario/detalle/:nombre_usuario', usuarioController_1.default.ObtenerUsuarioPorNombre);
        this.router.post('/api/usuario/crear', usuarioController_1.default.CrearUsuario);
        this.router.post('/api/usuario/login', usuarioController_1.default.ValidarLogin);
        this.router.put('/api/usuario/modificar/datos/:id_usuario', usuarioController_1.default.ModificarUsuarioDatos);
        this.router.put('/api/usuario/modificar/password/:id_usuario', usuarioController_1.default.ModificarUsuarioPassword);
    }
}
const usuariosRoutes = new UsuariosRoutes;
exports.default = usuariosRoutes.router;
