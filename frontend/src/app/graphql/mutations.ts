export const ADD_EMPLOYEE = `
  mutation add($input: AddEmployeeInput!) {
    addEmployee(input: $input) {
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

export const UPDATE_EMPLOYEE = `
  mutation update($input: UpdatedEmployeeInput!) {
    updateEmployee(input: $input) {
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

export const DELETE_EMPLOYEE = `
  mutation delete($id: Int!) {
    deleteEmployee(id: $id) {
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
