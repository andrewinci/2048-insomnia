class Table {
    constructor(table, size) {
        this.table = table;
        this.size = size;
        this.matrix = [];
        if (!size) throw 'Wrong size';
        if (!table) throw 'Wrong table';
        this.build_table();
        this.build_matrix();
    }

    build_matrix() {
        for (let r = 0; r < this.size; r++) {
            this.matrix[r] = [];
        }
    }

    build_table() {
        for (let r = 0; r < this.size; r++) {
            let row = document.createElement('tr');
            for (let c = 0; c < this.size; c++)
                row.appendChild(document.createElement('td'));
            this.table.appendChild(row);
        }
    }

    get_value(row, col) {
        this.check_row_col(row, col);
        return this.matrix[row][col];
        //return t.table.rows[row].cells[col].innerText;
    }

    set_value(row, col, value) {
        this.check_row_col(row, col);
        let cell = this.table.rows[row].cells[col]
        cell.innerText = value;
        cell.setAttribute('class', 'cell'+value);
        this.matrix[row][col] = value;
    }

    get_empty_cells() {
        let empty_cells = [];
        for (let r = 0; r < this.size; r++)
            for (let c = 0; c < this.size; c++)
                if (this.get_value(r, c) == null)
                    empty_cells.push([r, c]);
        return empty_cells;
    }

    check_row_col(row, col) {
        if (row == null || row < 0 || row > this.size) throw 'Invalid row';
        if (col == null || col < 0 || col > this.size) throw 'Invalid col';
    }
}

function random_val(list) {
    let val = Math.floor(Math.random() * list.length);
    return list[val];
}

class Game {
    constructor(table) {
        this.table = table;
        this.size = table.size;
        // possible values for a new tale
        this.new_tale_values = [2, 4];
    }

    add_random_tale() {
        let empty_cells = this.table.get_empty_cells();
        if (empty_cells.length === 0) throw 'No empty cell availables'
        let cell = random_val(empty_cells);
        let val = random_val(this.new_tale_values);
        this.table.set_value(cell[0], cell[1], val);
    }

    push_down() {
        let push_down_col = function (table, c) {
            let tiles = [];
            for(let i=table.size - 1; i>=0; i--){
                let val = table.get_value(i, c);
                table.set_value(i, c, null);
                if( val == null) continue;
                if ( tiles.length && tiles[tiles.length - 1] == val )
                    tiles[tiles.length - 1 ] = 2*val;
                else tiles.push(val);
            }
            for(let i=0; i<tiles.length; i++)
                table.set_value(table.size -1 - i, c, tiles[i]);
        }

        for (let c = 0; c < this.table.size; c++)
            push_down_col(this.table, c);
    }

    push_right() {
        let push_right_row = function (table, r) {
            let tiles = [];
            for(let i=table.size - 1; i>=0; i--){
                let val = table.get_value(r, i);
                table.set_value(r, i, null);
                if( val == null) continue;
                if ( tiles.length && tiles[tiles.length - 1] == val )
                    tiles[tiles.length - 1 ] = 2*val;
                else tiles.push(val);
            }
            for(let i=0; i<tiles.length; i++)
                table.set_value(r, table.size -1 - i, tiles[i]);
        }

        for (let r = 0; r < this.table.size; r++)
            push_right_row(this.table, r);
    }

    push_left() {
        let push_left_row = function (table, r) {
            let tiles = [];
            for(let i=0; i<=table.size - 1; i++){
                let val = table.get_value(r, i);
                table.set_value(r, i, null);
                if( val == null) continue;
                if ( tiles.length && tiles[tiles.length - 1] == val )
                    tiles[tiles.length - 1 ] = 2*val;
                else tiles.push(val);
            }
            for(let i=tiles.length - 1; i>=0; i--)
                table.set_value(r, i, tiles[i]);
        }

        for (let r = 0; r < this.table.size; r++)
            push_left_row(this.table, r);
    }

    push_top() {
        let push_top_col = function (table, c) {
            let tiles = [];
            for(let i=0; i<=table.size - 1; i++){
                let val = table.get_value(i, c);
                table.set_value(i, c, null);
                if( val == null) continue;
                if ( tiles.length && tiles[tiles.length - 1] == val )
                    tiles[tiles.length - 1 ] = 2*val;
                else tiles.push(val);
            }
            for(let i=tiles.length - 1; i>=0; i--)
                table.set_value(i, c, tiles[i]);
        }

        for (let c = 0; c < this.table.size; c++)
            push_top_col(this.table, c);
    }
}

let table = new Table(document.getElementById('table'), 5);
let game = new Game(table);
game.add_random_tale();
game.add_random_tale();

document.addEventListener('keydown', function (event) {
    switch (event.key) {
        case "ArrowLeft":
        case "a":
        case "A":
            game.push_left();
            break;
        case "ArrowRight":
        case "d":
        case "D":
            game.push_right();
            break;
        case "ArrowUp":
        case "w":
        case "W":
            game.push_top();
            break;
        case "ArrowDown":
        case "s":
        case "S":
            game.push_down();
            break;
        default:
            return
    }
    game.add_random_tale();
});