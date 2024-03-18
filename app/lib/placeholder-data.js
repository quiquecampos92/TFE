// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },{
    id: '410544b2-4001-4271-9855-fec4b6a6442b',
    name: 'User2',
    email: 'user2@nextmail.com',
    password: '123aaa',
  },
];

const cuentas = [
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    user_id: users[0].id,
    iban: 'ES9820385778983000760300',
    name: 'Cuenta1 de usuario 0',
    entidad: 'Santander',
    saldo: 0,
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442b',
    user_id: users[0].id,
    iban: 'ES9820385778983000760301',
    name: 'Cuenta2 de usuario 0',
    entidad: 'Santander',
    saldo: 0,
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442c',
    user_id: users[0].id,
    iban: 'ES9820385778983000760302',
    name: 'Cuenta3 de usuario 0',
    entidad: 'Santander',
    saldo: 0,
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442d',
    user_id: users[1].id,
    iban: 'ES9820385778983000760303',
    name: 'Cuenta1 de usuario 1',
    entidad: 'Santander',
    saldo: 0,
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442e',
    user_id: users[1].id,
    iban: 'ES9820385778983000760304',
    name: 'Cuenta2 de usuario 1',
    entidad: 'Santander',
    saldo: 0,
  },
];

const movimientos = [
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442f',
    cuenta_id: cuentas[0].id,
    cantidad: 2323,
    concepto: 'pending',
    date: '2022-12-06',
    type: 'gasolina',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a64423',
    cuenta_id: cuentas[0].id,
    cantidad: 154,
    concepto: 'pending',
    date: '2020-10-23',
    type: 'otros',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a64424',
    cuenta_id: cuentas[1].id,
    cantidad: 43423,
    concepto: 'pending',
    date: '2022-05-19',
    type: 'comida',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a64425',
    cuenta_id: cuentas[1].id,
    cantidad: 45345,
    concepto: 'pending',
    date: '2023-12-06',
    type: 'inversiones',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a64426',
    cuenta_id: cuentas[2].id,
    cantidad: 343,
    concepto: 'concepto cuenta 2',
    date: '2027-12-06',
    type: 'seguros',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a64427',
    cuenta_id: cuentas[2].id,
    cantidad: 343,
    concepto: 'concepto cuenta 2',
    date: '2022-05-06',
    type: 'otros',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a64428',
    cuenta_id: cuentas[3].id,
    cantidad: 153434795,
    concepto: 'concepto cuenta 53',
    date: '2022-03-06',
    type: 'ocio',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a64429',
    cuenta_id: cuentas[3].id,
    cantidad: 3,
    concepto: 'concepto cuenta 3',
    date: '2022-01-06',
    type: 'ocio',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a64421',
    cuenta_id: cuentas[4].id,
    cantidad: 4343,
    concepto: 'concepto cuenta 4',
    date: '2022-11-06',
    type: 'comida',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a64433',
    cuenta_id: cuentas[4].id,
    cantidad: 15795,
    concepto: 'concepto cuenta 4',
    date: '2022-09-06',
    type: 'alquiler',
  },
];

// const revenue = [
//   { month: 'Jan', revenue: 2000 },
//   { month: 'Feb', revenue: 1800 },
//   { month: 'Mar', revenue: 2200 },
//   { month: 'Apr', revenue: 2500 },
//   { month: 'May', revenue: 2300 },
//   { month: 'Jun', revenue: 3200 },
//   { month: 'Jul', revenue: 3500 },
//   { month: 'Aug', revenue: 3700 },
//   { month: 'Sep', revenue: 2500 },
//   { month: 'Oct', revenue: 2800 },
//   { month: 'Nov', revenue: 3000 },
//   { month: 'Dec', revenue: 4800 },
// ];

module.exports = {
  users,
  cuentas,
  movimientos,
  // revenue,
};
