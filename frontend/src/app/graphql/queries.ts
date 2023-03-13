import { gql } from 'apollo-angular';

export const LIST_EMPLOYEES = gql`
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

export const GET_EMPLOYEE = gql`
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
