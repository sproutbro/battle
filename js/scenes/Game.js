import PlayerHandler from "../class/PlayerHandler.js";
import { initMap, initInput } from "../utils/index.js";

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
        initMap.call(this);
        initInput.call(this);

        this.playerHandler = new PlayerHandler(this);

        this.socket = io("http://localhost:3002/battle", { withCredentials: true });

        this.socket.on("current-users", (userList) => this.playerHandler.init(this, userList));
        this.socket.on('user-joined', (user) => this.playerHandler.join(this, user));
        this.socket.on('user-disconnect', (id) => this.playerHandler.disconnect(this, id));

        this.socket.on('player-move', (player) => this.playerHandler.move(this, player));
    }

    update() {

    }
}