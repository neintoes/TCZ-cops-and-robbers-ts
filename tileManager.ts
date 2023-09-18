class TilemapManager {
    public tileMap: tiles.TileMapData
    private playerSprite: PlayerSprite
    private note: CodeNote
    private chestOpened: boolean = false

    constructor(tileMap: tiles.TileMapData, playerSprite: PlayerSprite) {
        this.tileMap = tileMap
        this.playerSprite = playerSprite
        this.setupLevel()
        this.registerEvents()
    }

    public setupLevel(): void {
        tiles.setCurrentTilemap(this.tileMap)
        this.placePlayer()
        // GH1
        this.placeNote()
        // end GH1
        this.spawnGuards()
    }

    private placePlayer(): void {
        tiles.placeOnRandomTile(this.playerSprite.sprite, assets.tile`open door`)
    }

    // GH1
    private placeNote(): void {
        this.note = new CodeNote()
        tiles.placeOnRandomTile(this.note.sprite, assets.tile`floor`)
    }
    // end GH1

    private spawnGuards(): void {
        tiles.getTilesByType(assets.tile`guard spawn`).forEach(function (spawn: tiles.Location): void {
            let guard = new Guard()
            tiles.setTileAt(guard.sprite.tilemapLocation(), assets.tile`floor`)
        })
    }

    // GH1
    private createEscape(): void {
        tilesAdvanced.swapAllTiles(assets.tile`open door`, assets.tile`closed door`)
        let closedDoors = tiles.getTilesByType(assets.tile`closed door`)
        let exit = closedDoors[randint(0, closedDoors.length - 1)]
        tiles.setTileAt(exit, assets.tile`open door`)
    }
    // end GH1

    private registerEvents(): void {
        // DELETE GH1
        // scene.onOverlapTile(SpriteKind.Player, assets.tile`chest`, function (playerSprite: Sprite, chest: tiles.Location): void {
        //     info.changeScoreBy(1000)
        //     sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
        //     music.baDing.play()
        //     this.setupLevel()
        // })
        // DELETE end GH1
        scene.onHitWall(SpriteKind.Enemy, function(guard: Sprite): void {
            guard.data.idleBehaviour()
        })
        scene.onPathCompletion(SpriteKind.Enemy, function (guard: Sprite): void {
            guard.data.idleBehaviour()
        })

        // GH1    
        scene.onOverlapTile(SpriteKind.Player, assets.tile`open door`, function(playerSprite: Sprite, location: tiles.Location): void {
            if (this.chestOpened) {
                info.changeScoreBy(1000)
                music.baDing.play()
                sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
                this.setupLevel()
            }
        })

        scene.onOverlapTile(SpriteKind.Player, assets.tile`chest`, function(playerSprite: Sprite, location: tiles.Location): void{
            if(!this.chestOpened) {
                let answer = game.askForNumber("What is the code?", 4)
                if(answer.toString() != this.note.code) {
                    return
                }
                tiles.setTileAt(location, assets.tile`chest open`)
                this.chestOpened = true
                info.changeScoreBy(1000)
                music.baDing.play()
                this.createEscape()
            }
        })
        // end GH1
    }
}