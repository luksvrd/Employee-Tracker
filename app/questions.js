function renderDepartmentList(departmentList) {
  return departmentList.map((department) => ({
    name: department.name,
    value: department.id,
  }));
}

// This will also be used for the manager list
function renderEmployeeList(employeeList) {
  return employeeList.map((employee) => ({
    name: employee.name,
    value: employee.id,
  }));
}

function renderRolesList(roleList) {
  return roleList.map((role) => ({
    name: role.title,
    value: role.id,
  }));
}

export default {
  // Main Menu
  askMainQuestions() {
    return [
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          {
            name: "View All Employees",
            value: "VIEW_EMPLOYEES",
          },
          {
            name: "View All Employees By Department",
            value: "VIEW_EMPLOYEES_BY_DEPARTMENT",
          },
          {
            name: "View All Employees By Manager",
            value: "VIEW_EMPLOYEES_BY_MANAGER",
          },
          {
            name: "Add Employee",
            value: "ADD_EMPLOYEE",
          },
          {
            name: "Remove Employee",
            value: "REMOVE_EMPLOYEE",
          },
          {
            name: "Update Employee Role",
            value: "UPDATE_EMPLOYEE_ROLE",
          },
          {
            name: "Update Employee Manager",
            value: "UPDATE_EMPLOYEE_MANAGER",
          },
          {
            name: "View All Roles",
            value: "VIEW_ROLES",
          },
          {
            name: "Add Role",
            value: "ADD_ROLE",
          },
          {
            name: "Remove Role",
            value: "REMOVE_ROLE",
          },
          {
            name: "View All Departments",
            value: "VIEW_DEPARTMENTS",
          },
          {
            name: "Add Department",
            value: "ADD_DEPARTMENT",
          },
          {
            name: "Remove Department",
            value: "REMOVE_DEPARTMENT",
          },
          {
            name: "Quit",
            value: "QUIT",
          },
        ],
      },
    ];
  },

  ask4Department(departmentChoices, question) {
    return [
      {
        type: "list",
        name: "departmentId",
        message: question,
        choices: renderDepartmentList(departmentChoices),
      },
    ];
  },
  ask4Employee({ employeeChoices, question, addlOptions = [] }) {
    return [
      {
        type: "list",
        name: "employeeId",
        message: question,
        choices: [...renderEmployeeList(employeeChoices), ...addlOptions],
      },
    ];
  },
  ask4Role(roleChoices, questions) {
    return [
      {
        type: "list",
        name: "roleId",
        message: questions,
        choices: renderRolesList(roleChoices),
      },
    ];
  },
  ask2AddDept() {
    return [
      {
        type: "input",
        name: "name",
        message: "What is the name of the department?",
      },
    ];
  },
  ask2AddEmployee() {
    return [
      {
        type: "input",
        name: "firstName",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employee's last name?",
      },
    ];
  },
  ask2AddRole() {
    return [
      {
        type: "input",
        name: "title",
        message: "What is the title of the role?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary of the role?",
      },
    ];
  },
};
