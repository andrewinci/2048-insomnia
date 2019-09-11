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
        this.table.rows[row].cells[col].innerText = value;
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

function random_val(list){
    let val = Math.floor(Math.random()*list.length);
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
}

let table = new Table(document.getElementById('table'), 5);
let game = new Game(table);