import inquirer from "inquirer";
import mysql from "mysql2/promis.js";
import config from "./config.js";
import {
  createDepartment,
  createEmployee,
  createRole,
  delDepartment,
  delEmployee,
  delRole,
  readAllDepartments,
  readAllEmployees,
  readAllEmployeesByDepartment,
  readAllEmployeesByManager,
  readAllPayroll,
  readAllPossibleManagers,
  readAllRoles,
  updateEmployeeMgr,
  updateEmployeeRole,
} from "./lib.js";
import questions from "./questions.js";

const connection = await mysql.createConnection(config.db);
