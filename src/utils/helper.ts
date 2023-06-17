import { Field } from "./field";

export function createGrid(
  cols: number,
  rows: number,
  totalMines: number
): Field[][] {
  const grid: Field[][] = new Array(cols);

  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Field(j, i);
    }
  }

  const possibleFields = JSON.parse(JSON.stringify(grid));

  for (let i = 0; i <= totalMines; i++) {
    const rndY = Math.floor(Math.random() * cols);
    const rndX = Math.floor(Math.random() * rows);

    if (!possibleFields[rndY][rndX]) {
      i--;
      continue;
    }
    grid[rndY][rndX].setMine();
    possibleFields[rndY].splice(rndX - 1, 1);
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].countNeighborMines(grid);
    }
  }

  return grid;
}
