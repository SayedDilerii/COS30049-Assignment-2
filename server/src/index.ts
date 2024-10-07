import express from "express";
import usersRouter from "./routes/users.routes";
import bodyParser from "body-parser";

const PORT = 3002;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())

app.use("/api/users", usersRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
