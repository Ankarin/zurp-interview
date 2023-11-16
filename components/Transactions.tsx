import { Transaction } from "@/types/transaction"
import { TransactionsCard } from "@/components/TransactionsCard"
import {
    getCompletedTransactions,
    getPendingTransactions,
    onlyValidTransactions,
    removeDuplicates,
} from "@/utils/transactions_utils"
import { splitCompletedInModules } from "@/utils/transactions_utils"

export const Transactions = ({ transactions }: { transactions: Transaction[] }) => {

    // clean data
    const validTransactions: Transaction[] = onlyValidTransactions(transactions)
    const noDuplicates: Transaction[] = removeDuplicates(validTransactions)

    //split into based on types
    const pendingTransactions: Transaction[] = getPendingTransactions(noDuplicates)
    const completedTransactions: Transaction[] = getCompletedTransactions(noDuplicates)

    // split transactions in modules by date
    const splitInModules = splitCompletedInModules(completedTransactions)

    return (
        <div className={"pt-10 w-full grid gap-6"}>
            <TransactionsCard title={"Pending"} transactions={pendingTransactions} />
            {Array.from(splitInModules).map(([formattedDate, transactions]) => (
                <TransactionsCard transactions={transactions} title={formattedDate} key={formattedDate} />
            ))}
        </div>
    );
};
