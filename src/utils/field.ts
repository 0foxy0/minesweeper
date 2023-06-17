export class Field {
  x: number;
  y: number;
  revealed: boolean;
  mine: boolean;
  text: "x" | "" | number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.revealed = false;
    this.mine = false;
    this.text = "";
  }

  setMine() {
    this.mine = true;
    this.text = "x";
  }

  countNeighborMines(grid: Field[][]) {
    if (this.mine) return;
    let total = 0;

    for (let yOffset = -1; yOffset < 2; yOffset++) {
      for (let xOffset = -1; xOffset < 2; xOffset++) {
        const i = this.y + yOffset;
        const j = this.x + xOffset;

        if (i < 0 || i > grid.length - 1) continue;
        if (j < 0 || j > grid[i].length - 1) continue;

        if (grid[i][j].mine) total++;
      }
    }

    this.text = total || "";
  }

  reveal(
    rerender: React.Dispatch<React.SetStateAction<boolean>>,
    grid: Field[][]
  ) {
    this.revealed = true;

    if (this.text !== "") return rerender((v) => !v);

    for (let yOffset = -1; yOffset < 2; yOffset++) {
      for (let xOffset = -1; xOffset < 2; xOffset++) {
        const i = this.y + yOffset;
        const j = this.x + xOffset;

        if (i < 0 || i > grid.length - 1) continue;
        if (j < 0 || j > grid[i].length - 1) continue;

        if (grid[i][j].text === "" && grid[i][j].revealed === false)
          grid[i][j].reveal(rerender, grid);
      }
    }

    rerender((v) => !v);
  }
}
