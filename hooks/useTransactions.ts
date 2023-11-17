import { DateTime } from "luxon";
import { useRef, useMemo, useCallback, useState } from "react";
import { transactions } from "@/data";
import type {Transaction, UseTransactionHook} from "@/types/transaction";
import { sleep } from "@/utils/sleep";
import ms from "ms";

const firstDay = transactions[0].timestamp.startOf("day");
const STEP_DAY = 1;

export function useTransactions():UseTransactionHook {
  const [loading, updateLoading] = useState(false);
  const currentDate = useRef<DateTime>(firstDay);
  const [data, updateData] = useState<Transaction[]>(
    transactions.filter(
      (tx) => tx.timestamp <= firstDay.plus({ day: STEP_DAY })
    )
  );
  const [lastFetchedTime, updateLastFetchedTime] = useState(DateTime.utc());

  const fetchNextDay = useCallback(async () => {
    updateLoading(true);
    await sleep(ms("1s"));
    currentDate.current = currentDate.current.plus({ day: STEP_DAY });
    updateData(() =>
      transactions.filter(
        (tx) => tx.timestamp <= currentDate.current.endOf("day")
      )
    );
    updateLastFetchedTime(DateTime.utc());
    updateLoading(false);
  }, []);

  return useMemo(
    () => ({
      loading,
      fetchNextDay,
      data,
      currentDay: currentDate.current.toFormat("MMMM d, yyyy"),
      lastFetchedTime: lastFetchedTime
    }),
    [fetchNextDay, data, lastFetchedTime, loading]
  );
}
