class OverlapManager {

    constructor() {
        this.initialiseOverlaps();
    }

    private initialiseOverlaps(): void {
        sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (playerSprite: Sprite, guard: Sprite): void {
            game.over(false)
        })

        // GH1
        sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function(playerSprite: Sprite, note: Sprite): void {
            playerSprite.say(note.data.code, 100)
        })
        // end GH1
    }
}