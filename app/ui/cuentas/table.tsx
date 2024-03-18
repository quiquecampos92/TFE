import { FormattedCuentasTable, FormattedMovimientosTable } from '@/app/lib/definitions';
import { UpdateMovimiento, DeleteMovimiento } from '@/app/ui/movimientos/buttons';
import { CreateCuenta } from '@/app/ui/movimientos/buttons';
import { auth } from '@/auth';

export default async function CuentasTable({
  cuenta,
  movimientos,
}: {
  cuenta: FormattedCuentasTable[];
  movimientos: FormattedMovimientosTable[];
}) {
  const getCuentaSaldo = (cuentaId: string) => {
    const movimientosCuenta = movimientos.filter((m) => m.cuenta_id === cuentaId);
    const saldo = movimientosCuenta.reduce((total, movimiento) => total + movimiento.cantidad, 0);
    return saldo;
  };

  // Obtener la sesión del usuario
  const session = await auth();
  const user = session?.user;

  // Filtrar las cuentas del usuario actual
  const cuentasUsuario = cuenta.filter((c) => c.user_id === '410544b2-4001-4271-9855-fec4b6a6442a');

  return (
    <div className="w-full">
      <h1 className="font-bold text-3xl md:text-4xl mb-8 text-green-800">
        Cuentas
      </h1>

      <CreateCuenta />
      <br /><br />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cuentasUsuario.map((c) => (
          <div key={c.id} className="iban-container bg-white rounded-md p-4 shadow-md mb-4">
            <label className="block text-sm font-medium text-gray-500" htmlFor="name">
              Nombre de la cuenta
            </label>
            <p className="text-lg font-semibold mb-2">{c.name}</p>

            <label className="block text-sm font-medium text-gray-500" htmlFor="iban">
              IBAN
            </label>
            <p className="text-lg font-semibold mb-2">{c.iban}</p>

            <label className="block text-sm font-medium text-gray-500" htmlFor="entidad">
              Entidad
            </label>
            <p className="text-lg font-semibold mb-2">{c.entidad}</p>

            <label className="block text-sm font-medium text-gray-500" htmlFor="saldo">
              Saldo
            </label>
            <p className="text-lg font-semibold mb-2">{getCuentaSaldo(c.id)}</p>
            <div className="flex items-center">
              <UpdateMovimiento id={c.id} />
              <DeleteMovimiento id={c.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
