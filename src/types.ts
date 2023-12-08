export type Position = {
    x: number,
    y: number,
}

export type SourceDestinationRange = {
    sourceStart: number,
    destinationStart: number,
    range: number,
}

export type NumberRange = {
    start: number,
    range: number,
}

export type LRNode = {
    node: string,
    left: string;
    right: string;
}