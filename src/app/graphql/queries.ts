import { gql } from 'apollo-angular';

export const LOGIN_QUERY = gql`
  query Login($usernameOrEmail: String!, $password: String!) {
    login(usernameOrEmail: $usernameOrEmail, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

export const GET_ALL_EMPLOYEES = gql`
  query {
    getAllEmployees {
      id
      first_name
      last_name
      email
      designation
      department
    }
  }
`;

export const GET_EMPLOYEE_BY_ID = gql`
  query GetEmployeeById($id: ID!) {
    getEmployeeById(id: $id) {
      id
      first_name
      last_name
      email
      gender
      designation
      department
      salary
      date_of_joining
      employee_photo
    }
  }
`;

export const SEARCH_EMPLOYEES = gql`
  query SearchEmployees($department: String, $designation: String) {
    searchEmployees(department: $department, designation: $designation) {
      id
      first_name
      last_name
      email
      designation
      department
    }
  }
`;
