import Player from "../class/Player.js";

export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: "game" });
    }

    preload() {
        this.load.spritesheet("player", "./assets/images/player.png", {
            frameWidth: 32,
            frameHeight: 32,
        });
    }

    create() {
        this.players = {};

        this.socket = io("http://localhost:3002/battle");
        this.socket.on("newPlayer", (player) => this.newPlayer(this, player));
        this.socket.on("disconnectPlayer", (key) => this.disconnectPlayer(this, key));
        this.socket.on("drawMove", (player) => this.drawMove(this, player));
        this.socket.on("movePlayer", (keyXY) => this.movePlayer(this, keyXY));
        this.socket.on("drawMoveGa", (move) => this.drawMoveGa(this, move));

    }

    newPlayer(scene, { key, player }) {
        const { x, y, texture, maxHp, hp, maxMove, move } = player;
        scene.players[key] = new Player(scene, x, y, texture, maxHp, hp, maxMove, move);
    }

    setPlayer(scene) {
        scene.player = scene.players[scene.socket.id];
        scene.player.setInteractive();
        scene.player.drawMoveBar();
        scene.player.on("pointerdown", () => scene.socket.emit("drawMove"));
    }

    drawMove(scene, player) {
        console.log(player.move / player.maxMove);
        const percent = player.move / player.maxMove;
        if (percent !== 1) return;

        const clickableCircle = scene.add.circle(player.x, player.y, 200, 0x0000ff, 0.5);

        clickableCircle.setInteractive();
        clickableCircle.on("pointerdown", (pointer) => {
            const { x, y } = pointer;
            scene.socket.emit("movePlayer", { x, y });
            clickableCircle.destroy();
        })
    }

    drawMoveGa(scene, move) {
        scene.player.move = move;
        scene.player.drawMoveBar();
    }

    movePlayer(scene, keyXY) {
        const { key, x, y } = keyXY;
        scene.tweens.add({
            targets: scene.players[key],
            x: x,
            y: y,
            duration: 200,
            ease: 'Power2'
        });
    }

    disconnectPlayer(scene, key) {
        scene.players[key].destroy();
        delete scene.players[key];
    }

    update() {
        if (!this.player && this.players[this.socket.id]) {
            this.setPlayer(this);
        }
    }
}