import express from "express";
import expressStaticSetUp from "./controller/config/ExpressStaticSetUp";
import viewConfig from "./controller/config/ViewConfig";
import {ClienteController} from "./controller/ClienteController";
import {ClienteService} from "./service/ClienteService";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(expressStaticSetUp);
app.use(express.urlencoded({ extended: true }));
viewConfig(app);

new ClienteController(new ClienteService(), app);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});