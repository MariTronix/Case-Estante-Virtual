import { CompetitionInputMockDTO } from '../../src/types/DTO/CompetitionDTO';
import { CompetitionOpenMock, CompetitionCloseMock } from './CompetitionMock';


export class CompetitionDatabaseMock {
    public async register(competition: CompetitionInputMockDTO): Promise<void> {};

    public async getCompetitionById(id: string): Promise<CompetitionInputMockDTO | undefined> {
        switch(id){
            case"id_c":
                return CompetitionOpenMock
            case "id_c2":
                return CompetitionCloseMock
            default:
                return undefined
        }
    };

    public async updateStatus(id: string): Promise<void>{};
}