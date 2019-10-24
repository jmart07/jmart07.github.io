$(() => {
    //// ACTORS ////
    //class for creating gnome (player) and enemies
    class Character {
        constructor(name, current) {
            this.name = name;
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
            console.log(`${this.name}'s position: ${this.position.current.join('-')}`);
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
        moveCharacter (value) {
            console.log(`Moving ${this.name} ${value}`);
    
            //set previous to current
            this.position.previous[0] = this.position.current[0];
            this.position.previous[1] = this.position.current[1];
    
            switch(value) {
                case 'north':
                    if(this.position.current[0] - 1 < 0) {
                        break;
                    } else {
                        this.position.current[0]--;
                        break;
                    }
                case 'east':
                    if(this.position.current[1] + 1 > (side - 1)) {
                        break;
                    } else {
                        this.position.current[1]++;
                        break;
                    }
                case 'south':
                    if(this.position.current[0] + 1 > (side - 1)) {
                        break;
                    } else {
                        this.position.current[0]++;
                        break;
                    }
                case 'west':
                    if(this.position.current[1] - 1 < 0) {
                        break;
                    } else {
                        this.position.current[1]--;
                        break;
                    }
            }

            this.updatePosition();
    
            const $newPosition = $(`#${this.getCurrentPosition()}`);
            $newPosition.append($gnome);
        }
    }

    const $container = $('#container'); //jquery object of game container
    const $tile = $('<div>').addClass('tile');  //jquery object of template tile (not appended anywhere itself)
    const $gnome = $('<div>').attr('id','gnome');   //jquery object of gnome

    let side = 5;   //size of side of dungeon
    let startTile = Math.floor(side / 2); //where the gnome will start
    const gnome = new Character('gnome',`${startTile},${startTile}`); //gnome, player character

    //// FUNCTIONS ////
    // any keyboard press in body will test to see if gnome should be moved using WASD keys
    $('body').keydown((event) => {
        event.preventDefault();
        console.log(event.code);
        switch(event.code) {
            case 'ArrowUp':
                console.log('moving north');
                gnome.moveCharacter('north');
                break;
            case 'ArrowLeft':
                console.log('moving west');
                gnome.moveCharacter('west');
                break;
            case 'ArrowDown':
                console.log('moving south');
                gnome.moveCharacter('south');
                break;
            case 'ArrowRight':
                console.log('moving east');
                gnome.moveCharacter('east');
                break;
        }
    })

    //generates dungeon and sets gnome to center
    const generateDungeon = () => {
        
        console.log(`Generating dungeon with side = ${side} and startTile = ${startTile}`);

        for(let column = 0; column < side; column++){
            for(let row = 0; row < side; row++){
                const $newTile = $tile.clone();
                // $newTile.text(`row${row},column${column}`);
                $newTile.attr('id',`${row}-${column}`);
                $newTile.css('grid-area', `${row + 1} / ${column + 1} / ${row + 2} / ${column + 2}`);
                $newTile.appendTo($container);
            }
        }

        gnome.position.current = [startTile, startTile];
        $gnome.appendTo($(`#${startTile}-${startTile}`));

        gnome.updatePosition();
        // console.log(gnome.position);
    }

    generateDungeon();
});