        for(let x = 0; x < side; x++) {
            for(let y = 0; y < side; y++) {
                const $tile = $('<div>').attr('id',`${x},${y}`)
                $tile.text(`row${x},column${y}`);
                $tile.addClass('tile');
                $container.append($tile);
            }
        }