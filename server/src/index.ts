import { App } from "./app";
import { Config } from "./types/config.type";

const config: Config = {
  port: Number(process.env.PORT) || 3000,
};

const app = new App(config);
app.start();
