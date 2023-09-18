class PlayerSprite extends BaseSprite {
    readonly horizontalSpeed: number = 100
    readonly verticalSpeed: number = 100
    
    constructor() {
        super(assets.image`robber`, SpriteKind.Player)
        this.initialiseControls()
    }

    private initialiseControls() {
        controller.moveSprite(this.sprite, this.horizontalSpeed, this.verticalSpeed)
    }
}