// Advent of Code - Day 9 - Part One

export function part1(input: string): number {
  let fileBlocks = input.split('').map(Number);
  let disk = [], id = 0;
  for (let i = 0; i < fileBlocks.length; i++) {
      if (i % 2 == 0) {
          for (let j = 0; j < fileBlocks[i]; j++) disk.push(id);
          id++;
      } else for (let j = 0; j < fileBlocks[i]; j++) disk.push(".");
  }
  
  for (let i = disk.length - 1; i >= 0; i--) {
      if (disk[i] == "." || disk.indexOf(".") > i) continue;
      disk[disk.indexOf(".")] = disk[i];
      disk[i] = ".";
  }
  
  let checksum = 0;
  for (let i = 0; i < disk.length; i++)
      if (disk[i] != ".") checksum += i * Number(disk[i]);
  return checksum;
}
