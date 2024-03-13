import { sql } from '@vercel/postgres';
import {
  CuentasField,
  MovimientoForm,
  CuentaForm,
  InvoicesTable,
  LatestMovimientoRaw,
  User,
  Revenue,
  Cuentas,
} from './definitions';
import { formatCurrency } from './utils';
import { unstable_noStore as noStore } from 'next/cache';
interface CuentasTableType {
  id: string;
  user_id: string;
  iban: string;
  name: string;
  entidad: string;
  saldo: number;
}
interface MovimientosTableType {
  id: string;
  cuenta_id: string;
  cantidad: number;
  concepto: string;
  date: string;
}
export async function fetchRevenue() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    // console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestMovimientos() {
  noStore();
  try {
    const data = await sql<LatestMovimientoRaw>`
      SELECT 
        movimientos.cantidad, cuentas.name, cuentas.iban, movimientos.id
      FROM movimientos
      JOIN cuentas ON movimientos.cuenta_id = cuentas.id
      ORDER BY movimientos.date DESC
      LIMIT 5`;

    const latestMovimientos = data.rows.map((movimiento) => ({
      ...movimiento,
      cantidad: movimiento.cantidad,
    }));
    return latestMovimientos;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest movimientos.');
  }
}


export async function fetchMovimientosMetrics() {
  noStore();
  try {
    const movimientosID = await sql`
      SELECT id
      FROM movimientos`;

    return {
      movimientosID
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch movimientos metrics.');
  }
}



export async function fetchCardData() {
  noStore();
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchMovimientosPages() {
  noStore();
  try {
    const data = await sql<MovimientosTableType>`
    SELECT
      id,
      cuenta_id,
      cantidad,
      concepto,
      date
    FROM movimientos
  `;

    const movimientos = data.rows
    return movimientos;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of movimientos.');
  }
}

// export async function fetchCustomers() {
//   try {
//     const data = await sql<CustomerField>`
//       SELECT
//         id,
//         name
//       FROM customers
//       ORDER BY name ASC
//     `;

//     const customers = data.rows;
//     return customers;
//   } catch (err) {
//     console.error('Database Error:', err);
//     throw new Error('Failed to fetch all customers.');
//   }
// }

export async function fetchMovimientoById(id: string) {
  noStore();
  try {
    const data = await sql<MovimientoForm>`
      SELECT
        id,
        cuenta_id,
        cantidad,
        concepto
      FROM movimientos
      WHERE id = ${id};
    `;

    const movimiento = data.rows.map((movimiento) => ({
      ...movimiento,
      // Convert cantidad from cents to dollars
      cantidad: movimiento.cantidad,
    }));

    return movimiento[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCuentaById(id: string) {
  noStore();
  try {
    const data = await sql<CuentaForm>`
      SELECT
        id,
        user_id,
        iban,
        name,
        entidad,
        saldo
      FROM cuentas
      WHERE id = ${id};
    `;

    const cuenta = data.rows.map((cuenta) => ({
      ...cuenta,
      // Convert cantidad from cents to dollars
      id: cuenta.id,
    }));

    return cuenta[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch cuenta.');
  }
}

export async function fetchCuentas() {
  try {
    const data = await sql<CuentasField>`
      SELECT
        id,
        user_id,
        iban,
        name,
        entidad,
        saldo
      FROM cuentas
      ORDER BY name ASC
    `;

    const cuentas = data.rows;
    return cuentas;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all cuentas.');
  }
}

export async function fetchUsers() {
  try {
    const data = await sql<CuentasField>`
      SELECT
        id,
        user_id,
        iban,
        name,
        entidad,
        saldo
      FROM cuentas
      ORDER BY name ASC
    `;

    const cuentas = data.rows;
    return cuentas;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all cuentas.');
  }
}




export async function fetchFilteredCuentas() {
  noStore();
  try {
    const data = await sql<CuentasTableType>`
      SELECT
        id,
        user_id,
        iban,
        name,
        entidad,
        saldo
      FROM cuentas
    `;

    const cuentas = data.rows

    return cuentas;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch cuentas.');
  }
}



export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
