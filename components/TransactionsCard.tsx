import { Transaction } from "@/types/transaction";

export const TransactionsCard = ({transactions, title,}: { transactions: Transaction[]; title: string }) => {
    return (
        <div className={"border-2 border-gray-700/20 bg-transparent rounded-lg p-5"}>
            <p className={"text-xl font-bold"}>{title}</p>

            <ul className={"pt-5 text-md font-semibold"}>
                {transactions.map((transaction: Transaction, key: number) => (
                    <li key={key} className={"flex py-2 justify-between"}>
                        <div className={"flex"}>
                            <div
                                className={"rounded-full bg-green-900 h-8 w-8 mr-5"}
                            ></div>
                            <p className={"w-52 truncate"}>{transaction.description}</p>
                        </div>
                        <div className={"flex justify-end "}>
                            <p>${transaction.amount}</p>
                            <span className={"px-3"}>&bull;</span>
                            <p>
                                {transaction.pointAmount} points
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
