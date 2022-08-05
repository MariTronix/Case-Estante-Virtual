import { IdGenerator } from './../services/IdGenerator';
import { CompetitionDatabase } from "../data/CompetitionDatabase";
import { CustomError } from "../error/CustomError";
import { Competition } from "../model/Competition";
import { CompetitionInputDTO } from "../types/DTO/CompetitionDTO";
import { UpdateStatusInputDTO } from "../types/DTO/UpdateStatusDTO";

export class CompetitionBusiness {
  constructor(
    private competitionDatabase: CompetitionDatabase,
    private idGenerator: IdGenerator
    ) {}

  public  async register(competition: CompetitionInputDTO) {
    try {
      const {name, date} = competition;

      if (!name || !date) {
        throw new CustomError(422, "Please fill in all fields.");
      }

      const id = this.idGenerator.generateId();
      const newCompetition = new Competition(id, name, date, "open");

      await this.competitionDatabase.createCompetition(newCompetition);

    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  public async updateStatus (competition: UpdateStatusInputDTO): Promise<void> {
    try {
      const { id, status } = competition;

      if (!id || !status) {
        throw new CustomError(422, "Please fill in all fields.");
      };

      const foundCompetition =
        await this.competitionDatabase.getCompetitionById(id);

      if (!foundCompetition) {
        throw new CustomError(404, "Competition not found.");
      };

      const updateCompetitionInput: UpdateStatusInputDTO= {
        id,
        status,
      };

      if (status.toLowerCase() !== "close" && status.toLowerCase() !== "open") {
        throw new CustomError(
          422,
          "Please insert 'open' to open a competition or 'close' to close a competition."
        );
      }

      await this.competitionDatabase.updateStatus(
        updateCompetitionInput
      );
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };
}

export default new CompetitionBusiness(
  new CompetitionDatabase(),
  new IdGenerator()
) 