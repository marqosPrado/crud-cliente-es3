import express from "express";
import path from "path";

const expressStaticSetUp = express.static(path.join(__dirname, "../../../public"), {
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
});
export default expressStaticSetUp;