'use client';

import { CuentasField, UsersField, MovimientoForm, CuentaForm } from '@/app/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateMovimiento, updateCuenta } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

export default function EditCuentaForm({
  cuenta,
  users,
}: {
  cuenta: CuentaForm;
  users: UsersField[];
}) {
  const initialState = { message: null, errors: {} };
  const updateCuentaWithId = updateCuenta.bind(null, cuenta.id);
  const [state, dispatch] = useFormState(updateCuentaWithId, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Cuenta Name */}
        <div className="mb-4">
          <label htmlFor="cuenta_Id" className="mb-2 block text-sm font-medium">
            Elige cuenta
          </label>
          <div className="relative">
            <select
              id="user_Id"
              name="user"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={cuenta.user_id}
              aria-describedby="cuenta-error"
            >
              <option value="" disabled>
                Selecciona un usuario
              </option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
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
        </div>

        {/* Cantidad movimiento */}
        <div className="mb-4">
          <label htmlFor="cantidad" className="mb-2 block text-sm font-medium">
            Elige una cantidad
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="string"
                defaultValue={cuenta.name}
                placeholder="Indica la cantidad en euros"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="cantidad-error"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>

          <div id="cantidad-error" aria-live="polite" aria-atomic="true">
            {state.errors?.cantidad &&
              state.errors.cantidad.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Movimiento Concepto */}
        <fieldset>
          <legend className="mb- block text-sm font-medium">
            Concepto
          </legend>
          <div>
            <input
              id="concepto"
              name="concepto"
              type="text"
              // defaultChecked={movimiento.concepto === 'concepto'}
              className="h-10 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div id="concepto-error" aria-live="polite" aria-atomic="true">
            {state.errors?.concepto &&
              state.errors.concepto.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </fieldset>

        <div aria-live="polite" aria-atomic="true">
          {state.message ? (
            <p className="my-2 text-sm text-red-500">{state.message}</p>
          ) : null}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/movimientos"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Editar movimiento</Button>
      </div>
    </form>
  );
}
