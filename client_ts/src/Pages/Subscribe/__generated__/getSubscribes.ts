/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getSubscribes
// ====================================================

export interface getSubscribes_getSubscribes {
  __typename: "Stock";
  Name: string | null;
  Symbol: string | null;
  Price: number | null;
  WeekHigh52: number | null;
  WeekLow52: number | null;
  PriceEarnings: number | null;
}

export interface getSubscribes {
  getSubscribes: (getSubscribes_getSubscribes | null)[];
}

export interface getSubscribesVariables {
  id: number;
}
