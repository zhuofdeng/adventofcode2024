import { Cube } from "./cube";

export class CubeGame {
    private redCube: Cube;
    private greenCube: Cube;
    private blueCube: Cube;
    private _id: number;
    private isValid: boolean;

    constructor(input: string) {
        const configuration = input.split(':');
        this._id = parseInt(configuration[0].split(' ')[1]);
        const rounds = configuration[1].split(';');
        this.redCube = new Cube('red');
        this.greenCube = new Cube('green');
        this.blueCube = new Cube('blue');
        this.isValid = true;
        rounds.forEach((round) => {
            const cubes = round.split(',');
            cubes.forEach((cube) => {
                const outcome = cube.trimStart().trimEnd().split(' ');
                let value = 0;
                // console.log(`outcome ${outcome}`)
                if (outcome[1] === 'red') {
                    value = parseInt(outcome[0]);
                    if (value > 12) {
                        this.isValid = false;
                    }
                    if (this.redCube.count < value) {
                        this.redCube.count = value;
                    }
                } else if (outcome[1] === 'green') {
                    value = parseInt(outcome[0]);
                    if (value > 13) {
                        this.isValid = false;
                    }
                    if (this.greenCube.count < value) {
                        this.greenCube.count = value;
                    }
                } else if (outcome[1] === 'blue') {
                    value = parseInt(outcome[0]);
                    if (value > 14) {
                        this.isValid = false;
                    }
                    if (this.blueCube.count < value) {
                        this.blueCube.count = value;
                    }
                }
            });
        });
    }

    validGame(): boolean {
       return this.isValid;
    }

    get id(): number {
        return this._id;
    }

    get totalCount(): number {
        return this.redCube.count * this.greenCube.count * this.blueCube.count;
    }
}