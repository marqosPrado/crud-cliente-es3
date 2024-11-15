import { Request, Response, NextFunction } from "express";
import { ZodSchema, z } from "zod";

export const validationSchema =
  (schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (e) {
      if (e instanceof z.ZodError) {
        res.status(400).json({
          message: "Erro de validação",
          errors: e.errors.map((err) => ({
            campo: err.path.join("."),
            mensagem: err.message,
          })),
        });
        return;
      }
      next(e);
    }
  };