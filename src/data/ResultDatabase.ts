import { Result } from "../model/Result";
import { BaseDatabase } from "./BaseDatabase";

export class ResultDatabase extends BaseDatabase {
  
    protected TABLE_NAME: string = "result";

    private toModel(dbModel?: any): Result | undefined {
        return(
            dbModel && 
            new Result(
                dbModel.id,
                dbModel.competition,
                dbModel.athlete,
                dbModel.value,
                dbModel.unit
            ));
    };

  public async register(result: Result): Promise<void> {
    try {
      await this.connection(this.TABLE_NAME).insert({
        id: result.getId(),
        competition: result.getCompetition(),
        athlete: result.getAthlete(),
        value: result.getValue(),
        unit: result.getUnit(),
      });
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  public async getMeterResults(name: string): Promise<any> {
    try {
      const results = await this.connection(this.TABLE_NAME)
        .where("competition", name)
        .orderBy("value", "desc");

      return results;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  public async getSecondResults(name: string) {
    try {
      const results = await this.connection(this.TABLE_NAME)
        .where("competition", name)
        .orderBy("value", "asc");

      return results;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  public async getAthletes(competition: string) {
    try {
      const results = await this.connection(this.TABLE_NAME)
        .where("competition", competition)
        .select("athlete");

      return results;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };
  public async getAthleteResults(athlete: string, competition: string) {
    try {
      const results = await this.connection(this.TABLE_NAME)
        .where("competition", competition)
        .andWhere("athlete", athlete);

      return results;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  public  async getResultByAthleteAndValue(athlete: string,value: number) {
    try {
      const [result] = await this.connection(this.TABLE_NAME)
        .where("athlete", athlete)
        .andWhere("value", value);
      const fixedResult = { ...result, value: value.toFixed(2) };

      return fixedResult;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  public async getResultBySecond(name: string): Promise<Result[]> {
    try{
      const [result] = await this.connection(this.TABLE_NAME)
        .where("unit", "s")
        .andWhere("name", name)
      return result
    }catch(error: any){
      throw new Error(error.sqlMessage || error.message)
    }
  };

  public async getResultByMeter(unit: string): Promise<Result[]> {
    try{
      const [result] = await this.connection(this.TABLE_NAME)
        .where("unit", "m")
        .andWhere("unit", unit)
      return result
    }catch(error: any){
      throw new Error(error.sqlMessage || error.message)
    }
  };
}