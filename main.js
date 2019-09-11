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

    build_matrix(){
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

    check_row_col(row, col) {
        if (row == null || row < 0 || row > this.size) throw 'Invalid row';
        if (col == null || col < 0 || col > this.size) throw 'Invalid col';
    }
}

let table = new Table(document.getElementById('table'), 5);