import { IdGenerator } from './../services/IdGenerator';
import { CompetitionDatabase } from "../data/CompetitionDatabase";
import { ResultDatabase } from "../data/ResultDatabase";
import { CustomError } from "../error/CustomError";
import { Competition } from "../model/Competition";
import { Result } from "../model/Result";
import { ResultInputDTO } from "../types/DTO/ResultDTO";

export class ResultBusiness {
  constructor(
    private resultDatabase: ResultDatabase,
    private competitionDatabase: CompetitionDatabase,
    private idGenerator: IdGenerator
  ) {}

  public async register(result: ResultInputDTO): Promise<void> {
    try {
      const {competition, athlete, value, unit } = result;

      if (!competition || !athlete || !value || !unit) {
        throw new CustomError(422, "Please fill in all fields.");
      }

      if (unit.toLowerCase() !== "s" && unit.toLowerCase() !== "m") {
        throw new CustomError(422, "Please use 's' for seconds or 'm' for meters.");
      }

      const foundCompetition: Competition = await this.competitionDatabase.getCompetitionByName(competition);
      if (!foundCompetition) {
        throw new CustomError(404, "Competition not found.");
      }

      const isActive =
        await this.competitionDatabase.getStatus(competition);

      if (!isActive) {
        throw new CustomError(422, "This competition isn't active.");
      }

      const id = this.idGenerator.generateId();
      const newResult = new Result(id, competition, athlete, value, unit);

      await this.resultDatabase.register(newResult);
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  public async getMeterRanking(name: string): Promise<Result[]> {
    try {
      if (!name) {
        throw new CustomError(422, "Please fill in all fields.");
      };

      // const foundUnit: Result[] = await this.resultDatabase.getSecondResults(name);
      //   if(!foundUnit){
      //     throw new CustomError(404, "competition with results by meter");
      //   };

      const foundCompetition: Competition =
        await this.competitionDatabase.getCompetitionByName(name);
      if (!foundCompetition) {
        throw new CustomError(404, "Competition not found.");
      };

      const [results, athletes] = await Promise.all([
        await this.resultDatabase.getMeterResults(name),
        await this.resultDatabase.getAthletes(name),
      ]);

      const mappedForNameAthletes = athletes.map((athlete) => {
        return athlete.athlete;
      });

      const uniqueAthletes = [...new Set(mappedForNameAthletes)];

      const maxResults = [];
      for (let athlete of uniqueAthletes) {
        const personalResults = await this.resultDatabase.getAthleteResults(
          athlete,
          name
        );
        const personalValues = personalResults.map((result) => result.value);

        const maxPersonalValue = personalValues.reduce((a, b) => {
          return Math.max(a, b);
        });

        const maxPersonalResult =
          await this.resultDatabase.getResultByAthleteAndValue(
            athlete,
            maxPersonalValue
          );
        maxResults.push(maxPersonalResult);
      }

      maxResults.sort((a, b) => {
        if (a.value < b.value) {
          return 1;
        }
        if (a.value > b.value) {
          return -1;
        }
        return 0;
      });

      const ranking: Result[] = [];
      let i = 1;
      for (let result of maxResults) {
        result = { ...result, position: i };
        ranking.push(result);
        i++;
      }

      return ranking;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  public async getSecondRanking(name: string): Promise<Result[]> {
    try {
      if (!name) {
        throw new CustomError(422, "Please fill in all fields.");
      };

      // const foundUnit: Result[] = await this.resultDatabase.getSecondResults(name);
      //   if(!foundUnit){
      //     throw new CustomError(404, "competition with results by seconds");
      //   };

      const foundCompetition: Competition = await this.competitionDatabase.getCompetitionByName(name);
      if (!foundCompetition) {
        throw new CustomError(404, "Competition not found.");
      };

      const results = await this.resultDatabase.getSecondResults(name);

      const ranking: Result[] = [];
      let i = 1;
      for (let result of results) {
        result = { ...result, position: i };
        ranking.push(result);
        i++;
      }

      return ranking;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };
}

export default new ResultBusiness(
    new ResultDatabase(),
    new CompetitionDatabase(),
    new IdGenerator()
) 