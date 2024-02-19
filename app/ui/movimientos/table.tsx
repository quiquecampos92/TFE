import { FormattedMovimientosTable } from '@/app/lib/definitions';
import { formatDateToLocal } from '@/app/lib/utils';
import Link from 'next/link';
import { UpdateMovimiento, DeleteMovimiento } from '@/app/ui/movimientos/buttons';
import { CreateMovimientos } from '@/app/ui/movimientos/buttons';
export default async function MovimientosTable({
  movimiento,
}: {
  movimiento: FormattedMovimientosTable[];
}) {

  return (
    <div className="w-full">
      <h1 className="font-bold text-3xl md:text-4xl mb-8 text-green-800">
        Movimientos
      </h1>
      
      <CreateMovimientos />

      {movimiento.map((m) => (
        <div key={m.id} className="iban-container bg-white rounded-md p-4 shadow-md mb-4">
          <label className="block text-sm font-medium text-gray-500" htmlFor="cantidad">
            Cantidad
          </label>
          <p className="text-lg font-semibold mb-2">{m.cantidad}</p>

          <label className="block text-sm font-medium text-gray-500" htmlFor="concepto">
            Concepto
          </label>
          <p className="text-lg font-semibold mb-2">{m.concepto}</p>

          <label className="block text-sm font-medium text-gray-500" htmlFor="fecha">
            Fecha
          </label>
          <p className="text-lg font-semibold mb-2">{formatDateToLocal(m.date)}</p>

          <div className="flex items-center">
            <UpdateMovimiento id={m.id} />
            <DeleteMovimiento id={m.id} />
          </div>
        </div>

      ))}
    </div>
  );
}