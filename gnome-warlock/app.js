$(() => {
    // const player = class {




    // }









    let side = 5;

    const $container = $('#container');
    for(let i = 0; i < side; i++) {
        for(let j = 0; j < side; j++) {
            $tile = $('<div>').addClass('tile');
            $tile.addClass(`row-${i}`);
            $tile.addClass(`column-${j}`);
            $tile.appendTo($container);
        }
    }














});