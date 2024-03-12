import { FormattedCuentasTable, FormattedMovimientosTable } from '@/app/lib/definitions';

export default async function CuentasTable({
  cuenta,
  movimientos,
}: {
  cuenta: FormattedCuentasTable[];
  movimientos: FormattedMovimientosTable[];
}) {
  const getTotalSaldo = () => {
    const totalSaldo = cuenta.reduce((total, c) => {
      const movimientosCuenta = movimientos.filter((m) => m.cuenta_id === c.id);
      const saldoCuenta = movimientosCuenta.reduce((subtotal, movimiento) => subtotal + movimiento.cantidad, 0);
      return total + saldoCuenta;
    }, 0);
  
    return totalSaldo;
  };
  
  return (
    <div className="w-full">
      <div className="iban-container bg-white rounded-md p-4 shadow-md mb-4">
        <label className="block text-sm font-medium text-gray-500" htmlFor="saldo">
          Saldo Total
        </label>
        <p className="text-lg font-semibold mb-2">{getTotalSaldo()} €</p>
      </div>
    </div>
  );
  
}
