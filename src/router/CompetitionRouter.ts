import { CompetitionController } from './../controller/CompetitionController';
import express from 'express';
import { CompetitionBusiness } from '../business/CompetitionBusiness';
import { CompetitionDatabase } from '../data/CompetitionDatabase';
import { IdGenerator } from '../services/IdGenerator';

export const CompetitionRouter = express.Router();

const competitionController = new CompetitionController();

CompetitionRouter.post("/create", competitionController.register);
CompetitionRouter.patch("/status", competitionController.updateStatus); 