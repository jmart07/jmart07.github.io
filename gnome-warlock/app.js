$(() => {
    // const player = class {




    // }


    // let side = 5;
    // console.log(`side: ${side}`);
    // let startTile = Math.ceil(side/2);
    // console.log(`origin: ${startTile}`);

    const $container = $('#container');
    // for(let i = 1; i <= side; i++) {
    //     for(let j = 1; j <= side; j++) {
    //         $tile = $('<div>').addClass('tile');
    //         $tile.addClass(`row-${i}`);
    //         $tile.addClass(`column-${j}`);
    //         $tile.appendTo($container);
    //     }
    // }

    // $gnome = $('<div>').attr('id','gnome');
    // $(`.row-${startTile}.column-${startTile}`).replaceWith($gnome);



    let side = 5;
    console.log(`side: ${side}`);

    let startTile = Math.floor(side/2);
    console.log(`startTile: ${startTile}`);

    let dungeon = [];
    for(let row = 0; row < side; row++) {
        dungeon.push([]);
        for(let column = 0; column < side; column++) {
            dungeon[row].push('_')
            // dungeon[row].push(`${row},${column}`)
        }
    }

    // console.log(dungeon)

    let gnome = 'G';
    console.log(`gnome: ${gnome}`);

    let gnomeRow = startTile;
    let gnomeColumn = startTile;
    console.log(`gnome location: ${gnomeRow},${gnomeColumn}`);

    dungeon[gnomeRow][gnomeColumn] = gnome;

    // console.log(dungeon);

    for(let i = 0; i < 3; i++) {

        let move = prompt('move');
        console.log(`move: ${move}`)

        let gnomeRowPrevious = gnomeRow
        let gnomeColumnPrevious = gnomeColumn

        if(move === 'n') {
            gnomeRow--;
        } else if(move === 'e') {
            gnomeColumn++;
        } else if(move === 's') {
            gnomeRow++;
        } else if(move === 'w') {
            gnomeColumn--;
        } else {
            console.log('bad input');
        }

        dungeon[gnomeRow][gnomeColumn] = gnome;

        dungeon[gnomeRowPrevious][gnomeColumnPrevious] = 'p'

        console.log(`gnome location: ${gnomeRow},${gnomeColumn}`);

        console.log(dungeon);

        for(let x = 0; x < side; x++) {
            for(let y = 0; y < side; y++) {
                const $tile = $('<div>').attr('id',`${x},${y}`)
                $tile.text(`row${x},column${y}`);
                $tile.addClass('tile');
                $container.append($tile);
            }
        }

    }
    console.log('end');
});