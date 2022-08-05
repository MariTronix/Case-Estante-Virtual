import { Request, Response } from "express";
import resultBusiness from "../business/ResultBusiness";
import { ResultInputDTO } from "../types/DTO/ResultDTO";

export class ResultController {

  public async register(req: Request ,res: Response): Promise<void> {
    try {
      const { competition, athlete, value, unit } = req.body;
      const registerResultInput: ResultInputDTO = {
        competition,
        athlete,
        value,
        unit,
      };

      await resultBusiness.register(registerResultInput);

      res.status(201).send({ message: "Result successfully registered." });
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };

  public async getMeterRanking(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.body;

      const ranking = await resultBusiness.getMeterRanking(name);

      res.status(200).send({ ranking: ranking });
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };

  public async getSecondRanking(req: Request,res: Response): Promise<void> {
    try {
      const { name } = req.body;

      const ranking = await resultBusiness.getSecondRanking(name);

      res.status(200).send({ ranking: ranking });
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };
} 