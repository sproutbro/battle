
export function drawGrid(scene) {

    const graphics = scene.add.graphics();
    graphics.lineStyle(1, 0xffffff, 1);

    const cellSize = 32;
    const cols = 20;
    const rows = 11;
    const startX = 0;
    const startY = 0;

    for (let i = 0; i <= cols; i++) {
        const x = startX + i * cellSize;
        graphics.moveTo(x, startY);
        graphics.lineTo(x, startY + rows * cellSize);
    }

    for (let j = 0; j <= rows; j++) {
        const y = startY + j * cellSize;
        graphics.moveTo(startX, y);
        graphics.lineTo(startX + cols * cellSize, y);
    }

    graphics.strokePath();
}