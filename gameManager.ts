class GameManager {
    public playerSprite: PlayerSprite
    private tilemapManager: TilemapManager
    private tileMapLevels: tiles.TileMapData[]

    constructor(tilemapsToLoad: tiles.TileMapData[]) {
        this.tileMapLevels = tilemapsToLoad
        this.initialisePlayer()
        this.loadLevel(0)
        this.onUpdates();
        new OverlapManager()
    }

    private initialisePlayer(): void {
        info.setScore(0)
        this.playerSprite = new PlayerSprite();
        scene.cameraFollowSprite(this.playerSprite.sprite);
    }

    private loadLevel(level: number): void {
        this.tilemapManager = new TilemapManager(this.tileMapLevels[level], this.playerSprite);
    }

    private onUpdates(): void {
        game.onUpdate(function(): void {
            sprites.allOfKind(SpriteKind.Enemy).forEach(function(guard: Sprite): void {
                guard.data.behaviour()
            })
        })
    }
}