import Player from "./Player.js";

export default class PlayerHandler {
    constructor(scene) {
        scene.players = new Map();
    }

    init(scene, userList) {
        userList.forEach((user) => this.join(scene, user));
    }

    join(scene, user) {
        if (!scene.players.has(user.id)) {
            const newPlayer = new Player(scene, user);
            scene.players.set(user.id, newPlayer);
        }
    }

    disconnect(scene, id) {
        const player = scene.players.get(id);
        if (player) {
            player.destroy();
            scene.players.delete(id);
        }
    }

    move(scene, player) {
        const { id, x, y, speed } = player;
        const targets = scene.players.get(id);
        const distance = Phaser.Math.Distance.Between(targets.x, targets.y, x, y);
        const duration = (distance / speed) * 1000;

        scene.tweens.add({
            targets,
            x,
            y,
            duration,
            ease: 'Linear'
        });
    }
}