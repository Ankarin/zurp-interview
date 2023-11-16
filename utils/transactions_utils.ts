// here we have functions to manipulate lists of transactions and get the data we need

import { Transaction } from "@/types/transaction";

export const onlyValidTransactions = (transactions: Transaction[]): Transaction[] => {
    return transactions
        .filter((transaction) => transaction.type !== "backout")
        .sort((a, b) => b.timestamp - a.timestamp);
};

export const removeDuplicates = (transactions: Transaction[]): Transaction[] => {
    const transactionsMap = new Map();
    transactions.forEach((transaction) => {
        const existingTransaction = transactionsMap.get(transaction.id);
        if (
            !existingTransaction ||
            (transaction.type === "setl" && existingTransaction.type !== "setl")
        ) {
            transactionsMap.set(transaction.id, transaction);
        }
    });
    return Array.from(transactionsMap.values());
};

export const getPendingTransactions = (transactions: Transaction[]): Transaction[] => {
    return transactions.filter((transaction) => transaction.type === "auth");
};

export const getCompletedTransactions = (transactions: Transaction[]): Transaction[] => {
    return transactions.filter((transaction) => transaction.type === "setl");
};

export const splitCompletedInModules = (transactions: Transaction[]): Map<string, Transaction[]> => {
    const separated = new Map();
    transactions.forEach((transaction: Transaction) => {
        const formatedDate = transaction.timestamp.toFormat("MMMM d, yyyy");
        if (separated.has(formatedDate)) {
            separated.set(formatedDate, [...separated.get(formatedDate), transaction]);
        } else {
            separated.set(formatedDate, [transaction]);
        }
    });
    return separated;
};
