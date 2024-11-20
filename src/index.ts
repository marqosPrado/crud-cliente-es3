import express from "express";
import expressStaticSetUp from "./controller/config/ExpressStaticSetUp";
import viewConfig from "./controller/config/ViewConfig";
import {ClienteController} from "./controller/ClienteController";
import {ClienteService} from "./service/ClienteService";
import {runSeed} from "../prisma/seed";
import {EstadoController} from "./controller/Endereco/EstadoController";
import {EstadoService} from "./service/Endereco/EstadoService";
import {PaisController} from "./controller/Endereco/PaisController";
import {PaisService} from "./service/Endereco/PaisService";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(expressStaticSetUp);
app.use(express.urlencoded({ extended: true }));
viewConfig(app);

new ClienteController(new ClienteService(), app);
const estadoController = new EstadoController(new EstadoService(), app);
new PaisController(new PaisService(), app, estadoController)

async function startServer() {
  try {
    await runSeed();

    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
    process.exit(1);
  }
}
startServer()