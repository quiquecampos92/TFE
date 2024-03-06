import { fetchMovimientosPages } from '@/app/lib/data';
import { Metadata } from 'next';
import MovimientosTable from '@/app/ui/movimientos/table';


export const metadata: Metadata = {
  title: 'Estadísticas',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  // const currentPage = Number(searchParams?.page) || 1;

  const movimientos = await fetchMovimientosPages();

  return (
    <>
      <MovimientosTable movimiento={movimientos} />
    </>
  );
}
