## Zurp take home challenge

This project was started with create-next-app.

#### Development

To start development first install the dependencies: `npm install`

Second, run `npm run dev`

### Challenge details

We’re a fintech company, so we deal with lots of different types of financial transactions, one being credit card transactions. Our customers understand credit card transactions as being in one of two states: either _pending_ or _not pending_. But there’s actually many more stages a single credit card transaction goes through.

Here’s a simplified flow of a credit card transaction made by a customer at Starbucks.

1. Customer buys a coffee for _$5.49_ from _Starbucks_
   This initial purchase is known as an **authorization** and acts as a reservation of the customer’s money.
1. The credit card network then sends the **authorization** to the bank and credit card issuer (that's us)
   This is when the customer should see a _pending_ transaction in their list of transactions.
1. Over the next 24-48hrs the money will move between the banks and merchant, in this case _Starbucks_.
   This is called a **settlement**, when funds are moved between institutions

There’s one other type of transaction that you’ll encounter, known as a **backout**. A **backout** will only apply to an **authorization** and never to a settlement. A **backout** indicates the transaction was not completed and money should not be moved. When a **backout** of an **authorization** occurs, the customer should not be able to see that transaction.

Your task will be to display a list of a fictional customer’s transactions. You will receive a list of **authorizations**, **settlements**, and **backouts** from which you'll need to show only the valid transactions.

You'll be given a React hook with the following signature:

```TypeScript
function useTransactions(): {
  /**
   * A list of the transactions currently available to you
   * See types/transaction.ts for more details types.
   */
  data: Transaction[];
  /**
   * A simulated network time between loading more transactions
   */
  loading: boolean;
  /**
   * A method to simulate time passing and more transactions occurring
   */
  getNextDay(): VoidFunction;
  /**
   * What day the simulator is currently on
   */
  currentDay: string;
  /**
   * The last time we attempted to fetch more transactions
   */
   lastFetchedTime: Luxon.DateTime,
};
```

Using that hook you should implement the interface in the video shown below.

[![FinalProduct](https://github.com/zurpinc/frontend-focused-interview/assets/6516758/ce59f45a-3379-48ed-ab0f-16f254918617)](https://www.loom.com/share/bcb74d98d1ac431e8d5b6a8f7964acc3?sid=6962de23-8e8b-4d66-a08b-d1bb950b8527)

| 🚨 **Don’t spend any more than 2 hours on the exercise**

What we’re looking for:

- A clear understanding of React and TypeScript
  You may use simple external helper libraries such as _lodash_.
- A complete and working solution
- Styling as close as possible to the example
  | Note: There’s no need to consider responsive styling.
  You may use the included tailwindcss, or a React styling library like StyledComponents. **Do not use a component library**

If you have questions, please reach out to your recruiter before beginning the challenge.

Good luck!
