/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getStocksBySector
// ====================================================

export interface getStocksBySector_getStocksBySector {
  __typename: "Stock";
  Name: string | null;
  Symbol: string | null;
  Price: number | null;
  WeekHigh52: number | null;
  WeekLow52: number | null;
  PriceEarnings: number | null;
}

export interface getStocksBySector {
  getStocksBySector: (getStocksBySector_getStocksBySector | null)[] | null;
}

export interface getStocksBySectorVariables {
  Sector: string;
}
