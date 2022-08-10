import { CompetitionDatabase } from '../src/data/CompetitionDatabase';
import { CustomError } from '../src/error/CustomError';
import { IdGenerator } from '../src/services/IdGenerator';
import { CompetitionInputMockDTO } from '../src/types/DTO/CompetitionDTO';
import { UpdateStatusInputDTO } from '../src/types/DTO/UpdateStatusDTO';
import { CompetitionBusiness } from './../src/business/CompetitionBusiness';

const CompetitionBusinessMock = new CompetitionBusiness(
    new CompetitionDatabase(),
    new IdGenerator()
)

describe("Competition tests", () => {
    test("Name field is empty", async() => {
        try{
            const inputMock: CompetitionInputMockDTO = {
                id: "id_c",
                name: "",
                date: "10/08/2022",
                status: "Open"
            };

            await CompetitionBusinessMock.register(inputMock)
    
        }catch (error) {
            if (error instanceof CustomError) {
                expect(error.message).toEqual("Please fill in all fields.");
                expect(error.statusCode).toEqual(422);
            }
        }
    });

    test("Date field is empty.", async() => {
        try{
            const inputMock: CompetitionInputMockDTO = {
                id: "id_c",
                name: "nome",
                date: "",
                status: "Open"
            };

            await CompetitionBusinessMock.register(inputMock);
        }catch (error) {
            if (error instanceof CustomError) {
              expect(error.message).toEqual("Please fill in all fields.");
              expect(error.statusCode).toEqual(422);
            }
        }
    });

    test("Create Competition.", async () => {
        try {
            const inputMock: CompetitionInputMockDTO= {
                id: "id_c",
                name: "nome",
                date: "28/07/2022",
                status: "Open"
            };

            await CompetitionBusinessMock.register(inputMock)

        }catch (error) {
            if (error instanceof CustomError) {
            }
        }
    });
});

describe("Update competition test", () => {
    test("Id field isn't filled.", async () => {
        try {
            const inputMock: UpdateStatusInputDTO = {
              id: "",
              status: "open",
            };

            await CompetitionBusinessMock.updateStatus(inputMock);

        } catch (error) {
            if (error instanceof CustomError) {
              expect(error.message).toEqual("Please fill in all fields.");
              expect(error.statusCode).toEqual(422);
            }
        }
    });

    test("Status field isn't filled.", async () => {
        try {
            const inputMock: UpdateStatusInputDTO = {
              id: "mocked_id",
              status: "",
            };

            await CompetitionBusinessMock.updateStatus(inputMock);

        } catch (error) {
            if (error instanceof CustomError) {
              expect(error.message).toEqual("Please fill in all fields.");
              expect(error.statusCode).toEqual(422);
            }
        }
    });

    test("Should update a competition status.", async () => {
        expect.assertions;
        try {
          const inputMock: UpdateStatusInputDTO = {
            id: "mocked_id",
            status: "open",
          };

          await CompetitionBusinessMock.updateStatus(inputMock);
          expect(CompetitionBusinessMock.updateStatus).toBeCalled()
        } catch (error) {
          if (error instanceof CustomError) {
            console.log(error)
          }
        }
    });
}); 