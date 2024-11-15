import express from "express";
import expressStaticSetUp from "./controller/config/ExpressStaticSetUp";
import viewConfig from "./controller/config/ViewConfig";
import {ClienteController} from "./controller/ClienteController";
import {ClienteService} from "./service/ClienteService";
import {runSeed} from "../prisma/seed";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(expressStaticSetUp);
app.use(express.urlencoded({ extended: true }));
viewConfig(app);

new ClienteController(new ClienteService(), app);

app.use((err: any, req: express.Request, res: express.Response) => {
  console.error(err.stack);
  res.status(500).json({ message: "Erro interno do servidor" });
});

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