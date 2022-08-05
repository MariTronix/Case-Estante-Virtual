import { CompetitionRouter } from "./router/CompetitionRouter";
import { ResultRouter } from "./router/ResultRouter";
import { app } from "./services/App";

app.use("/competition", CompetitionRouter);
app.use("/result", ResultRouter);