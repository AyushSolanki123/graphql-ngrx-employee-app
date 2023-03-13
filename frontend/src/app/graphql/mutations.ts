import { gql } from 'apollo-angular';

export const ADD_EMPLOYEE = gql`
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

export const UPDATE_EMPLOYEE = gql`
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

export const DELETE_EMPLOYEE = gql`
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
