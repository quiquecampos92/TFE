// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Cuentas = {
  id: string;
  user_id: string;
  iban: string;
  name: string;
  entidad: string;
  saldo: number;
};

export type Movimiento = {
  id: string;
  cuenta_id: string;
  cantidad: string;
  concepto: string;
  date: string;
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestMovimiento = {
  id: string;
  cuenta_id: string;
  cantidad: string;
  concepto: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestMovimientoRaw = Omit<LatestMovimiento, 'cantidad'> & {
  cantidad: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CuentasTableType = {
  id: string;
  user_id: string;
  iban: string;
  name: string;
  entidad: string;
  saldo: number;
};

export type FormattedCuentasTable = {
  id: string;
  user_id: string;
  iban: string;
  name: string;
  entidad: string;
  saldo: number;
};
export type FormattedMovimientosTable = {
  id: string;
  cuenta_id: string;
  cantidad: number;
  concepto: string;
  date: string;
};

export type CuentasField = {
  id: string;
  name: string;
  user_Id: string;
};

export type UsersField = {
  id: string;
  name: string;
};

export type MovimientoForm = {
  id: string;
  cuenta_id: string;
  cantidad: string;
  concepto: string;
};

export type CuentaForm = {
  id: string;
  user_id: string;
  iban: string;
  name: string;
  entidad: string;
  saldo: number;
};
