export default class Player extends Phaser.GameObjects.Container {
    constructor(scene, x, y, texture, maxHp, hp, maxMove, move) {
        super(scene, x, y)
        scene.add.existing(this);

        this.scene = scene;
        this.setSize(32, 32);

        this.sprite = scene.add.sprite(0, 0, texture);
        this.add(this.sprite);

        this.hpBar = scene.add.graphics();
        this.add(this.hpBar);
        this.maxHp = maxHp;
        this.hp = hp;
        this.hpPercent = this.hp / this.maxHp;
        this.drawHpBar();

        this.moveBar = scene.add.graphics();
        this.add(this.moveBar);
        this.maxMove = maxMove
        this.move = move;
    }

    drawHpBar() {
        this.hpBar.clear();
        const width = 40;
        const height = 6;
        const offsetY = -20;

        // 배경
        this.hpBar.fillStyle(0x444444, 1);
        this.hpBar.fillRect(-width / 2, offsetY, width, height);

        // 체력
        this.hpBar.fillStyle(0x00ff00, 1);
        this.hpBar.fillRect(-width / 2, offsetY, width * this.hpPercent, height);

        // 테두리
        this.hpBar.lineStyle(1, 0xffffff, 1);
        this.hpBar.strokeRect(-width / 2, offsetY, width, height);
    }

    drawMoveBar() {
        this.moveBar.clear();

        this.movePercent = this.move / this.maxMove;
        const width = 40;
        const height = 3;
        const offsetY = -30;

        // 배경
        this.moveBar.fillStyle(0x444444, 1);
        this.moveBar.fillRect(-width / 2, offsetY, width, height);

        // 체력
        this.moveBar.fillStyle(0x00ff00, 1);
        this.moveBar.fillRect(-width / 2, offsetY, width * this.movePercent, height);

        // 테두리
        this.moveBar.lineStyle(1, 0xffffff, 1);
        this.moveBar.strokeRect(-width / 2, offsetY, width, height);
    }

    // setHp(percent) {
    //     this.hpPercent = Phaser.Math.Clamp(percent, 0, 1);
    //     this.drawHpBar();
    // }

    // update() {
    //     this.drawHpBar(); // 매 프레임 위치 갱신
    // }

    // destroy() {
    //     this.sprite.destroy();
    //     this.hpBar.destroy();
    // }
}