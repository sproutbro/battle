import Game from "./scenes/Game.js";

const config = {
    width: 640,
    height: 360,
    backgroundColor: '#4488aa',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    autoRound: false,
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
        },
    },
    scene: [Game],
};

const game = new Phaser.Game(config);
