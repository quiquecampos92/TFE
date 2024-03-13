'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

//MOVIMIENTOS

const FormSchema = z.object({
  id: z.string(),
  cuenta_Id: z.string({
    invalid_type_error: 'Please select a cuenta.',
  }),
  cantidad: z.coerce
    .number()
    .gt(0, { message: 'Please enter una cantidad greater than $0.' }),
  concepto: z.string({
    invalid_type_error: 'Please enter a concepto del movimiento .',
  }),
  date: z.string(),
});

const CreateMovimiento = FormSchema.omit({ id: true, date: true });
const UpdateMovimiento = FormSchema.omit({ date: true, id: true });

// This is temporary
export type State = {
  errors?: {
    cuenta_Id?: string[];
    cantidad?: string[];
    concepto?: string[];
    user_Id?: string[];
    name?: string[];
    iban?: string[];
    entidad?: string[];
  };
  message?: string | null;
};

export async function createMovimiento(prevState: State, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateMovimiento.safeParse({
    cuenta_Id: formData.get('cuenta_Id'),
    cantidad: formData.get('cantidad'),
    concepto: formData.get('concepto'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Movimiento.',
    };
  }

  // Prepare data for insertion into the database
  const { cuenta_Id, cantidad, concepto } = validatedFields.data;
  // const cantidadInCents = cantidad * 100;
  const cantidadSinCents = cantidad;
  const date = new Date().toISOString().split('T')[0];

  // Insert data into the database
  try {
    await sql`
      INSERT INTO movimientos (cuenta_id, cantidad, concepto, date)
      VALUES (${cuenta_Id}, ${cantidadSinCents}, ${concepto}, ${date})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Movimiento.',
    };
  }

  // Revalidate the cache for the movimiento page and redirect the user.
  revalidatePath('/dashboard/movimientos');
  redirect('/dashboard/movimientos');
}

export async function updateMovimiento(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateMovimiento.safeParse({
    cuenta_Id: formData.get('cuenta_Id'),
    cantidad: formData.get('cantidad'),
    concepto: formData.get('concepto'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Movimiento.',
    };
  }

  const { cuenta_Id, cantidad, concepto } = validatedFields.data;

  try {
    await sql`
    UPDATE movimientos
    SET cantidad = ${cantidad}, concepto = ${concepto}
    WHERE id = ${id}
    `;
    console.log(id);
  } catch (error) {
    return { message: 'Database Error: Failed to Update Movimiento.' };
  }

  revalidatePath('/dashboard/movimientos');
  redirect('/dashboard/movimientos');
}

export async function deleteMovimiento(id: string) {
  // throw new Error('Failed to Delete Movimiento');
  console.log('Eliminando movimiento con ID:', id);
  try {
    await sql`DELETE FROM movimientos WHERE id = ${id}`;
    revalidatePath('/dashboard/movimientos');
    return { message: 'Deleted Movimientos' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Movimiento.' };
  }
}

const FormSchemaCuentas = z.object({
  id: z.string(),
  user_Id: z.string({
    invalid_type_error: 'Please select un usuario.',
  }),
  name: z.string({
    invalid_type_error: 'Please select un usuario.',
  }),
  iban: z.string({
    invalid_type_error: 'Please select un usuario.',
  }),
  entidad: z.string({
    invalid_type_error: 'Please enter a concepto del movimiento .',
  }),
  date: z.string(),
});

//CUENTAS

const CreateCuenta = FormSchemaCuentas.omit({ id: true, date: true });
const UpdateCuenta = FormSchemaCuentas.omit({ date: true, id: true });

export async function createCuenta(prevState: State, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateCuenta.safeParse({
    user_Id: formData.get('user_Id'),
    name: formData.get('name'),
    iban: formData.get('iban'),
    entidad: formData.get('entidad'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Cuenta.',
    };
  }

  // Prepare data for insertion into the database
  const { user_Id, name, iban, entidad } = validatedFields.data;
  // const cantidadInCents = cantidad * 100;
  const date = new Date().toISOString().split('T')[0];

  // Insert data into the database
  try {
    await sql`
      INSERT INTO cuentas (user_Id, name, iban, entidad, date)
      VALUES (${user_Id}, ${name}, ${iban}, ${entidad}, ${date})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Cuenta.',
    };
  }
}

  // Revalidate the cache for the cuenta page and redirect the user.
  revalidatePath('/dashboard/cuentas');
  // redirect('/dashboard/cuentas'); ESTO HAY QUE CAMBIARLO PAR VER SI FUNCIONA CORRECTAMENTE

export async function updateCuenta(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateCuenta.safeParse({
    user_Id: formData.get('user_Id'),
    name: formData.get('name'),
    iban: formData.get('iban'),
    entidad: formData.get('entidad'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Cuenta.',
    };
  }

  const { name, iban, entidad } = validatedFields.data;

  try {
    await sql`
    UPDATE cuentas
    SET name = ${name}, iban = ${iban}, entidad = ${entidad}
    WHERE id = ${id}
    `;
    console.log(id);
  } catch (error) {
    return { message: 'Database Error: Failed to Update Cuenta.' };
  }

  revalidatePath('/dashboard/cuentas');
  redirect('/dashboard/cuentas');
}

export async function deleteCuenta(id: string) {
  // throw new Error('Failed to Delete Movimiento');
  console.log('Eliminando cuenta con ID:', id);
  try {
    await sql`DELETE FROM cuentas WHERE id = ${id}`;
    revalidatePath('/dashboard/cuentas');
    return { message: 'Deleted Cuentas' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Cuenta.' };
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
