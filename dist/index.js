"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ExpressStaticSetUp_1 = __importDefault(require("./controller/config/ExpressStaticSetUp"));
const ViewConfig_1 = __importDefault(require("./controller/config/ViewConfig"));
const ClienteController_1 = require("./controller/ClienteController");
const ClienteService_1 = require("./service/ClienteService");
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use(ExpressStaticSetUp_1.default);
app.use(express_1.default.urlencoded({ extended: true }));
(0, ViewConfig_1.default)(app);
new ClienteController_1.ClienteController(new ClienteService_1.ClienteService(), app);
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
