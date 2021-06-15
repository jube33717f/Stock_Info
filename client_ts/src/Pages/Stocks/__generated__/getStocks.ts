/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getStocks
// ====================================================

export interface getStocks_getStocks_stocks {
  __typename: "Stock";
  Name: string | null;
  Symbol: string | null;
  Price: number | null;
  WeekHigh52: number | null;
  WeekLow52: number | null;
  PriceEarnings: number | null;
}

export interface getStocks_getStocks {
  __typename: "StocksResponse";
  stocks: (getStocks_getStocks_stocks | null)[] | null;
  total: number | null;
}

export interface getStocks {
  getStocks: getStocks_getStocks | null;
}

export interface getStocksVariables {
  page?: number | null;
}
