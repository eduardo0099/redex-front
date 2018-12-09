import { Time, buildTime, msToTime } from './time';

const RATIO = 300;
const WINDOW_SIZE = buildTime(5, Time.HOURS);
const REFRESH_RATE = buildTime(10, Time.MINUTES);

const config = {
    ratio: RATIO,
    windowSize: WINDOW_SIZE,
    refreshRate: REFRESH_RATE,
    simulationTimeToRealTime: (simulation) => simulation / RATIO,
    realTimeToSimulationTime: (real) => real * RATIO
}

console.warn(`calling window service each ${msToTime(config.simulationTimeToRealTime(WINDOW_SIZE))}`)
console.warn(`refreshing simulation each  ${msToTime(config.simulationTimeToRealTime(REFRESH_RATE))}`)

export default config;