'use client'
import { useTransactions } from '@/hooks/useTransactions';
import { useEffect, useState } from 'react';
import { Transaction, UseTransactionHook} from '@/types/transaction';
import { DateTime } from 'luxon';
import { Transactions } from '@/components/Transactions';



export default function Home() {
  const { data, loading, lastFetchedTime, fetchNextDay, currentDay }: UseTransactionHook = useTransactions();
  const [lastFetched, setLastFetched] = useState('0 seconds ago');
  useEffect(() => {
    setLastFetched(lastFetchedTime.toRelative()??'0 seconds ago');
    const intervalId = setInterval(() => {
      setLastFetched(lastFetchedTime.toRelative() ?? '0 seconds ago');
    }, 15000);
    return () => clearInterval(intervalId);
  }, [data]);

  const fetchNew = () => {
    if (loading) return
    fetchNextDay();
  }

  return (
      <main className="flex min-h-screen flex-col items-center p-24 max-w-4xl mx-auto">
        <div className={'flex w-full justify-between items-center '}>
          <div>
            <p className={'rounded-lg bg-white p-4 shadow font-semibold'}>Last updated ~{lastFetched}</p>
          </div>
          <div className={'text-center'}>
            <p className={'font-bold text-lg'}>{currentDay}</p>
            <button onClick={fetchNew} type="button" className="mt-3 text-md font-semibold ">
              {!loading ? 'Load next day' : 'Loading...'}
            </button>
          </div>
        </div>

        <Transactions transactions={data} />
      </main>
  );
}
