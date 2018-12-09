class Movement {
  static ENTRADA = 0;
  static SALIDA = 0;

  static createFlightArrival(action){
      return { instant: action.fechaLlegada, type: Movement.SALIDA, qty: action.cantidadSalida, where: action.oficinaLlegada };
  }

  static createFlightDeparture(action){
      return { instant: action.fechaSalida, type: Movement.ENTRADA, qty: action.cantidad, where: action.oficinaSalida };
  }

  static createPackage(action){
      return { instant: action.fechaSalida, type: Movement.ENTRADA, qty: 1, where: action.oficinaSalida };
  }
}

export {
  Movement
}