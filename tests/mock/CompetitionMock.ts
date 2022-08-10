import { CompetitionInputMockDTO } from '../../src/types/DTO/CompetitionDTO';
import { Competition } from './../../src/model/Competition';

export const  CompetitionOpenMock: CompetitionInputMockDTO = {
    id: "id_c",
    name: "name",
    date: "10/08/2022",
    status: "Open"
};

export const CompetitionCloseMock: CompetitionInputMockDTO = {
    id: "id_c2",
    name: "name",
    date: "10/08/2022",
    status: "Close"
};