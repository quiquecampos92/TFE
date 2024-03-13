import FormCuenta from '@/app/ui/movimientos/edit-form-cuenta';
import Breadcrumbs from '@/app/ui/movimientos/breadcrumbs';
import { fetchMovimientoById, fetchCuentaById, fetchCuentas, fetchUsers } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Movimiento',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [cuenta, users] = await Promise.all([
    fetchCuentaById(id),
    fetchUsers(),
  ]);

  if (!cuenta) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Cuentas', href: '/dashboard/cuentas' },
          {
            label: 'Edit cuentas',
            href: `/dashboard/cuentas/${id}/edit`,
            active: true,
          },
        ]}
      />
      <FormCuenta cuenta={cuenta} users={users} />
    </main>
  );
}
