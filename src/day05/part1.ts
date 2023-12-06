// Advent of Code - Day 5 - Part One

import { SourceToDestinationMap } from "./source-to-destination-map";

export function part1(input: string): number {
  const almanac = input.split('\n\n');
  // seeds
  const seeds = almanac[0].split(': ')[1].split(' ').map(v => parseInt(v));
  
  const seedToSoilMap = new SourceToDestinationMap(almanac[1]);
  const soilToFertilizerMap = new SourceToDestinationMap(almanac[2]);
  const fertilizerToWaterMap = new SourceToDestinationMap(almanac[3]);
  const waterToLightMap = new SourceToDestinationMap(almanac[4]);
  const lightToTemperatureMap = new SourceToDestinationMap(almanac[5]);
  const temperatureToHumidityMap = new SourceToDestinationMap(almanac[6]);
  const humidityToLocationMap = new SourceToDestinationMap(almanac[7]);

  let result = Infinity;
  seeds.forEach(seed => {
    const sts = seedToSoilMap.findMatch(seed);
    const stf = soilToFertilizerMap.findMatch(sts);
    const ftw = fertilizerToWaterMap.findMatch(stf);
    const wtl = waterToLightMap.findMatch(ftw);
    const ltt = lightToTemperatureMap.findMatch(wtl);
    const tth = temperatureToHumidityMap.findMatch(ltt);
    const htl = humidityToLocationMap.findMatch(tth);

    if (result > htl) {
      result = htl;
    }

  });
  
  return result;
}
