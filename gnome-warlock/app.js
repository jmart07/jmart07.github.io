$(() => {
    //// ACTORS ////
    //class for creating gnome (player) and enemies
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
            console.log(`Getting current postion`);
            console.log(`--${this.name}'s position: ${this.position.current.join('-')}`);
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
                switch(clickID) {
                    case this.position.north.join('-'):
                        this.position.current[0]--;
                        this.hasMove = false;
                        break;
                    case this.position.east.join('-'):
                        this.position.current[1]++;
                        this.hasMove = false;
                        break;
                    case this.position.south.join('-'):
                        this.position.current[0]++;
                        this.hasMove = false;
                        break;
                    case this.position.west.join('-'):
                        this.position.current[1]--;
                        this.hasMove = false;
                        break;
                    default:
                        console.log(`--${this.name} can't move to ${clickID}`)
                        break;
                }
                this.updatePosition();
    
                const $newPosition = $(`#${this.getCurrentPosition()}`);
                $newPosition.append(gnome.div);
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
                    enemies.splice(index, 1);
                }
            }
        }
        ranged (event) {
            console.log(event)
        }
    }

    class Enemy extends Character {
        constructor(name, id, health, damage, current) {
            super(name, id, health, damage, current);
        }
        move () {



        }
        melee () {




        }
    }



///////// JQUERY OBJECTS /////////
const $container = $('#container'); //jquery object of game container
const $tile = $('<div>').addClass('tile');  //jquery object of template tile (not appended anywhere itself)

///////// GAMEPLAY VARIABLES /////////
let side = 5;   //size of side of dungeon
let startTile = Math.floor(side / 2); //where the gnome will start
let level = 1;  //level of the game
let turn = 1;   //turn number
let mode = 'move'; //determines which mode player is in

///////// CHARACTER VARIABLES /////////
const gnome = new Player('gnome', 'gnome', 100, 15, [startTile, startTile]); //gnome object
let enemies = []; //used to hold enemy objects

///////// ON-CLICK FUNCTIONS /////////
$('#move').on('click', () => {
    console.log('Move mode on');
    mode = 'move';
})
$('#melee').on('click', () => {
    console.log('Melee mode on');
    mode = 'melee'
})
$('#ranged').on('click', () => {
    console.log('Ranged mode on');
    mode = 'ranged'
})

//generates dungeon with size side x side
//appends $gnome div (in gnome object) to center
//generates an array of Enemy objects and appends their divs on random tiles in the dungeon
const generateDungeon = () => {
    console.log(`Generating dungeon with side = ${side} and startTile = ${startTile}`);
    for(let column = 0; column < side; column++){
        for(let row = 0; row < side; row++){
            const $newTile = $tile.clone();
            // $newTile.text(`row${row},column${column}`);
            $newTile.attr('id',`${row}-${column}`);
            $newTile.css('grid-area', `${row + 1} / ${column + 1} / ${row + 2} / ${column + 2}`);
            
            $newTile.on('click', () => { 
                if(mode === 'move') {
                    gnome.move(event);
                } else {
                    gnome.melee(event);
                }
            });
            $newTile.appendTo($container);
        }
    }

    gnome.div.appendTo($(`#${startTile}-${startTile}`));
    gnome.updatePosition();

    for(let i = 0; i < 5; i++) {
        let randomLocation = getRandomLocation();
        while(isTileOccupied(randomLocation)) {
            randomLocation = getRandomLocation();
        }
        generateEnemy(randomLocation);
    }
}

const getRandomLocation = () => {
    return [Math.floor(Math.random() * side), Math.floor(Math.random() * side)];
}

//checks if any div with class .tile has children elements
const isTileOccupied = (location) => {
    const locationStr = `${location[0]}-${location[1]}`;
    const $location = $(`#${locationStr}`);
    console.log(`Checking if ${locationStr} is occupied`)

    if($location.children().length === 0) {
        console.log(`--${locationStr} is empty`);
        return false;
    } else {
        console.log(`--${locationStr} is occupied`);
        return true;
    }
}

const generateEnemy = (location) => {
    console.log(`Generating enemy`);
    const enemyNum = enemies.length;

    enemies.push(new Enemy(
        `enemy${enemyNum}` /*name*/,
        `enemy${enemyNum}`/*id*/,
        2 /*health*/,
        1 /*damage*/,
        location /*location*/
    ));
    enemies[enemyNum].div.addClass('enemy');
    console.log(`--generated #${$(enemies[enemyNum].div).attr('id')} at ${location}`);

    const $enemyStart = $(`#${enemies[enemyNum].position.current.join('-')}`);
    $($enemyStart).append(enemies[enemyNum].div);
}

const startLevel = () => {
    console.log(`Starting level ${level}`);
    turn = 1;
    generateDungeon();
}


startLevel();

});