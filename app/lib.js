export const readAllDepartments = (conn) =>
  conn.execute("SELECT * FROM `employee`.`department`;");

// Find all employees, join with roles and departments to display their roles, salaries, departments, and managers
export const readAllEmployees = (conn) =>
  conn.execute(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, '', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
  );

export const readAllEmployeesByDepartment = (conn, departmentId) =>
  conn.execute(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;",
    [departmentId]
  );

export const readAllEmployeesByManager = (conn, managerId) =>
  conn.execute(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE employee.manager_id = ?;",
    [managerId]
  );

export const readAllPayroll = (conn) =>
  conn.execute(
    "SELECT department.id, department.name, SUM(role.salary) AS department_payroll FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id GROUP BY department.id, department.name;"
  );

export const readAllPossibleManagers = (conn, employeeId) =>
  conn.execute(
    "SELECT id, first_name, last_name FROM employee WHERE id != ?;",
    [employeeId]
  );

export const readAllRoles = (conn) =>
  conn.execute("SELECT * FROM `employee`.`role`;");

export const createDepartment = (conn, name) =>
  conn.query("INSERT INTO department SET ?", [{ name }]);

// Create a new employee
export const createEmployee = (conn, employee) =>
  conn.query("INSERT INTO employee SET ?", [
    {
      first_name: employee.firstName,
      last_name: employee.lastName,
      role_id: employee.roleId,
      manager_id: employee.managerId,
    },
  ]);

// Create a new role
export const createRole = (conn, role) =>
  conn.query("INSERT INTO role SET ?", [
    {
      title: role.title,
      salary: role.salary,
      department_id: role.departmentId,
    },
  ]);

// Update Employee to manager
export const updateEmployeeMgr = (conn, employeeId, managerId) =>
  conn.query("UPDATE employee SET manager_id = ? WHERE id = ?", [
    managerId,
    employeeId,
  ]);

// Update employee role
export const updateEmployeeRole = (conn, employeeId, roleId) =>
  conn.query("UPDATE employee SET role_id = ? WHERE id = ?", [
    roleId,
    employeeId,
  ]);

// Delete a department
export const delDept = (conn, id) =>
  conn.query("DELETE FROM department WHERE id = ?", [id]);

// Delete an employee
export const delEmployee = (conn, id) =>
  conn.query("DELETE FROM employee WHERE id = ?", [id]);

// Delete a role
export const delRole = (conn, id) =>
  conn.query("DELETE FROM role WHERE id = ?", [id]);
