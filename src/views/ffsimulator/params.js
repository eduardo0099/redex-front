const simulationRealRatio = 300; // en 1 segundo de la vida real pasan 300 segundos en la simulacion

const realTimeToSimulationTime = (realTime) => {
    return realTime * simulationRealRatio;
}

const simulationTimeToRealTime = (simulationTime) => {
    return simulationTime / simulationRealRatio;
}

const windowInSimulationSeconds = 3600 * 5;

const windowInRealSeconds = simulationTimeToRealTime(windowInSimulationSeconds);

export default { windowInRealSeconds, windowInSimulationSeconds, simulationTimeToRealTime, realTimeToSimulationTime };