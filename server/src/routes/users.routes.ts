import express, { Router } from "express";
import { Request, Response } from "express-serve-static-core";
import { createUser, findUserById } from "../handlers/users.handler";

const router: Router = Router();

router.post("/create", createUser as any);
router.get("/:id", findUserById as any);

export default router;
