import { playerHandler } from "./player.js";

export function startGame(scene, players) {
    scene.players = {};

    // add players
    Object.keys(players).forEach((key) => {
        const { x, y } = players[key];
        const player = scene.add.sprite(x, y, "player");
        scene.players[key] = player;
        console.log(scene.players)
    })

    playerHandler(scene);

    // scene.input.on("pointerdown", (pointer) => {
    //     const { x, y } = pointer;
    //     scene.socket.emit("movePlayer", { x, y })
    // })

    // const ddd = scene.add.text(100, 100, "dfjiosd").setInteractive();
    // ddd.on("pointerdown", () => {
    //     const graphics = scene.add.graphics();

    //     graphics.fillStyle(0x0000ff, 0.5); // 파란색 반투명
    //     graphics.fillCircle(300, 300, 40);

    //     graphics.lineStyle(2, 0xffffff, 1); // 흰 테두리
    //     graphics.strokeCircle(300, 300, 40);
    // })
}

export function newPlayer(scene, { id, player }) {
    scene.players[id] = scene.add.sprite(player.x, player.y, "player");
}

export function disconnectPlayer(scene, socketId) {
    scene.players[socketId].destroy();
    delete scene.players[socketId];
}
