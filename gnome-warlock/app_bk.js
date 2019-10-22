$(() => {

    //actors
    gnome = {
        name: 'gnome',
        location: {
            current: [0,0],
            last: [0,0],
            north: [0,0],
            south: [0,0],
            east: [0,0],
            west: [0,0]
        }
    }

    const $container = $('#container'); //jquery object of game container
    const $gnome = $('<div>').attr('id','gnome');   //jquery object of gnome
    let side = 5;   //size of side of dungeon
    let startTile = Math.floor(side/2); //where the gnome will start
    let dungeon = [];   //to be populated with 2D array representing dungeon floor

    //functions
    // const updateLocation = (actor) => {
    //     console.log(`updating location of ${actor.name}`);

    //     location = actor.location.current;
    //     console.log(location)
    //     // actor.location.north = [location[0]--, location[1]];
    //     // actor.location.south = [location[0]++, location[1]];
    //     // actor.location.east  = [location[0], location[1]++];
    //     // actor.location.west  = [location[0], location[1]--];

    //     // console.log(actor.location);
    // }

    const moveGnome = (event) => {
        console.log('moving gnome');
        const clickID = $(event.currentTarget).attr('id');
        console.log(`clickID: ${clickID}`);

        gnome.location.last = gnome.location.current;
        updateLocation(gnome);

        // const northOfGnome = gnome.location.current;
        // const eastOfGnome = gnome.location.current;
        // const southOfGnome = gnome.location.current;
        // const westOfGnome = gnome.location.current;


        // if(move === 'n') {
        //     gnomeRow--;
        // } else if(move === 'e') {
        //     gnomeColumn++;
        // } else if(move === 's') {
        //     gnomeRow++;
        // } else if(move === 'w') {
        //     gnomeColumn--;
        // } else {
        //     console.log('bad input');
        // }

        // dungeon[gnomeRow][gnomeColumn] = gnome;

        // dungeon[gnomeRowPrevious][gnomeColumnPrevious] = 'p'

        // console.log(`gnome location: ${gnomeRow},${gnomeColumn}`);

        // console.log(dungeon);

    }

    //generates dungeon and sets gnome to center
    const generateDungeon = () => {
        
        console.log('generating dungeon');
        console.log(`side: ${side}`);
        console.log(`startTile: ${startTile}`);

        for(let row = 0; row < side; row++) {
            dungeon.push([]);
            for(let column = 0; column < side; column++) {
                // dungeon[row].push(`${row},${column}`);
                dungeon[row].push('_');
                const $tile = $('<div>');
                $tile.text(`row${row},column${column}`);
                $tile.attr('id',`${row},${column}`);
                $tile.addClass('tile');
                $tile.on('click',moveGnome);
                $container.append($tile);
            }
        }

        gnome.location.current = [startTile, startTile];
        console.log(`gnome location: ${gnome.location.current}`);
    }

    generateDungeon();
});