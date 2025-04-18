export function initInput() {
    this.input.on("pointerdown", (pointer) => {
        const { x, y } = pointer;
        this.socket.emit("player-move", { x, y });
    })

}