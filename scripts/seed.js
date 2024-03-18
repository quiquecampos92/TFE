const { db } = require('@vercel/postgres');
const {
  movimientos,
  cuentas,
  users,
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedMovimientos(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "movimientos" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS movimientos (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    cuenta_id UUID NOT NULL REFERENCES cuentas(id),
    cantidad INT NOT NULL,
    concepto VARCHAR(255) NOT NULL,
    date DATE NOT NULL
  );
`;

    console.log(`Created "movimientos" table`);

    // Insert data into the "movimientos" table
    const insertedMovimientos = await Promise.all(
      movimientos.map(
        (movimiento) => client.sql`
        INSERT INTO movimientos (id, cuenta_id, cantidad, concepto, date)
        VALUES (${movimiento.id}, ${movimiento.cuenta_id}, ${movimiento.cantidad}, ${movimiento.concepto}, ${movimiento.date})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedMovimientos.length} movimientos`);

    return {
      createTable,
      movimientos: insertedMovimientos,
    };
  } catch (error) {
    console.error('Error seeding movimientos:', error);
    throw error;
  }
}

async function seedCuentas(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "cuentas" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS cuentas (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID REFERENCES users(id),
        iban VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        entidad VARCHAR(255) NOT NULL,
        saldo INT NOT NULL DEFAULT 0.0
      );
    `;

    console.log(`Created "cuentas" table`);

    // Insert data into the "cuentas" table
    const insertedCuentas = await Promise.all(
      cuentas.map(
        (cuenta) => client.sql`
        INSERT INTO cuentas (id, user_id, iban, name, entidad, saldo)
        VALUES (${cuenta.id}, ${cuenta.user_id}, ${cuenta.iban}, ${cuenta.name}, ${cuenta.entidad}, ${cuenta.saldo})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedCuentas.length} cuentas`);

    return {
      createTable,
      cuentas: insertedCuentas,
    };
  } catch (error) {
    console.error('Error seeding cuentas:', error);
    throw error;
  }
}

// async function seedRevenue(client) {
//   try {
//     // Create the "revenue" table if it doesn't exist
//     const createTable = await client.sql`
//       CREATE TABLE IF NOT EXISTS revenue (
//         month VARCHAR(4) NOT NULL UNIQUE,
//         revenue INT NOT NULL
//       );
//     `;

//     console.log(`Created "revenue" table`);

//     // Insert data into the "revenue" table
//     const insertedRevenue = await Promise.all(
//       revenue.map(
//         (rev) => client.sql`
//         INSERT INTO revenue (month, revenue)
//         VALUES (${rev.month}, ${rev.revenue})
//         ON CONFLICT (month) DO NOTHING;
//       `,
//       ),
//     );

//     console.log(`Seeded ${insertedRevenue.length} revenue`);

//     return {
//       createTable,
//       revenue: insertedRevenue,
//     };
//   } catch (error) {
//     console.error('Error seeding revenue:', error);
//     throw error;
//   }
// }

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedCuentas(client);
  await seedMovimientos(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
