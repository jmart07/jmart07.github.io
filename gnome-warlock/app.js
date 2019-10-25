$(() => {
    //// ACTORS ////
    //class for creating gnome (player) and enemies
    class Character {
        constructor(name, id, current) {
            this.name = name;
            this.div = $('<div>').attr('id', id);
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
        moveCharacter (event) {
            const clickID = $(event.currentTarget).attr('id');
            console.log(`Moving ${this.name} to ClickID: ${clickID}`);

            if(isTileOccupied(clickID)) {
                console.log('not moving');
                return;
            } else {
                //set previous to current
                this.position.previous[0] = this.position.current[0];
                this.position.previous[1] = this.position.current[1];

                switch(clickID) {
                    case this.position.north.join('-'):
                        if(this.position.current[0] - 1 < 0) {
                            break;
                        } else {
                            this.position.current[0]--;
                            break;
                        }
                    case this.position.east.join('-'):
                        if(this.position.current[1] + 1 > (side - 1)) {
                            break;
                        } else {
                            this.position.current[1]++;
                            break;
                        }
                    case this.position.south.join('-'):
                        if(this.position.current[0] + 1 > (side - 1)) {
                            break;
                        } else {
                            this.position.current[0]++;
                            break;
                        }
                    case this.position.west.join('-'):
                        if(this.position.current[1] - 1 < 0) {
                            break;
                        } else {
                            this.position.current[1]--;
                            break;
                        }
                    default:
                        console.log(`--${this.name} can't move to ${clickID}`)
                        break;
                }
                this.updatePosition();
    
                const $newPosition = $(`#${this.getCurrentPosition()}`);
                $newPosition.append(gnome.div);
            }
        }
        // checkNESW () {
        //     console.log('Checking NESW');

        //     this.position.forEach((value) => {
        //         switch(value) {
        //             case: 
        //         }

        //     })


        // }
    }

    const $container = $('#container'); //jquery object of game container
    const $tile = $('<div>').addClass('tile');  //jquery object of template tile (not appended anywhere itself)

    let side = 5;   //size of side of dungeon
    let startTile = Math.floor(side / 2); //where the gnome will start
    let level = 1;  //level of the game
    const gnome = new Character('gnome', 'gnome', [startTile, startTile]); //gnome, player character
    let enemies = []; //used to create ids of enemy divs

    //// FUNCTIONS ////
    //generates dungeon and sets gnome to center
    const generateDungeon = () => {
        
        console.log(`Generating dungeon with side = ${side} and startTile = ${startTile}`);

        for(let column = 0; column < side; column++){
            for(let row = 0; row < side; row++){
                const $newTile = $tile.clone();
                // $newTile.text(`row${row},column${column}`);
                $newTile.attr('id',`${row}-${column}`);
                $newTile.css('grid-area', `${row + 1} / ${column + 1} / ${row + 2} / ${column + 2}`);
                $newTile.on('click', () => { gnome.moveCharacter(event); });
                $newTile.appendTo($container);
            }
        }

        gnome.div.appendTo($(`#${startTile}-${startTile}`));
        gnome.updatePosition();
    }

    //checks if any div with class .tile has children elements. param is x and y coordinates in for "x-y"
    const isTileOccupied = (location) => {
        const $location = $(`#${location}`);
        console.log(`Checking if ${location} is occupied`)

        if($location.children().length === 0) {
            console.log(`--${location} is empty`);
            return false;
        } else {
            console.log(`--${location} is occupied`);
            return true;
        }
    }

    const generateEnemy = () => {
        console.log(`Generating enemy`);
        const enemyNum = enemies.length;
        const enemyPosition = [0,0];

        enemies.push(new Character(`enemy${enemyNum}` /*name*/, `enemy${enemyNum}`/*id*/, enemyPosition));
        enemies[enemyNum].div.addClass('enemy');
        console.log(`--generated #${$(enemies[enemyNum].div).attr('id')} at ${enemyPosition}`);

        const $enemyStart = $(`#${enemies[enemyNum].position.current.join('-')}`);
        $($enemyStart).append(enemies[enemyNum].div);

    }

    const startGame = () => {
        generateDungeon();
        generateEnemy();
        isTileOccupied([0,0]);
    }


    //Starts the game
    startGame();
});