export function initMap() {
    const bg = { width: 1024, height: 1024 };
    this.cameras.main.setBounds(0, 0, bg.width, bg.height);
    this.physics.world.setBounds(0, 0, bg.width, bg.height);
}