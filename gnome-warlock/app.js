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
            console.log(`getting current postion`);
            console.log(`${this.name}'s position: ${this.position.current.join('-')}`);
            return `${this.position.current.join('-')}`;
        }
    }

    const $container = $('#container'); //jquery object of game container
    const $tile = $('<div>').addClass('tile');  //jquery object of template tile (not appended anywhere itself)
    const $gnome = $('<div>').attr('id','gnome');   //jquery object of gnome
    
    let side = 5;   //size of side of dungeon
    let startTile = Math.floor(side / 2); //where the gnome will start
    const gnome = new Character('gnome',`${startTile},${startTile}`); //gnome, player character



    //// FUNCTIONS /////
    //updates position coordinates of gnome or enemy based on current position
    const updatePosition = (actor) => {
        console.log(`updating position of ${actor.name}`);

        const pos = actor.position.current;
        actor.position.north = [pos[0] - 1, pos[1]];
        actor.position.east  = [pos[0], pos[1] + 1];
        actor.position.south = [pos[0] + 1, pos[1]];
        actor.position.west  = [pos[0], pos[1] - 1];
    }




    const moveGnome = (event) => {
        console.log('moving gnome');

        const clickID = $(event.currentTarget).attr('id');
        console.log(`clickID: ${clickID}`);

        //set previous to current
        gnome.position.previous[0] = gnome.position.current[0];
        gnome.position.previous[1] = gnome.position.current[1];

        //update current based on tile clicked
        if(clickID === gnome.position.north.join('-')) {
            gnome.position.current[0]--;
        } else if(clickID === gnome.position.east.join('-')) {
            gnome.position.current[1]++;
        } else if(clickID === gnome.position.south.join('-')) {
            gnome.position.current[0]++;
        } else if(clickID === gnome.position.west.join('-')) {
            gnome.position.current[1]--;
        } else {
            console.log(`gnome can't move here`);
        }

        updatePosition(gnome);

        const $test = $(`#${gnome.getCurrentPosition()}`);
        $gnome.appendTo($test);
    }




    //generates dungeon and sets gnome to center
    const generateDungeon = () => {
        
        console.log('generating dungeon');
        console.log(`side: ${side}`);
        console.log(`startTile: ${startTile}`);

        for(let row = 0; row < side; row++) {
            for(let column = 0; column < side; column++) {
                const $newTile = $tile.clone();
                $newTile.text(`row${row},column${column}`);
                $newTile.attr('id',`${row}-${column}`);
                $newTile.on('click', moveGnome);
                $container.append($newTile);
            }
        }

        gnome.position.current = [startTile, startTile];
        $gnome.appendTo($(`#${startTile}-${startTile}`));

        updatePosition(gnome);
        // console.log(gnome.position);
    }

    generateDungeon();
});