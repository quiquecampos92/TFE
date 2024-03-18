import { FormattedCuentasTable, FormattedMovimientosTable } from '@/app/lib/definitions';
import { formatDateToLocal } from '@/app/lib/utils';
import Link from 'next/link';
import { UpdateMovimiento, DeleteMovimiento } from '@/app/ui/movimientos/buttons';
import { CreateMovimientos } from '@/app/ui/movimientos/buttons';
import { auth } from '@/auth';

export default async function MovimientosTable({
  movimiento,
  cuenta,
}: {
  movimiento: FormattedMovimientosTable[];
  cuenta: FormattedCuentasTable[];
}) {
  // Ordenar los movimientos de más reciente a más antiguo
  const movimientosOrdenados = movimiento.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // const getNombreCuenta = (cuenta_id: string) => {
  //   // Buscar la cuenta con el ID proporcionado
  //   const cuentaEncontrada = cuenta.find((c) => c.id === cuenta_id);
  
  //   // Si se encuentra la cuenta, devolver su nombre
  //   return cuentaEncontrada?.name;
  // };
  

  return (
    <div className="w-full">
      <h1 className="font-bold text-3xl md:text-4xl mb-8 text-[#EB8833]">
        Movimientos
      </h1>

      <CreateMovimientos />

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cantidad
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Concepto
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre de la cuenta
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {movimientosOrdenados.map((m) => (
              <tr key={m.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{m.cantidad}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{m.concepto}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{formatDateToLocal(m.date)}</div>
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{getNombreCuenta(m.cuenta_id)}</div>
                </td> */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{m.cuenta_id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-4">
                    <UpdateMovimiento id={m.id} />
                    <DeleteMovimiento id={m.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
