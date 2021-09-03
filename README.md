# Desarrollo

Para utilizar esta aplicación en su local environment, siga los siguientes pasos:

1. Clonar esta repo 

```
git clone https://github.com/juanzenn/digital-wallet
```

2. Instalar

```
cd digital-wallet
yarn 
```

3. Empezar el servidor de desarrollo

```
yarn start
```

# Digital Wallet

Para este challenge necesitamos dos funciones principales: 

- Añadir dinero de la cuenta
- Retirar dinero de la cuenta

## Detalles de la aplicación

- La cuenta es un **estado global**, cuenta el dinero que tiene un usuario.
- Añadir y retirar son **métodos** que se aplican directamente al la cuenta.
- Debemos llevar un registro de todos los **movimientos de la cuenta**. En este caso con las siguiente caraterísticas:
    - ID
    - Fecha del movimiento
    - Tipo de movimiento
    - Cantidad del movimiento

## Stack

- React
- SASS

## Detalles de las funcionalidades

- Se creará una **SPA** con una única view. Dicha view (Index o Inicio) mostrará la cuenta del usuario, las transacciones, el total de la cuenta y permitirá abrir la ventana de operaciones.
    - Dicha **ventana de operaciones** permitiría al usuario **añadir** o **retirar** dinero.
    - Estas operaciones se podrán hacer mediante un cómodo **form** interactivo.
- Se podrá añadir **dinero infinitamente**. No hay ningún límite.
- En caso de que un usuario quiera retirar dinero que **no posee** en su cuenta, la operación generará un error.

### State Management

La aplicación cuenta con dos estados principales: **dinero del cliente** y **las transacciones del mismo.** Ambos estados serán controlados por el componente principal (Wallet.js). Este component contendrá dos children, Transactions.js y Operations.js.

1. Transactions.js será una tabla que contabilice todos los movimientos del cliente. Recibirá como props el estado **transactions.** 
2. Operations.js será el ***modal*** con la interfáz necesaría para llevar a cabo las transacciones del usuario. Recibirá como props los métodos addFundsHandle() y whitdrawFundsHandle(). 
    1. Operations.js tendrá un estado interno, llamado **transactionType,** que controla cuál tipo de transacción se está haciendo. 
    2. A su vez, Operations.js tendrá como children un menú interactivo para cambiar de modo (agregar o retirar) y un form que cambia según qué operación escogió el usuario. 

### User workflow

1. El usuario entra en la aplicación, se mostrarán las transacciones (ninguna por defecto) y su saldo actual ($0 por defecto).
2. El usuario hace click en "Registrar", esto abre **Operations.js.**
3. El usuario escoge qué tipo de transacción quiere efectuar (agregar por defecto). 
4. El usuario llena el form, hace click en "Añadir fondos" o "Retirar fondos", dependiendo de qué operación se está efectuando. 
    1. Al añadir fondos, se comprueba que la cantidad sea un número entero. Si esto es correcto, la transacción se completa. Se guarda un ***record*** de la transacción, se cierra el ***modal*** y se actualiza **Wallet.js**. Cualquier error será reflejado en el ***modal*** de **Operations.js.**
    2. Al retirar fondos, se comprueban dos cosas: que el usuario tenga **dinero mayor que cero** en su cuenta y que la cantidad que desea retirar **sea menor o igual** al de su cuenta. Si ambas cosas son ciertas, se guarda un ***record*** de la transacción, se cierra el modal y se actualiza **Wallet.js**. Cualquier error será reflejado en el ***modal*** de **Operations.js**.
