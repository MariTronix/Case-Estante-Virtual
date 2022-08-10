import { ResultBusiness } from "../src/business/ResultBusiness";
import { CompetitionDatabase } from "../src/data/CompetitionDatabase";
import { ResultDatabase } from "../src/data/ResultDatabase";
import { CustomError } from "../src/error/CustomError";
import { IdGenerator } from "../src/services/IdGenerator";
import { ResultInputMockDTO } from "../src/types/DTO/ResultDTO";

const resultBusinessMock = new ResultBusiness(
    new ResultDatabase(),
    new CompetitionDatabase(),
    new IdGenerator()
)

describe("Result tests",  () => {
    test("Competition field is empty.", async () => {
        try {
            const inputMock: ResultInputMockDTO = {
                id: "id_s",
                competition: "",
                athlete: "athlete",
                value: 1,
                unit: "s"
            };

            await resultBusinessMock.register(inputMock)

        }catch (error) {
            if (error instanceof CustomError) {
              expect(error.message).toEqual("Please fill in all fields.");
              expect(error.statusCode).toEqual(422);
            }
        }
    });

    test("Athlete field is empty.", async () => {
        try {
            const inputMock: ResultInputMockDTO = {
                id: "id_s",
                competition: "competition",
                athlete: "",
                value: 1,
                unit: "s"
            };

            await resultBusinessMock.register(inputMock)

        }catch (error) {
            if (error instanceof CustomError) {
              expect(error.message).toEqual("Please fill in all fields.");
              expect(error.statusCode).toEqual(422);
            }
        }
    });

    test("Unit field is empty.", async () => {
        try {
            const inputMock: ResultInputMockDTO = {
                id: "id_s",
                competition: "competition",
                athlete: "athlete",
                value: 1,
                unit: ""
            };

            await resultBusinessMock.register(inputMock)

        }catch (error) {
            if (error instanceof CustomError) {
              expect(error.message).toEqual("Please fill in all fields.");
              expect(error.statusCode).toEqual(422);
            }
        }
    });

    test("'unit' field isn't 's' or 'm'.", async () => {
        try {
            const inputMock: ResultInputMockDTO = {
                id: "id_s",
                competition: "competition",
                athlete: "athlete",
                value: 1,
                unit: "q"
            };

            await resultBusinessMock.register(inputMock)

        }catch (error) {
            if (error instanceof CustomError) {
              expect(error.message).toEqual("Please use 's' for seconds or 'm' for meters.");
              expect(error.statusCode).toEqual(422);
            }
        }
    });

    test("Register", async () => {
        try {
            const inputMock: ResultInputMockDTO = {
                id: "id_s",
                competition: "competition",
                athlete: "athlete",
                value: 1,
                unit: "s"
            };

            await resultBusinessMock.register(inputMock)

            expect(resultBusinessMock.register(inputMock))

        }catch (error) {
            if (error instanceof CustomError) {
            }
        }
    });
}) 