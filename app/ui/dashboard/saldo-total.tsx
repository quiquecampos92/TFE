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
    //aqui hay que hacer un for o algo para sumar todos los saldos de todas las
    return saldo;
  };

  return (
    <div className="w-full">
      {cuenta.map((c) => (
        <div key={c.id} className="iban-container bg-white rounded-md p-4 shadow-md mb-4">
{/* aqui habria que ver que ponemos para que sume los saldos */}

          <label className="block text-sm font-medium text-gray-500" htmlFor="saldo">
            Saldo Total
          </label>
          <p className="text-lg font-semibold mb-2">{getCuentaSaldo(c.id)}</p>
        </div>
      ))}
    </div>
  );
}
