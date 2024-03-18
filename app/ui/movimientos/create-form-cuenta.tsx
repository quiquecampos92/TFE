'use client';

import { CuentasField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createMovimiento } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

export default function Form({ cuentas }: { cuentas: CuentasField[] }) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createMovimiento, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Cuenta Name */}
        {/* <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Elige cuenta
          </label>
          <div className="relative">
            <select
              id="cuenta"
              name="cuenta_Id"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="cuenta-error"
            >
              <option value="" disabled>
                Select a cuenta
              </option>
              {cuentas.map((cuenta) => (
                <option key={cuenta.id} value={cuenta.id}>
                  {cuenta.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>

          <div id="cuenta-error" aria-live="polite" aria-atomic="true">
            {state.errors?.cuenta_Id &&
              state.errors.cuenta_Id.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div> */}

        {/* Nombre cuenta */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Nombre de la cuenta
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="string"
                placeholder="Escribe un nombre"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="name-error"
              />
            </div>
          </div>

          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Iban Cuenta */}
        <fieldset>
          <legend className="mb- block text-sm font-medium">
            Iban
          </legend>
          <div >
            <input
              id="iban"
              name="iban"
              type="text"
              // defaultChecked={movimiento.iban === 'iban'}
              className="h-10 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div id="iban-error" aria-live="polite" aria-atomic="true">
            {state.errors?.iban &&
              state.errors.iban.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </fieldset>

        {/* Entidad cuenta */}
        <div className="mb-4">
          <label htmlFor="entidad" className="mb-2 block text-sm font-medium">
            Escribe una entidad
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="entidad"
                name="entidad"
                type="string"
                placeholder="Escribe una entidad"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="entidad-error"
              />
            </div>
          </div>

          <div id="entidad-error" aria-live="polite" aria-atomic="true">
            {state.errors?.entidad &&
              state.errors.entidad.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Saldo cuenta */}
        <div className="mb-4">
          <label htmlFor="saldo" className="mb-2 block text-sm font-medium">
            Saldo inicial
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="saldo"
                name="saldo"
                type="string"
                placeholder="Escoje una saldo"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="saldo-error"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>

          <div id="saldo-error" aria-live="polite" aria-atomic="true">
            {state.errors?.saldo &&
              state.errors.saldo.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div aria-live="polite" aria-atomic="true">
          {state.message ? (
            <p className="mt-2 text-sm text-red-500">{state.message}</p>
          ) : null}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/cuentas"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Crear Cuenta</Button>
      </div>
    </form>
  );
}
