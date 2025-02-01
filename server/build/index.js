"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const usuarioRoutes_1 = __importDefault(require("./routes/usuarioRoutes"));
const personaRoutes_1 = __importDefault(require("./routes/personaRoutes"));
const marcaRoutes_1 = __importDefault(require("./routes/marcaRoutes"));
const modeloRoutes_1 = __importDefault(require("./routes/modeloRoutes"));
const empresaServicioRoutes_1 = __importDefault(require("./routes/empresaServicioRoutes"));
const resolucionRoutes_1 = __importDefault(require("./routes/resolucionRoutes"));
const conductorRoutes_1 = __importDefault(require("./routes/conductorRoutes"));
const arrendamientoRoutes_1 = __importDefault(require("./routes/arrendamientoRoutes"));
const itinerarioRoutes_1 = __importDefault(require("./routes/itinerarioRoutes"));
const vehiculoRoutes_1 = __importDefault(require("./routes/vehiculoRoutes"));
const historialVehicularRoutes_1 = __importDefault(require("./routes/historialVehicularRoutes"));
const empresaRoutes_1 = __importDefault(require("./routes/empresaRoutes"));
const tucRoutes_1 = __importDefault(require("./routes/tucRoutes"));
const infraestructuraRoutes_1 = __importDefault(require("./routes/infraestructuraRoutes"));
const certificadoRoutes_1 = __importDefault(require("./routes/certificadoRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.ruotes();
    }
    config() {
        this.app.set('port', process.env.PORT || 4000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json({ limit: '100mb' }));
        this.app.use(express_1.default.urlencoded({ limit: '100mb', extended: true }));
    }
    ruotes() {
        this.app.use('/', usuarioRoutes_1.default);
        this.app.use('/', personaRoutes_1.default);
        this.app.use('/', marcaRoutes_1.default);
        this.app.use('/', modeloRoutes_1.default);
        this.app.use('/', empresaServicioRoutes_1.default);
        this.app.use('/', resolucionRoutes_1.default);
        this.app.use('/', certificadoRoutes_1.default);
        this.app.use('/', conductorRoutes_1.default);
        this.app.use('/', arrendamientoRoutes_1.default);
        this.app.use('/', itinerarioRoutes_1.default);
        this.app.use('/', vehiculoRoutes_1.default);
        this.app.use('/', historialVehicularRoutes_1.default);
        this.app.use('/', empresaRoutes_1.default);
        this.app.use('/', tucRoutes_1.default);
        this.app.use('/', infraestructuraRoutes_1.default);
    }
    star() {
        this.app.listen(this.app.get('port'), () => {
            console.log('server listening in port ', this.app.get('port'));
        });
    }
}
const server = new Server();
server.star();
