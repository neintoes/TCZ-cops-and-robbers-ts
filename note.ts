// GH1
class CodeNote extends BaseSprite {
    private code: string = ""

    constructor() {
        super(assets.image`note`, SpriteKind.Food)
        this.generateCode()
    }

    private generateCode(): void {
        this.code = randint(0, 9999).toString()
        while(this.code.length < 4) {
            this.code = "0" + this.code
        }
    }
}
// end GH1