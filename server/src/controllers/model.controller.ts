import { spawn } from "child_process";
import { Request, Response } from "express-serve-static-core";
import path from "path";
import { ModelPrediction } from "../types/model.type";

type ApiResponse = {
  success: boolean;
  result?: ModelPrediction[];
  message?: string;
};

export class ModelController {
  public query = async (request: Request, response: Response): Promise<void> => {
    try {
      const { state, date, tmin, tmax } = request.query;

      const result = await this.invokeModel({ state: state, date: date, tmin: tmin, tmax: tmax });

      response.status(200).json({
        success: true,
        result,
      });
    } catch (error) {
      console.error("Error while querying machine learning model...");
      response.status(500).json({
        success: false,
        message: "Failed to query model...",
      });
    }
  };
  private invokeModel = ({ state, date, tmin, tmax }: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      const scriptPath = path.join(__dirname, "./../../../machine-learning-model/machine-learning.py");
      const pythonExecutable = process.platform === "win32" ? "python" : "python3";
      const childProcess = spawn(pythonExecutable, [scriptPath, state, date, tmin, tmax]);
      let output = "";

      childProcess.stdout.on("data", (data) => {
        output += data.toString();
      });

      childProcess.stderr.on("data", (data) => {
        console.error("stderr: ", data.toString());
      });

      childProcess.on("error", (data) => {
        reject(data);
      });

      childProcess.on("close", (code) => {
        if (code !== 0) {
          console.log("child process existed with code: ", code);
        } else {
          try {
            const parsed = JSON.parse(output);
            resolve(parsed);
          } catch (error) {
            console.error("Failed to parse JSON:", error);
            console.error("Raw output:", output);
            reject(error);
          }
        }
      });
    });
  };
}
