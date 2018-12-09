class Movement {
    static ENTRADA = 0;
    static SALIDA = 1;
    static LOG = true;
    static createFlightArrivalSalidaPaquetes(action) {
        if (Movement.LOG) {
            console.log("Salida de paquetes al llegar un avion", action);
        }
        return { instant: action.fechaLlegada, type: Movement.SALIDA, qty: action.cantidadSalida, where: action.oficinaLlegada };
    }

    static createFlightArrivalEntradaPaquetes(action) {
        if (Movement.LOG) {
            console.log("Entrada de paqutes al llegar un avion", action);
        }
        return { instant: action.fechaLlegada, type: Movement.ENTRADA, qty: action.cantidad, where: action.oficinaLlegada };
    }

    static createFlightDeparture(action) {
        if (Movement.LOG) {
            console.log("Se va un vuelo", action);
        }
        return { instant: action.fechaSalida, type: Movement.SALIDA, qty: action.cantidad, where: action.oficinaSalida };
    }

    static createPackage(action) {
        if (Movement.LOG) {
            console.log("Entra un paquete", action);
        }
        return { instant: action.fechaSalida, type: Movement.ENTRADA, qty: 1, where: action.oficinaLlegada };
    }

}

export {
    Movement
}