// Advent of Code - Day 5 - Part Two

import { NumberRange } from "../types";
import { SourceToDestinationMap } from "./source-to-destination-map";

export function part2(input: string): number {
  
  const almanac = input.split('\n\n');
  // seeds
  const seeds = almanac[0].split(': ')[1].split(' ').map(v => parseInt(v));
  const plantedSeeds: Array<NumberRange> = [];
  const seedToSoilMap = new SourceToDestinationMap(almanac[1]);
  const soilToFertilizerMap = new SourceToDestinationMap(almanac[2]);
  const fertilizerToWaterMap = new SourceToDestinationMap(almanac[3]);
  const waterToLightMap = new SourceToDestinationMap(almanac[4]);
  const lightToTemperatureMap = new SourceToDestinationMap(almanac[5]);
  const temperatureToHumidityMap = new SourceToDestinationMap(almanac[6]);
  const humidityToLocationMap = new SourceToDestinationMap(almanac[7]);

  for(let s = 0; s < seeds.length; s+=2) {
    const start = seeds[s];
    const range = seeds[s+1];
    plantedSeeds.push({start, range});
  }

  for(let location = 0; location < humidityToLocationMap.destinationMax; location++) {
    const htl = humidityToLocationMap.findMatch2(location);
    const tth = temperatureToHumidityMap.findMatch2(htl);
    const ltt = lightToTemperatureMap.findMatch2(tth);
    const wtl = waterToLightMap.findMatch2(ltt);
    const ftw = fertilizerToWaterMap.findMatch2(wtl);
    const stf = soilToFertilizerMap.findMatch2(ftw);
    const sts = seedToSoilMap.findMatch2(stf);
    
    // console.log(`location ${location}, seed ${sts}`)
    const hasSeed = plantedSeeds.find((seed) => {
      // console.log(`start: ${seed.start} range: ${seed.range} seed: ${sts}`)
      return seed.start <= sts && seed.start + seed.range >= sts
    });
    if ( hasSeed ) {
      return location;
    }
  }

  return 0;
}
