import express from "express";
import { ResultController } from "../controller/ResultController";

export const ResultRouter = express.Router();

const resultController = new ResultController();

ResultRouter.post("/register", resultController.register)
ResultRouter.get("/ranking/meter", resultController.getMeterRanking);
ResultRouter.get("/ranking/second", resultController.getSecondRanking);