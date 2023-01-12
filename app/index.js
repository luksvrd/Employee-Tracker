import inquirer from "inquirer";
import mysql from "mysql2/promise.js";
import config from "./config.js";
import {
  createDepartment,
  createEmployee,
  createRole,
  delDept,
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

const render = async () => {
  const { action } = await inquirer.prompt(questions.askMainQuestions());
  switch (action) {
    case "VIEW_EMPLOYEES": {
      const [employees] = await readAllEmployees(connection);
      console.table(employees);
      render();
      break;
    }

    case "VIEW_EMPLOYEES_BY_DEPARTMENT": {
      const [departments] = await readAllDepartments(connection);
      const { departmentId } = await inquirer.prompt(
        questions.ask4Department(
          departments,
          "Which department would you like to see employees for?"
        )
      );

      const [employees] = await readAllEmployeesByDepartment(
        connection,
        departmentId
      );
      console.table(employees);
      render();
      break;
    }

    case "VIEW_EMPLOYEES_BY_MANAGER": {
      const [employees] = await readAllEmployees(connection);
      const { employeeId } = await inquirer.prompt(
        questions.ask4Employee({
          employeeChoices: employees,
          question: "Which manager would you like to see employees for?",
        })
      );

      const [employeesByManager] = await readAllEmployeesByManager(
        connection,
        employeeId
      );

      console.table(employeesByManager);
      render();
      break;
    }

    case "ADD_EMPLOYEE": {
      const { firstName, lastName } = await inquirer.prompt(
        questions.ask2AddEmployee()
      );

      const [managers] = await readAllEmployees(connection);

      // Destructuring and renaming employeeId property to managerId
      const { employeeId: managerId } = await inquirer.prompt(
        questions.ask4Employee({
          employeeChoices: managers,
          question: "Who is the employee's manager?",
          addlOptions: [{ name: "None", value: null }],
        })
      );

      const [roles] = await readAllRoles(connection);
      const { roleId } = await inquirer.prompt(
        questions.ask4Role(roles, "What is the employee's role?")
      );

      await createEmployee(connection, {
        firstName,
        lastName,
        roleId,
        managerId,
      });
      console.info(`Added ${firstName} ${lastName} to the database`);
      render();
      break;
    }

    case "REMOVE_EMPLOYEE": {
      const [employees] = await readAllEmployees(connection);
      const { employeeId } = await inquirer.prompt(
        questions.ask4Employee({
          employeeChoices: employees,
          question: "Which employee do you want to remove?",
        })
      );

      await delEmployee(connection, employeeId);
      console.info(`Removed employee from the database`);
      render();
      break;
    }

    case "UPDATE_EMPLOYEE_ROLE": {
      const [employees] = await readAllEmployees(connection);
      const { employeeId } = await inquirer.prompt(
        questions.ask4Employee({
          employeeChoices: employees,
          question: "Which employee's role do you want to update?",
        })
      );

      const [roles] = await readAllRoles(connection);
      const { roleId } = await inquirer.prompt(
        questions.askRole(roles, "What is the employee's new role?")
      );

      await updateEmployeeRole(connection, employeeId, roleId);
      console.info(`Updated employee's role`);
      render();
      break;
    }

    case "UPDATE_EMPLOYEE_MANAGER": {
      const [employees] = await readAllEmployees(connection);
      const { employeeId } = await inquirer.prompt(
        questions.ask4Employee({
          employeeChoices: employees,
          question: "Which employee's manager do you want to update?",
        })
      );

      const [possibleManagers] = await readAllPossibleManagers(
        connection,
        employeeId
      );

      const { employeeId: managerId } = await inquirer.prompt(
        questions.ask4Employee({
          employeeChoices: possibleManagers,
          question: "Who is the employee's new manager?",
          addlOptions: [{ name: "None", value: null }],
        })
      );

      await updateEmployeeMgr(connection, employeeId, managerId);
      console.info(`Updated employee's manager`);
      render();
      break;
    }

    case "VIEW_ROLES": {
      const [roles] = await readAllRoles(connection);
      console.table(roles);
      render();
      break;
    }

    case "ADD_ROLE": {
      const [departments] = await readAllDepartments(connection);
      const { departmentId } = await inquirer.prompt(
        questions.ask4Department(
          departments,
          "Which department does this role belong to?"
        )
      );

      const { title, salary } = await inquirer.prompt(
        questions.ask2AddRole(departmentId)
      );

      await createRole(connection, { title, salary, departmentId });
      console.info(`Added ${title} to the database`);
      render();
      break;
    }

    case "REMOVE_ROLE": {
      const [roles] = await readAllRoles(connection);
      const { roleId } = await inquirer.prompt(
        questions.askRole(roles, "Which role do you want to remove?")
      );

      await delRole(connection, roleId);
      console.info(`Removed role from the database`);
      render();
      break;
    }

    case "VIEW_DEPARTMENTS": {
      const departments = await readAllDepartments(connection);
      console.table(departments);
      render();
      break;
    }

    case "ADD_DEPARTMENT": {
      const { name } = await inquirer.prompt(questions.ask2AddDepartment());
      await createDepartment(connection, name);
      console.info(`Added ${name} to the database`);
      render();
      break;
    }

    case "REMOVE_DEPARTMENT": {
      const [departments] = await readAllDepartments(connection);
      const { departmentId } = await inquirer.prompt(
        questions.ask4Department(
          departments,
          "Which department do you want to remove?"
        )
      );

      await delDept(connection, departmentId);
      console.info(`Removed department from the database`);
      render();
      break;
    }

    case "VIEW_PAYROLE": {
      const { payroll } = await readAllPayroll(connection);
      console.table(payroll);
      render();
      break;
    }

    default:
      console.log("Goodbye!");
      process.exit();
      break;
  }
};

render();
