/**
 * Spawn aliens
 */
function initAlien (num: number) {
    for (let index = 0; index < num; index++) {
        sprites.createProjectileFromSide(img`
            . . . . . c c c c c c c . . . . 
            . . . . c 6 7 7 7 7 7 6 c . . . 
            . . . c 7 c 6 6 6 6 c 7 6 c . . 
            . . c 6 7 6 f 6 6 f 6 7 7 c . . 
            . . c 7 7 7 7 7 7 7 7 7 7 c . . 
            . . f 7 8 1 f f 1 6 7 7 7 f . . 
            . . f 6 f 1 f f 1 f 7 7 7 f . . 
            . . . f f 2 2 2 2 f 7 7 6 f . . 
            . . c c f 2 2 2 2 7 7 6 f c . . 
            . c 7 7 7 7 7 7 7 7 c c 7 7 c . 
            c 7 1 1 1 7 7 7 7 f c 6 7 7 7 c 
            f 1 1 1 1 1 7 6 f c c 6 6 6 c c 
            f 1 1 1 1 1 1 6 6 c 6 6 6 c . . 
            f 6 1 1 1 1 1 6 6 6 6 6 6 c . . 
            . f 6 1 1 1 1 1 6 6 6 6 c . . . 
            . . f f c c c c c c c c . . . . 
            `, randint(-10, -20), 0).setPosition(160, randint(10, 110))
    }
    return 67
}
/**
 * Timers extension for players shooting
 */
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    timer.throttle("action", 500, function () {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . 4 5 5 4 . . . . . . 
            . . . . . . 2 5 5 2 . . . . . . 
            . . . . . . . 2 2 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, playerSprite, 50, 0)
        projectile.setKind(SpriteKind.Enemy)
    })
})
controller.player2.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    timer.throttle("action2", 500, function () {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . 4 5 5 4 . . . . . . 
            . . . . . . 2 5 5 2 . . . . . . 
            . . . . . . . 2 2 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, player2, 50, 0)
        projectile.setKind(SpriteKind.Enemy)
    })
})
/**
 * When playerdies with long text using func from extension playermade
 */
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.ashes, 500)
    sprites.destroyAllSpritesOfKind(SpriteKind.Player, effects.fire, 500)
    scene.cameraShake(8, 2000)
    pause(2000)
    game.showLongText(basic.divide(list), DialogLayout.Bottom)
    game.gameOver(true)
})
/**
 * When alien hit
 */
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    sprites.destroy(otherSprite)
    info.changeScoreBy(1)
    list.push(1)
})
/**
 * Setup
 */
let projectile: Sprite = null
let player2: Sprite = null
let playerSprite: Sprite = null
let list: number[] = []
list = []
scene.setBackgroundImage(assets.image`Background`)
info.setScore(0)
tiles.setCurrentTilemap(tilemap`level1`)
playerSprite = sprites.create(assets.image`Planeimg`, SpriteKind.Player)
controller.moveSprite(playerSprite, 0, 100)
playerSprite.setPosition(25, 60)
playerSprite.setStayInScreen(true)
player2 = sprites.create(assets.image`Planeimg`, SpriteKind.Player)
controller.player2.moveSprite(player2, 0, 100)
player2.setPosition(25, 80)
playerSprite.setStayInScreen(true)
/**
 * function with random input number
 */
game.onUpdateInterval(2000, function () {
    initAlien(randint(1, 3))
})
