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
  // Ordenar los movimientos de más reciente a más antiguo
  const movimientosOrdenados = movimiento.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="w-full">
      <h1 className="font-bold text-3xl md:text-4xl mb-8 text-[#EB8833]">
        Movimientos
      </h1>

      <CreateMovimientos />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {movimientosOrdenados.map((m) => (
          <div key={m.id} className="iban-container bg-white rounded-md p-4 shadow-md">
            <label className="block text-sm font-medium text-gray-500" htmlFor="cantidad">
              Cantidad
            </label>
            <p className="text-base font-semibold mb-2">{m.cantidad}</p>

            <label className="block text-sm font-medium text-gray-500" htmlFor="concepto">
              Concepto
            </label>
            <p className="text-base font-semibold mb-2">{m.concepto}</p>

            <label className="block text-sm font-medium text-gray-500" htmlFor="fecha">
              Fecha
            </label>
            <p className="text-base font-semibold mb-2">{formatDateToLocal(m.date)}</p>

            <div className="flex items-center">
              <UpdateMovimiento id={m.id} />
              <DeleteMovimiento id={m.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

