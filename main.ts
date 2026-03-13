scene.setBackgroundImage(assets.image`Background`)
let playerSprite = sprites.create(assets.image`Planeimg`, SpriteKind.Player)
controller.moveSprite(playerSprite, 0, 100)
playerSprite.setPosition(25, 60)
