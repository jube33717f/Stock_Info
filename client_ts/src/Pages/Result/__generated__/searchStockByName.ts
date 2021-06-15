/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: searchStockByName
// ====================================================

export interface searchStockByName_searchStockByName {
  __typename: "Stock";
  Name: string | null;
  Symbol: string | null;
  Price: number | null;
  WeekHigh52: number | null;
  WeekLow52: number | null;
  PriceEarnings: number | null;
}

export interface searchStockByName {
  searchStockByName: (searchStockByName_searchStockByName | null)[] | null;
}

export interface searchStockByNameVariables {
  keyword: string;
}
