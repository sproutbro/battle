export function playerHandler(scene) {
    const player = scene.players[scene.socket.id];

    player.setInteractive();
    player.on("pointerdown", () => {
        scene.socket.emit("checkMove");
    })
}

export function drawMove(scene, player) {
    if (!player.move) return;

    const clickableCircle = scene.add.circle(player.x, player.y, 50, 0x0000ff, 0.5);

    clickableCircle.setInteractive();
    clickableCircle.on("pointerdown", (pointer) => {
        const { x, y } = pointer;
        scene.socket.emit("movePlayer", { x, y });
        clickableCircle.destroy();
    })
}

export function movePlayer(scene, player) {
    const { id, x, y } = player;
    scene.tweens.add({
        targets: scene.players[id],
        x: x,
        y: y,
        duration: 200,
        ease: 'Power2'
    });
}