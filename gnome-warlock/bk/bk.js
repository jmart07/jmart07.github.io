        for(let x = 0; x < side; x++) {
            for(let y = 0; y < side; y++) {
                const $tile = $('<div>').attr('id',`${x},${y}`)
                $tile.text(`row${x},column${y}`);
                $tile.addClass('tile');
                $container.append($tile);
            }
        }

        const $replace = $(`#${gnome.position.current[0]}-${gnome.position.current[1]}`);
        $replace.replaceWith($gnome);

        $(`#${gnome.position.previous[0]}-${gnome.position.previous[1]}`).replaceWith($newTile);
        $(`#${gnome.position.current[0]}-${gnome.position.current[1]}`).replaceWith($gnome);

        $(`#${gnome.position.previous[0]}-${gnome.position.previous[1]}`).replaceWith($newTile);
        $(`#${gnome.position.current[0]}-${gnome.position.current[1]}`).replaceWith($gnome);

            //actors
    const gnome = {
        name: 'gnome',
        position: {
            current: [0,0],
            previous: [0,0],
            north: [0,0],
            east: [0,0],
            south: [0,0],
            west: [0,0]
        },
        getCurrentPosition: () => {
            console.log(`getting currnet postion`);
            console.log(`gnome position: ${gnome.position.current.join('-')}`);
            return `${gnome.position.current.join('-')}`;
        }
    }

    //updates position coordinates of gnome or enemy based on current position
    // const updatePosition = (actor) => {
    //     console.log(`updating position of ${actor.name}`);

    //     const pos = actor.position.current;
    //     actor.position.north = [pos[0] - 1, pos[1]];
    //     actor.position.east  = [pos[0], pos[1] + 1];
    //     actor.position.south = [pos[0] + 1, pos[1]];
    //     actor.position.west  = [pos[0], pos[1] - 1];
    // }



            //update current based on tile clicked
            if(value === this.position.north.join('-')) {
                this.position.current[0]--;
            } else if(value === this.position.east.join('-')) {
                this.position.current[1]++;
            } else if(value === this.position.south.join('-')) {
                this.position.current[0]++;
            } else if(value === this.position.west.join('-')) {
                this.position.current[1]--;
            } else {
                console.log(`${this.name} can't move here`);
            }

            
    