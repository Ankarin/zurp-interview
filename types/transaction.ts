import type { DateTime } from "luxon";

export enum Network {
  Credit = "credit",
  Debit = "debit",
}

export enum TransactionType {
  Authorization = "auth",
  Settlement = "setl",
  Backout = "backout",
}

export type Transaction = {
  type: TransactionType;
  network: Network;
  id: string;
  amount: number;
  pointAmount: number;
  description: string;
  timestamp: DateTime;
};


export type UseTransactionHook = {
  data: Transaction[];
  loading: boolean;
  lastFetchedTime: DateTime;
  fetchNextDay: () => void;
  currentDay: string;
}
