import { fetchCuentas } from '@/app/lib/data';
import Form from '@/app/ui/movimientos/create-form-cuenta';
import Breadcrumbs from '@/app/ui/movimientos/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crear Cuenta',
};

export default async function Page() {
  const cuentas = await fetchCuentas();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Cuentas', href: '/dashboard/cuentas' },
          {
            label: 'Crear Cuenta',
            href: '/dashboard/cuentas/create',
            active: true,
          },
        ]}
      />
      <Form cuentas={cuentas} />
    </main>
  );
}
