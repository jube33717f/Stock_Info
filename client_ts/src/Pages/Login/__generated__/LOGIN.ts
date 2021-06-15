/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LOGIN
// ====================================================

export interface LOGIN_login {
  __typename: "User";
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  id: number | null;
}

export interface LOGIN {
  login: LOGIN_login | null;
}

export interface LOGINVariables {
  email: string;
  password: string;
}
