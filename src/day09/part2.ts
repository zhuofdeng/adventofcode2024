// Advent of Code - Day 9 - Part Two

export function part2(input: string): number {
  let fileBlocks = input.split('').map(Number);
  let disk: { id: number | string, length: number }[] = [], id = 0;
  for (let i = 0; i < input.length; i++) {
      if (i % 2 == 0) disk.push({ id: id++, length: Number(input[i]) });
      else disk.push({ id: ".", length: Number(input[i]) });
  }

  for (let i = id - 1; i >= 0; i--) {
      let file = disk.findIndex(block => block.id == i),
          free = disk.findIndex(block => block.id == "." && block.length >= disk[file].length);
      if (!disk[free] || file < free) continue;
      if (disk[free].length > disk[file].length) {
          disk = [ ...disk.slice(0, free), { id: disk[file].id, length: disk[file].length }, { id: ".", length: disk[free].length - disk[file].length }, ...disk.slice(free + 1) ];
          disk[file + 1].id = ".";
      } else if (disk[free].length == disk[file].length) {
          disk[free].id = disk[file].id;
          disk[file].id = ".";
      }
  }

  for (let j = 0; j < disk.length - 1; j++)
      if (disk[j].id == "." && disk[j + 1].id == ".")
          disk = [ ...disk.slice(0, j), { id: ".", length: disk[j].length + disk[j + 1].length }, ...disk.slice(j-- + 2) ];

  let block = 0, checksum = 0;
  for (let i = 0; i < disk.length; i++) {
      if (disk[i].id == ".") block += disk[i].length;
      else {
          for (let j = 0; j < disk[i].length; j++) {
              checksum += block * (typeof disk[i].id === 'number' ? Number(disk[i].id) : 0);
              block++;
          }
      }
  }
  return checksum
}
