$(() => {
    // const player = class {




    // }


    // let side = 5;
    // console.log(`side: ${side}`);
    // let startTile = Math.ceil(side/2);
    // console.log(`origin: ${startTile}`);

    // const $container = $('#container');
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
    for(let i = 0; i < side; i++) {
        dungeon.push([]);
        for(let j = 0; j < side; j++) {
            // dungeon[i].push(`${i + 1},${j + 1}`)
            dungeon[i].push('_')
            // console.log(dungeon[i]);
        }
    }

    let gnome = 'G';
    dungeon[startTile][startTile] = gnome;

    console.log(dungeon)
  
});