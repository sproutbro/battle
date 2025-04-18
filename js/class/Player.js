export default class Player extends Phaser.GameObjects.Container {
    constructor(scene, user) {
        const { x, y, texture, id, maxHp, hp } = user;
        super(scene, x, y)

        this.scene = scene;
        this.sprite = scene.add.sprite(0, 0, texture);

        this.hpBar = scene.add.graphics();
        this.maxHp = maxHp;
        this.hp = hp;
        this.drawHpBar();

        this.add([this.sprite, this.hpBar]);
        scene.add.existing(this);

        // if (id === scene.socket.id) {
        //     this.sprite.setInteractive();
        //     this.sprite.on("pointerdown", () => { console.log(2) })
        // }
    }

    drawHpBar() {
        this.hpBar.clear();

        const hpPercent = this.hp / this.maxHp;
        const width = 40;
        const height = 6;
        const offsetY = -20;

        // 배경
        this.hpBar.fillStyle(0x444444, 1);
        this.hpBar.fillRect(-width / 2, offsetY, width, height);

        // 체력
        this.hpBar.fillStyle(0x00ff00, 1);
        this.hpBar.fillRect(-width / 2, offsetY, width * hpPercent, height);

        // 테두리
        this.hpBar.lineStyle(1, 0xffffff, 1);
        this.hpBar.strokeRect(-width / 2, offsetY, width, height);
    }
}