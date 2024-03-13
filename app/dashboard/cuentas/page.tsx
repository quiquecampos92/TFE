import { fetchFilteredCuentas, fetchMovimientosPages } from '@/app/lib/data';
import { Metadata } from 'next';
import CuentasTable from '@/app/ui/cuentas/table';

export const metadata: Metadata = {
  title: 'Cuentas',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    // iban?: string;
  };
}) {
  const query = searchParams?.query || '';

  // const id = searchParams?.id || '';
  // const iban = 'ES9820385778983000760300';
  // const id = '3958dc9e-712f-4377-85e9-fec4b6a6442a'
 
  const cuentas = await fetchFilteredCuentas();
  const movimientos = await fetchMovimientosPages();

  return (
    <main>
      {/* Pasar los datos como props al componente CuentasTable */}
      <CuentasTable cuenta={cuentas} movimientos={movimientos} />
    </main>
  );
}
