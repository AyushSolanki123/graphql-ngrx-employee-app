export const LIST_EMPLOYEES = `
  query list {
    listEmployee {
      _id
      id
      firstName
      lastName
      dob
      company
      email
    }
  }
`;

export const GET_EMPLOYEE = `
  query getEmployeeDetails($id: Int!) {
    getEmployee(id: $id) {
      _id
      id
      firstName
      lastName
      dob
      company
      email
    }
  }
`;
