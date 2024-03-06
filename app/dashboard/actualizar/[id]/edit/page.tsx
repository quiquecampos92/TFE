import Form from '@/app/ui/movimientos/edit-form';
import Breadcrumbs from '@/app/ui/movimientos/breadcrumbs';
import { fetchMovimientoById, fetchCuentas } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Movimiento',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [movimiento, cuentas] = await Promise.all([
    fetchMovimientoById(id),
    fetchCuentas(),
  ]);

  if (!movimiento) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Movimientos', href: '/dashboard/movimientos' },
          {
            label: 'Edit movimientos',
            href: `/dashboard/movimientos/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form movimiento={movimiento} cuentas={cuentas} />
    </main>
  );
}
