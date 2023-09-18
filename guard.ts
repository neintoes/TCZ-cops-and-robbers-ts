class Guard extends BaseSprite {
    public startCol: number = 0
    public startRow: number = 0
    readonly speed: number = 30
    private searching: boolean = false
    private following: boolean = false
    private targetSprite: Sprite

    constructor() {
        super(assets.image`guard`, SpriteKind.Enemy)
        this.startPosition()
        this.idleBehaviour()
        this.targetSprite = sprites.allOfKind(SpriteKind.Player)[0]
    }

    private startPosition(): void {
        tiles.placeOnRandomTile(this.sprite, assets.tile`guard spawn`)
    }

    private followUsingPathfinding(): void {
        let pos = this.sprite.tilemapLocation()
        if (pos.col == this.startCol && pos.row == this.startRow) {
            return
        }
        this.startCol = pos.col
        this.startRow = pos.row
        let path = scene.aStar(pos, this.targetSprite.tilemapLocation())
        scene.followPath(this.sprite, path, this.speed)
    }

    public idleBehaviour(): void {
        if(this.sprite.vx != 0) {
            let yVel = (randint(0,1) * this.speed * 2) - this.speed
            this.sprite.setVelocity(0, yVel)
        } else {
            let xVel = (randint(0, 1) * this.speed * 2) - this.speed
            this.sprite.setVelocity(xVel, 0)
        }
    }

    public behaviour(): void {
        if(spriteutils.distanceBetween(this.sprite, this.targetSprite) > 100) {
            return
        }
        if(tilesAdvanced.checkLineOfSight(this.sprite, this.targetSprite)) {
            this.following = true
            if (!scene.spriteIsFollowingPath(this.sprite)) {
                this.followUsingPathfinding()
            }
        } else {
            if(this.following) {
                this.following = false
                let targetCol = this.targetSprite.tilemapLocation().col
                let targetRow = this.targetSprite.tilemapLocation().row
                let path = scene.aStar(this.sprite.tilemapLocation(), tiles.getTileLocation(targetCol, targetRow))
                scene.followPath(this.sprite, path)
            }
        }
    }
}