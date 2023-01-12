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

export default {};
