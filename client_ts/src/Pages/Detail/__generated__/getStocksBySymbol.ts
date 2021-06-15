/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getStocksBySymbol
// ====================================================

export interface getStocksBySymbol_getOneStock {
  __typename: "Stock";
  Name: string | null;
  Symbol: string | null;
  Price: number | null;
  WeekHigh52: number | null;
  WeekLow52: number | null;
  PriceEarnings: number | null;
}

export interface getStocksBySymbol {
  getOneStock: getStocksBySymbol_getOneStock;
}

export interface getStocksBySymbolVariables {
  Symbol: string;
}
