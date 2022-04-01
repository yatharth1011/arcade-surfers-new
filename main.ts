namespace SpriteKind {
    export const Coin = SpriteKind.create()
    export const Obstacle = SpriteKind.create()
    export const TMCP = SpriteKind.create()
}
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    mvx = sprite.vx
    mvy = sprite.vy
    if (mySprite.x == 135) {
        sprite.setPosition(135, sprite.y)
    } else if (mySprite.x == 88) {
        sprite.setPosition(88, mySprite.y)
    } else if (mySprite.x == 40) {
        sprite.setPosition(40, mySprite.y)
    } else {
    	
    }
    for (let value of sprites.allOfKind(SpriteKind.Coin)) {
        tiles.placeOnTile(value, tiles.getTileLocation(value.tilemapLocation().column, value.tilemapLocation().row + 14))
    }
    for (let value2 of sprites.allOfKind(SpriteKind.Obstacle)) {
        tiles.placeOnTile(value2, tiles.getTileLocation(value2.tilemapLocation().column, value2.tilemapLocation().row + 14))
    }
    tiles.placeOnTile(sprite, tiles.getTileLocation(mySprite.tilemapLocation().column, 19))
    placed = 1
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Coin, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeScoreBy(10)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Obstacle, function (sprite, otherSprite) {
    sprite.destroy()
    if (info.score() > info.highScore()) {
        music.playMelody("C E G A C5 - - - ", 480)
        game.setGameOverSound(false, music.thump)
game.over(false, effects.confetti)
    } else {
        game.over(false, effects.dissolve)
    }
})
sprites.onOverlap(SpriteKind.Coin, SpriteKind.Obstacle, function (sprite, otherSprite) {
    sprite.destroy()
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    mvx = mySprite.vx
    mvy = mySprite.vy
    if (mySprite.x == 88) {
        mySprite.setPosition(40, mySprite.y)
        placed = 1
        scene.centerCameraAt(88, mySprite.y - 30)
    }
    if (mySprite.x > 88) {
        mySprite.setPosition(88, mySprite.y)
        placed = 1
        scene.centerCameraAt(88, mySprite.y - 30)
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    mvx = mySprite.vx
    mvy = mySprite.vy
    if (mySprite.x == 88) {
        mySprite.setPosition(135, mySprite.y)
        placed = 1
        scene.centerCameraAt(88, mySprite.y - 30)
    }
    if (mySprite.x < 88) {
        mySprite.setPosition(88, mySprite.y)
        placed = 1
        scene.centerCameraAt(88, mySprite.y - 30)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.TMCP, function (sprite, otherSprite) {
    tml = [
    tilemap`Forest`,
    tilemap`Aqua`,
    tilemap`Dungeon`,
    tilemap`Road`
    ]
    tiles.setCurrentTilemap(tml._pickRandom())
})
scene.onOverlapTile(SpriteKind.Obstacle, sprites.castle.tilePath5, function (sprite, location) {
    if (location == tiles.getTileLocation(8, 4) || (location == tiles.getTileLocation(2, 23) || location == tiles.getTileLocation(5, 23) || location == tiles.getTileLocation(8, 23) || location == tiles.getTileLocation(2, 4) || location == tiles.getTileLocation(5, 4))) {
        sprite.destroy()
    }
})
sprites.onOverlap(SpriteKind.TMCP, SpriteKind.Obstacle, function (sprite, otherSprite) {
    sprite.destroy()
})
scene.onOverlapTile(SpriteKind.Coin, sprites.castle.tilePath5, function (sprite, location) {
    if (location == tiles.getTileLocation(8, 4) || (location == tiles.getTileLocation(2, 23) || location == tiles.getTileLocation(5, 23) || location == tiles.getTileLocation(8, 23) || location == tiles.getTileLocation(2, 4) || location == tiles.getTileLocation(5, 4))) {
        sprite.destroy()
    }
})
sprites.onOverlap(SpriteKind.Coin, SpriteKind.TMCP, function (sprite, otherSprite) {
    sprite.destroy()
})
let tmcp: Sprite = null
let coin: Sprite = null
let myObstacle: Sprite = null
let tml: tiles.TileMapData[] = []
let mvy = 0
let mvx = 0
let placed = 0
let mySprite: Sprite = null
tiles.setCurrentTilemap(tilemap`Forest`)
mySprite = sprites.create(assets.image`Sprite`, SpriteKind.Player)
tiles.placeOnTile(mySprite, tiles.getTileLocation(5, 23))
tiles.centerCameraOnTile(tiles.getTileLocation(5, 23))
mySprite.setVelocity(0, -50)
tiles.setWallAt(tiles.getTileLocation(2, 4), true)
tiles.setWallAt(tiles.getTileLocation(5, 4), true)
tiles.setWallAt(tiles.getTileLocation(8, 4), true)
let colList = [2, 5, 8]
placed = 0
let xlist = [40, 88, 135]
for (let index = 0; index <= 9; index++) {
    let list: number[] = []
    list.push(index)
}
mySprite.ay = -1
animation.runImageAnimation(
mySprite,
[img`
    . . . . . . f f f f . . . . . . 
    . . . . f f e e e e f f . . . . 
    . . . f e e e f f e e e f . . . 
    . . f f f f f 2 2 f f f f f . . 
    . . f f e 2 e 2 2 e 2 e f f . . 
    . . f e 2 f 2 f f 2 f 2 e f . . 
    . . f f f 2 2 e e 2 2 f f f . . 
    . f f e f 2 f e e f 2 f e f f . 
    . f e e f f e e e e f e e e f . 
    . . f e e e e e e e e e e f . . 
    . . . f e e e e e e e e f . . . 
    . . e 4 f f f f f f f f 4 e . . 
    . . 4 d f 2 2 2 2 2 2 f d 4 . . 
    . . 4 4 f 4 4 4 4 4 4 f 4 4 . . 
    . . . . . f f f f f f . . . . . 
    . . . . . f f . . f f . . . . . 
    `,img`
    . . . . . . . . . . . . . . . . 
    . . . . . . f f f f . . . . . . 
    . . . . f f e e e e f f . . . . 
    . . . f e e e f f e e e f . . . 
    . . . f f f f 2 2 f f f f . . . 
    . . f f e 2 e 2 2 e 2 e f f . . 
    . . f e 2 f 2 f f f 2 f e f . . 
    . . f f f 2 f e e 2 2 f f f . . 
    . . f e 2 f f e e 2 f e e f . . 
    . f f e f f e e e f e e e f f . 
    . f f e e e e e e e e e e f f . 
    . . . f e e e e e e e e f . . . 
    . . . e f f f f f f f f 4 e . . 
    . . . 4 f 2 2 2 2 2 e d d 4 . . 
    . . . e f f f f f f e e 4 . . . 
    . . . . f f f . . . . . . . . . 
    `,img`
    . . . . . . f f f f . . . . . . 
    . . . . f f e e e e f f . . . . 
    . . . f e e e f f e e e f . . . 
    . . f f f f f 2 2 f f f f f . . 
    . . f f e 2 e 2 2 e 2 e f f . . 
    . . f e 2 f 2 f f 2 f 2 e f . . 
    . . f f f 2 2 e e 2 2 f f f . . 
    . f f e f 2 f e e f 2 f e f f . 
    . f e e f f e e e e f e e e f . 
    . . f e e e e e e e e e e f . . 
    . . . f e e e e e e e e f . . . 
    . . e 4 f f f f f f f f 4 e . . 
    . . 4 d f 2 2 2 2 2 2 f d 4 . . 
    . . 4 4 f 4 4 4 4 4 4 f 4 4 . . 
    . . . . . f f f f f f . . . . . 
    . . . . . f f . . f f . . . . . 
    `,img`
    . . . . . . . . . . . . . . . . 
    . . . . . . f f f f . . . . . . 
    . . . . f f e e e e f f . . . . 
    . . . f e e e f f e e e f . . . 
    . . . f f f f 2 2 f f f f . . . 
    . . f f e 2 e 2 2 e 2 e f f . . 
    . . f e f 2 f f f 2 f 2 e f . . 
    . . f f f 2 2 e e f 2 f f f . . 
    . . f e e f 2 e e f f 2 e f . . 
    . f f e e e f e e e f f e f f . 
    . f f e e e e e e e e e e f f . 
    . . . f e e e e e e e e f . . . 
    . . e 4 f f f f f f f f e . . . 
    . . 4 d d e 2 2 2 2 2 f 4 . . . 
    . . . 4 e e f f f f f f e . . . 
    . . . . . . . . . f f f . . . . 
    `],
100,
true
)
game.onUpdate(function () {
    scene.centerCameraAt(88, mySprite.y - 30)
    if (placed == 1) {
        scene.centerCameraAt(88, mySprite.y - 30)
        mySprite.setVelocity(mvx, mvy)
        mySprite.ay = -1
        placed = 0
    }
})
game.onUpdateInterval(5000, function () {
    myObstacle = sprites.create(assets.image`Obstacle4`, SpriteKind.Obstacle)
    myObstacle.x = xlist._pickRandom()
    myObstacle.y = mySprite.y - 120
    myObstacle.setVelocity(0, 0)
    myObstacle.setFlag(SpriteFlag.AutoDestroy, true)
})
game.onUpdateInterval(750, function () {
    coin = sprites.create(assets.image`Coin`, SpriteKind.Coin)
    coin.x = xlist._pickRandom()
    coin.y = mySprite.y - 90
    coin.setVelocity(0, 0)
    coin.setFlag(SpriteFlag.AutoDestroy, true)
})
game.onUpdateInterval(10000, function () {
    tmcp = sprites.create(assets.image`tmcp`, SpriteKind.TMCP)
    tmcp.x = xlist._pickRandom()
    tmcp.y = mySprite.y - 100
    tmcp.setVelocity(0, 0)
    tmcp.setFlag(SpriteFlag.AutoDestroy, true)
})
