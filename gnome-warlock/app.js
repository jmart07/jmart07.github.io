$(() => {
    //// CLASSES ////
    class Character {
        constructor(name, id, health, damage, current) {
            this.name = name;
            this.div = $('<div>').attr('id', id);
            this.health = health;
            this.damage = damage;
            this.hasMove = true;
            this.hasAttack = true;
            this.position = {
                current: current,
                previous: [0,0],
                north: [0,0],
                east: [0,0],
                south: [0,0],
                west: [0,0]
            }
        }
        getCurrentPosition () {
            // console.log(`${this.name}'s position: ${this.position.current.join('-')}`);
            return `${this.position.current.join('-')}`;
        }
        updatePosition () {
            console.log(`Updating position of ${this.name}`);
            const pos = this.position.current;
            this.position.north = [pos[0] - 1, pos[1]];
            this.position.east  = [pos[0], pos[1] + 1];
            this.position.south = [pos[0] + 1, pos[1]];
            this.position.west  = [pos[0], pos[1] - 1];
        }
        getSurroundingTiles () {
            console.log(`${this.name} is getting surrounding tiles`);
            const $north = $(`#${this.position.north.join('-')}`);
            const $east = $(`#${this.position.east.join('-')}`);
            const $south = $(`#${this.position.south.join('-')}`);
            const $west = $(`#${this.position.west.join('-')}`);
            return [$north, $east, $south, $west];
        }
        isDead () {
            console.log(`Checking if ${this.name} is dead`);
            if(this.health <= 0) {
                console.log(`--${this.name} is dead`);
                this.div.remove();
                return true;
            } else {
                console.log(`--${this.name} is not dead`);
                return false;
            }
        }
    }
    class Player extends Character {
        constructor(name, id, health, damage, current) {
            super(name, id, health, damage, current);
        }
        move (event) {
            this.updatePosition();
            if(!this.hasMove){
                console.log(`No moves left`);
                return;
            }
            const clickID = $(event.currentTarget).attr('id');  //location of click in "column-row" string form
            const clickIDArr = [clickID.charAt(0),clickID.charAt(2)]; //location of click in [column,row] array form
            console.log(`Moving ${this.name} to ClickID: ${clickID}`);
            //check if tile is occupied first
            if(isTileOccupied(clickIDArr)) {
                console.log(`--can't move here`);
                return;
            } else {
                //set previous to current
                this.position.previous[0] = this.position.current[0];
                this.position.previous[1] = this.position.current[1];
                //check if location clicked is NESW and update current accordingly, or 
                console.log(gnome.position)
                switch(clickID) {
                    case this.position.north.join('-'):
                        this.position.current[0]--;
                        this.hasMove = false;
                        moves--;
                        break;
                    case this.position.east.join('-'):
                        this.position.current[1]++;
                        this.hasMove = false;
                        moves--;
                        break;
                    case this.position.south.join('-'):
                        this.position.current[0]++;
                        this.hasMove = false;
                        moves--;
                        break;
                    case this.position.west.join('-'):
                        this.position.current[1]--;
                        this.hasMove = false;
                        moves--;
                        break;
                    default:
                        console.log(`--${this.name} can't move to ${clickID}`)
                        return;
                }
                this.updatePosition();
    
                const $newPosition = $(`#${this.getCurrentPosition()}`);
                $newPosition.append(gnome.div);
                $status.text(`Moves: ${moves}, Attacks: ${attacks}`)
            }
        }
        melee (event) {
            const clickID = $(event.currentTarget).attr('id');    //location of click in "column-row" string form
            const $foe = $(`#${clickID}`).children().eq(0);
            console.log(`Melee-ing tile ${clickID}`);
            //checking if tile has anyone on it
            if($foe.length === 0) {
                console.log(`--there's no one to attack at ${clickID}`);
                return;
            }
            //checking if tile is within reach (NESW)
            if( clickID != this.position.north.join('-') & clickID != this.position.east.join('-') & clickID != this.position.south.join('-') & clickID != this.position.west.join('-')) {
                console.log(`--${clickID} is out of range`);
                return;
            } else {
                //find which enemy player is fighting
                let index;
                for(let i = 0; i < enemies.length; i++) {
                    if(enemies[i].name === $foe.attr('id')) {
                        index = i;
                    }
                }
                // evaluate damange and health remaining
                console.log(`--before: ${enemies[index].health}`);
                console.log(`--damage: ${this.damage}`);
                enemies[index].health -= this.damage;
                console.log(`--after: ${enemies[index].health}`);

                //check if foe is dead (which removes enemy div) and update enemies array
                if(enemies[index].isDead()) {
                    console.log(`removing ${enemies[index]}`);
                    enemies.splice(index, 1);
                    score += 100;
                    $score.text(`Score: ${score}`);
                }
                this.hasAttack = false;
                attacks--;
                $status.text(`Moves: ${moves}, Attacks: ${attacks}`)
            }
        }
    }
    class Enemy extends Character {
        constructor(name, id, health, damage, current) {
            super(name, id, health, damage, current);
        }
        lookForGnome () {
            console.log(`${this.name} is looking for the gnome`);
            const surroundingTiles = this.getSurroundingTiles();
            let returnValue = false;
            surroundingTiles.forEach((value) => {
                if(value.attr('id') === gnome.getCurrentPosition()) {
                    console.log(`--gnome found at ${gnome.getCurrentPosition()}`);
                    returnValue = true;
                }
            });
            return returnValue;
        }
        moveTowardGnome () {
            console.log(`${this.name} is moving toward gnome`);
            console.log(`--gnome is at ${gnome.getCurrentPosition()}`);
            console.log(`--${this.name} is at ${this.position.current}`);
            if(this.lookForGnome()) {
                this.melee();
            } else {
                let vector = [];
                vector[0] =  gnome.position.current[0] - this.position.current[0];
                vector[1] = gnome.position.current[1] - this.position.current[1];
                console.log(`--vector is ${vector}`);
                
                let newPosition = [this.position.current[0],this.position.current[1]];
                if(vector[0] > 0) {
                    newPosition[0] = this.position.current[0] + 1;
                } else if(vector[0] < 0) {
                    newPosition[0] = this.position.current[0] - 1;
                } else {
                    if(vector[1] > 0) {
                        newPosition[1] = this.position.current[1] + 1;
                    } else {
                        newPosition[1] = this.position.current[1] - 1;
                    }
                }
                if(isTileOccupied(newPosition)) {
                    console.log(`--${this.name} is not moving`);
                } else {
                    this.position.current[0] = newPosition[0];
                    this.position.current[1] = newPosition[1];
                    console.log(`--${this.name} is moving to ${this.getCurrentPosition()}`);
                    $(`#${newPosition.join('-')}`).append(this.div);
                    this.updatePosition();
                }
                if(this.lookForGnome()) {
                    this.melee();
                }
            }
        }
        melee () {
            console.log(`${this.name} is attacking ${gnome.name}`);
            // evaluate damange and health remaining
            console.log(`--before: ${gnome.health}`);
            console.log(`--damage: ${this.damage}`);
            gnome.health -= this.damage;
            console.log(`--after: ${gnome.health}`);
            $health.text(`Health: ${gnome.health}`);
            //check if foe is dead (which removes enemy div) and update enemies array
            if(gnome.isDead()) {
                alert(`You died!`);
                alert(`Final score: ${score}`);
                endGame();
                return;
            }
            this.hasAttack = false;
            attacks--;
            $status.text(`Moves: ${moves}, Attacks: ${attacks}`)
        }
    }

///////// JQUERY OBJECT VARIABLES /////////
const $container = $('#container'); //jquery object of game container
const $tile = $('<div>').addClass('tile');  //jquery object of template tile (not appended anywhere itself)
const $level = $('#level');
const $score = $('#score');
const $health = $('#health');
const $status = $('#status');
const $mode = $('#mode');

///////// GAMEPLAY VARIABLES /////////
let side = 5;   //size of side of dungeon
let startTile = Math.floor(side / 2); //where the gnome will start
let score = 0;
let level = 0;  //level of the game
let attacks = 1;   //turns left
let moves = 1;   //moves left
let numEnemies = 1;
let isPlayerTurn = true; //if it's the player's turn or the enemies turn
let mode = 'move'; //determines which mode player is in

///////// CHARACTER VARIABLES /////////
const gnome = new Player('gnome', 'gnome', 3, 1, [startTile, startTile]); //gnome object
let enemies = []; //used to hold enemy objects

///////// BUTTON ON-CLICK FUNCTIONS /////////
$('#end-turn').on('click', () => {
    console.log('end turn clicked')
    enemyTurn();
})
$('#move').on('click', () => {
    console.log('Move mode on');
    $mode.text(`Moving`);
    mode = 'move';
})
$('#melee').on('click', () => {
    console.log('Melee mode on');
    $mode.text(`Attacking`);
    mode = 'melee'
})

///////// OTHER FUNCTIONS /////////
//generates dungeon with size side x side
//appends $gnome div (in gnome object) to center
//generates an array of Enemy objects and appends their divs on random tiles in the dungeon
const generateDungeon = () => {
    console.log(`Generating dungeon with side = ${side} and startTile = ${startTile}`);
    //nested loops used to put tiles in css grid
    for(let column = 0; column < side; column++){
        for(let row = 0; row < side; row++){
            const $newTile = $tile.clone();
            // $newTile.text(`row${row},column${column}`); //comment in to get row/column values in tiles
            $newTile.attr('id',`${row}-${column}`); //tile given id like "1-2"
            $newTile.css('grid-area', `${row + 1} / ${column + 1} / ${row + 2} / ${column + 2}`);
            //click event added to every tile that triggers gnome action depending on value of move
            $newTile.on('click', () => { 
                if(gnome.hasMove & mode === 'move') {
                    gnome.move(event);
                } else if (gnome.hasAttack & mode === 'melee'){
                    gnome.melee(event);
                } else {
                    console.log(`No moves, no attacks.`)
                };
            });
            $newTile.appendTo($container);  //appends tile
        }
    }
    //appending gnome and updating its postion
    gnome.position.current = [startTile, startTile];
    gnome.updatePosition();
    console.log(gnome.position);
    gnome.div.appendTo($(`#${startTile}-${startTile}`));
    //generating enemies and appending them to random locations in the dungeon
    for(let i = 0; i < numEnemies; i++) {
        let randomLocation = getRandomLocation();
        while(isTileOccupied(randomLocation)) {
            randomLocation = getRandomLocation();
        }
        generateEnemy(randomLocation);
    }
}
//simply function to generate location of random tile in dungeon
const getRandomLocation = () => {
    return [Math.floor(Math.random() * side), Math.floor(Math.random() * side)];
}

//checks if any div with class .tile has children elements
const isTileOccupied = (location) => {
    const locationStr = `${location[0]}-${location[1]}`;
    const $location = $(`#${locationStr}`);
    console.log(`Checking if ${locationStr} is occupied`)

    if($location.children().length < 1) {
        console.log(`--${locationStr} is empty`);
        return false;
    } else if($location.children().length > 1){
        console.log(`ERROR`);
    } else {
        console.log(`--${locationStr} is occupied`);
        return true;
    }
}
//generates an enemy object, pushes it on to the enemies array, and appends its div to the dungeon
const generateEnemy = (location) => {
    console.log(`Generating enemy`);
    const enemyNum = enemies.length;

    enemies.push(new Enemy(
        `enemy${enemyNum}` /*name*/,
        `enemy${enemyNum}`/*id*/,
        1 /*health*/,
        1 /*damage*/,
        location /*location*/
    ));
    enemies[enemyNum].div.addClass('enemy');
    enemies[enemyNum].updatePosition();
    console.log(`--generated #${$(enemies[enemyNum].div).attr('id')} at ${location}`);

    const $enemyStart = $(`#${enemies[enemyNum].position.current.join('-')}`);
    $($enemyStart).append(enemies[enemyNum].div);
}

const startLevel = () => {
    gnome.updatePosition();
    level++;
    $level.text(`Level: ${level}`)
    console.log(`Starting level ${level}`);
    numEnemies ++;
    if(level % 4 === 0 & side < 9) {
        side += 2;
        startTile++;
        numEnemies += 2;
    }
    generateDungeon();
}

const enemyTurn = () => {
    for(let i = 0; i < enemies.length; i++) {
        enemies[i].updatePosition();
        enemies[i].moveTowardGnome();
    }
    gnome.hasMove = true;
    gnome.hasAttack = true;
    moves = 1;
    attacks = 1;
    $status.text(`Moves: ${moves}, Attacks: ${attacks}`);
    if(enemies.length === 0) {
        startLevel();
    }
}

const endGame = () => {
    $container.off('click');
}

startLevel();

});