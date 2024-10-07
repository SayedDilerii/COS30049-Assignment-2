import { Request, Response } from "express-serve-static-core";
import { CreateUserDTO } from "../dtos/createUser.dto";
import { query } from "../database/db";
import { GenericResponse } from "../types/response.type";

export async function createUser(request: Request<{}, {}, CreateUserDTO>, response: Response<GenericResponse<CreateUserDTO>>): Promise<any> {
  const user = request.body;
  const prepareQuery = {
    text: "INSERT INTO users (first_name, middle_name, last_name, email, access_pin, date_of_birth, gender, country, time_zone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
    values: Object.values(user),
  };
  try {
    const results = await query(prepareQuery.text, prepareQuery.values);
    return response.send({ api: { status: 200, message: "Account created successfully!" }, results: results.rows });
  } catch (error) {
    console.error(error);
  }
}


export function findUserById(request: Request, response: Response): Response<Record<string, any>> {
  const id = request.params;
  return response.send({ result: id });
}
