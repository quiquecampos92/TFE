import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { fetchLatestMovimientos } from '@/app/lib/data';
import { movimientos } from '@/app/lib/placeholder-data';
export default async function LatestInvoices() {
  const latestMovimientos = await fetchLatestMovimientos();

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Últimos movimientos
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {latestMovimientos.map((movimiento, i) => {
            return (
              <div
                key={movimiento.id}
                className={clsx('flex flex-row items-center justify-between py-4',
                  {'border-t': i !== 0},
                )}
              >
                <div className="flex items-center">
                  <div className="min-w-0 mr-4">
                    <p className="truncate text-green-500 text-sm font-semibold md:text-base">
                      + {movimiento.cantidad}
                    </p>
                    <p className="text-sm text-gray-500 md:text-base">
                      Concepto: {movimiento.concepto}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Actualizado justo ahora</h3>
        </div>
      </div>
    </div>
  ); 
}
