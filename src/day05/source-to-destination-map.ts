import { SourceDestinationRange } from "../types";

export class SourceToDestinationMap {
    private sourceToDestinations: Array<SourceDestinationRange> = [];
    private previousMatches: Map<number, number> = new Map();
    private _destinationMax = 0;
    constructor(input: string) {
        const sections = input.split('\n');
        for(let i = 1; i < sections.length; i++) {
            const ranges = sections[i].split(' ');
            this.sourceToDestinations.push({destinationStart: parseInt(ranges[0]), sourceStart: parseInt(ranges[1]), range: parseInt(ranges[2])});
            this._destinationMax = Math.max(this._destinationMax, parseInt(ranges[0]) + parseInt(ranges[2]));
        }
    }

    get destinationMax() {
        return this._destinationMax;
    }

    findMatch(source: number): number {
        let match = source;

        //console.log(`source: ${source} previousMatches: ${JSON.stringify(this.previousMatches)}`);
        // const value = this.previousMatches.get(source);

        // if (value) {
        //     console.log(`found match ${source}:${value}`)
        //     return value;
        // }
        for(let i = 0; i < this.sourceToDestinations.length; i++) {
            if (source >= this.sourceToDestinations[i].sourceStart && source <= this.sourceToDestinations[i].sourceStart + this.sourceToDestinations[i].range) {
                match = this.sourceToDestinations[i].destinationStart + (source - this.sourceToDestinations[i].sourceStart);
                break;
            }
        }

        // console.log(`findMatch: ${match}`);
        // can't find a match, so we just return the source.
        this.previousMatches.set(source, match);
        return match;
    }

    findMatch2(destination: number): number {
        let match = destination;
        for(let i = 0; i < this.sourceToDestinations.length; i++) {
            if (this.sourceToDestinations[i].destinationStart <= destination && this.sourceToDestinations[i].destinationStart + this.sourceToDestinations[i].range > destination) {
                match = this.sourceToDestinations[i].sourceStart + destination - this.sourceToDestinations[i].destinationStart;
                break;
            }
        }

        return match;
    }
}