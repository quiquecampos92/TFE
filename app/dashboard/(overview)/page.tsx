import CardWrapper from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import { fetchFilteredCuentas, fetchMovimientosPages } from '@/app/lib/data';
import LatestMovimientos from '@/app/ui/dashboard/latest-movimientos';
import SaldoTotal from '@/app/ui/dashboard/saldo-total';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
  CardsSkeleton,
} from '@/app/ui/skeletons';

export default async function Page() {
  const cuentas = await fetchFilteredCuentas();
  const movimientos = await fetchMovimientosPages();

  return (
    <main>
      <h1 className="font-bold text-3xl md:text-4xl mb-8 text-[#EB8833]">
        ESTADÍSTICAS
      </h1>
      {/* <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div> */}
      
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          <SaldoTotal cuenta={cuentas} movimientos={movimientos} />
        </div>
      
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense> */}
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestMovimientos />
        </Suspense>
      </div> 
        <br />
     
        
    </main>
  );
}
