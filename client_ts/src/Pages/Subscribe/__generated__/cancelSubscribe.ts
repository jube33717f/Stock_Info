/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: cancelSubscribe
// ====================================================

export interface cancelSubscribe_cancelSubscribe {
  __typename: "SubscribeUpdateResponse";
  success: boolean;
  message: string | null;
}

export interface cancelSubscribe {
  cancelSubscribe: cancelSubscribe_cancelSubscribe;
}

export interface cancelSubscribeVariables {
  id: number;
  Symbol: string;
}
