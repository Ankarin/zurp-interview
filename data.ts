import { v4 as uuidv4 } from "uuid";
import { Network, Transaction, TransactionType } from "./types/transaction";
import { START_DATE } from "./utils/constants";

type TransactionFactoryOptions = {
  description: string;
  amount: number;
  timeOffsetDays?: number;
} & (
  | { backout?: boolean; settlementAmount?: undefined }
  | { settlementAmount?: number; backout?: undefined }
);

function factory(options: TransactionFactoryOptions): Transaction[] {
  const authorization = {
    type: TransactionType.Authorization,
    network: Network.Credit,
    id: uuidv4(),
    amount: options.amount,
    pointAmount: Math.round(options.amount * 1000),
    description: options.description,
    timestamp: START_DATE.plus({ days: options.timeOffsetDays ?? 0 }),
  };
  const transactions: Transaction[] = [authorization];

  if (options.settlementAmount != null) {
    const amount = options.settlementAmount;

    transactions.push({
      ...authorization,
      type: TransactionType.Settlement,
      amount,
      pointAmount: Math.round(amount * 1000),
      timestamp: authorization.timestamp.plus({ day: 1 }),
    });
  }

  if (options.backout) {
    transactions.push({
      ...authorization,
      type: TransactionType.Backout,
      timestamp: authorization.timestamp.plus({ day: 1 }),
    });
  }

  return transactions;
}

export const transactions: Transaction[] = [
  ...factory({
    amount: 12.23,
    settlementAmount: 12.23,
    description: "BEV* VAIIRD MIDWAY IW +141213123667710 NY, 840",
  }),
  ...factory({
    amount: 9.41,
    settlementAmount: 9.41,
    description: "Quiznos",
  }),
  ...factory({
    amount: 60.0,
    settlementAmount: 57.15,
    description: "AfterPay",
    timeOffsetDays: 1,
  }),
  ...factory({
    amount: 78.38,
    description: "The Roost",
    backout: true,
    timeOffsetDays: 1,
  }),
  ...factory({
    amount: 89.82,
    settlementAmount: 89.82,
    description: "Pineapple Clu",
    timeOffsetDays: 2,
  }),
  ...factory({
    amount: 40.0,
    settlementAmount: 40.0,
    description: "Good Ol'Docs",
    timeOffsetDays: 3,
  }),
  ...factory({
    amount: 8.0,
    settlementAmount: 8.0,
    description: "Joe's Pizza",
    timeOffsetDays: 3,
  }),
  ...factory({
    amount: 100,
    settlementAmount: 34.91,
    description: "Pizza Pizza",
    timeOffsetDays: 5,
  }),
  ...factory({
    amount: 81.59,
    description: "Waylands Pizza",
    timeOffsetDays: 6,
  }),
  ...factory({
    amount: 88.82,
    description: "Hairy Dog",
    timeOffsetDays: 9,
  }),
];
