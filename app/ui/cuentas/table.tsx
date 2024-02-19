import { FormattedCuentasTable, FormattedMovimientosTable } from '@/app/lib/definitions';

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

  return (
    <div className="w-full">
      <h1 className="font-bold text-3xl md:text-4xl mb-8 text-green-800">
        Cuentas
      </h1>
      {cuenta.map((c) => (
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
        </div>
      ))}
    </div>
  );
}
