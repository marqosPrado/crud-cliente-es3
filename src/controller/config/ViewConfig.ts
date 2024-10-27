import {Application} from "express";
import path from "path";

const viewConfig = (app: Application) => {
    app.set("views", path.join(__dirname, "../../../src/views"));
    app.set("view engine", "ejs");
}

export default viewConfig;