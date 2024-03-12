console.log('bismillAllah er Rahman er Rahim');
// Importing the inquirer and the chalk packages 
import inquirer from "inquirer";
import chalk from "chalk";
// Welcoming the users
console.log(chalk.green('Tic Tac Toe'));
// Making the Board Class for the board 
class Board {
    grid;
    constructor() {
        this.grid = [['_ ', '_ ', '_ '],
            ['_ ', '_ ', '_ '],
            ['_ ', '_ ', '_ ']];
    }
    // in this function we display the grid or board with the columnand row number so that user can easily play 
    // and add symbol to it
    display() {
        console.log(chalk.blue("  0  1  2"));
        for (let row = 0; row < 3; row++) {
            let row_s = `${chalk.blueBright(row)}`;
            for (let col = 0; col < 3; col++) {
                row_s += ` ${this.grid[row][col]}`;
            }
            console.log(row_s);
        }
    }
    //isFull():this method is used to check whether the board has any space left or not
    isFull() {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (this.grid[row][col] === '_ ') {
                    return false; // If any cell is empty, the board is not full
                }
            }
        }
        return true; // If all cells are non-empty, the board is full
    }
    // DoMove(): this method takes the symbol as a parameter , column and row number of the board and add
    // that symbol to that particular location
    doMove(symbol, row, column) {
        if (this.grid[row][column] === '_ ') {
            this.grid[row][column] = `${symbol.trim()}`;
            this.display();
            return true;
        }
        else {
            return false;
        }
    }
    //Check(): this method checks that if player has won or draw 
    check(symbol) {
        //First row
        if (this.grid[0][0] == symbol && this.grid[0][1] == symbol && this.grid[0][2] == symbol) {
            return true;
            //Second Row
        }
        else if (this.grid[1][0] == symbol && this.grid[1][1] == symbol && this.grid[1][2] == symbol) {
            return true;
            // Third row
        }
        else if (this.grid[2][0] == symbol && this.grid[2][1] == symbol && this.grid[2][2] == symbol) {
            return true;
            //first Diagnol from left to right
        }
        else if (this.grid[0][0] == symbol && this.grid[1][1] == symbol && this.grid[2][2] == symbol) {
            return true;
            // second diagnol from right to left
        }
        else if (this.grid[0][2] == symbol && this.grid[1][1] == symbol && this.grid[2][0] == symbol) {
            return true;
            //first column
        }
        else if (this.grid[0][0] == symbol && this.grid[1][0] == symbol && this.grid[2][0] == symbol) {
            return true;
            // second Column
        }
        else if (this.grid[0][1] == symbol && this.grid[1][1] == symbol && this.grid[2][1] == symbol) {
            return true;
            //third Column
        }
        else if (this.grid[0][2] == symbol && this.grid[1][2] == symbol && this.grid[2][2] == symbol) {
            return true;
        }
        else {
            return false;
        }
    }
}
// Now Making a player class 
class Player {
    symbol;
    constructor(symbol) {
        this.symbol = symbol;
    }
    P_makeMove(board, row, col) {
        board.doMove(this.symbol, row, col);
        board.display();
    }
    P_check(board, symbol) {
        if (board.check(symbol)) {
            return true;
        }
        else {
            return false;
        }
    }
}
class Game {
    players;
    board;
    currentPlayerIndex;
    constructor(player1, player2) {
        this.players = [player1, player2];
        this.currentPlayerIndex = 0;
        this.board = new Board();
    }
    async playGame() {
        this.board.display();
        while (true) {
            const currentPlayer = this.players[this.currentPlayerIndex];
            console.log(chalk.blueBright('Current player is ' + (currentPlayer.symbol)));
            const inp = await inquirer.prompt([{
                    name: 'rows',
                    type: 'input',
                    message: chalk.yellow('Enter the number of row in which you want to enter'),
                    validate: function (value) {
                        const intValue = parseInt(value);
                        return intValue >= 0 && intValue <= 2 && !isNaN(intValue);
                    }
                }, {
                    name: 'cols',
                    type: 'input',
                    message: chalk.yellow('Enter the number of col in which you want to enter'),
                    validate: function (value) {
                        const intValue = parseInt(value);
                        return intValue >= 0 && intValue <= 2 && !isNaN(intValue);
                    }
                }]);
            const row = parseInt(inp.rows);
            const col = parseInt(inp.cols);
            if (this.board.doMove(currentPlayer.symbol, row, col)) {
                if (currentPlayer.P_check(this.board, currentPlayer.symbol)) {
                    console.log(`${currentPlayer.symbol} ${chalk.green('wins')}`);
                    break;
                }
                else if (this.board.isFull()) {
                    console.log(chalk.yellow("It's a draw!"));
                    break;
                }
                // Switch to the next player
                this.currentPlayerIndex = (this.currentPlayerIndex + 1) % 2;
            }
            else {
                console.error('Invalid move! Please try again.');
            }
        }
    }
}
do {
    let player1 = new Player('O');
    let player2 = new Player('X');
    let game = new Game(player1, player2);
    await game.playGame();
    var response = await inquirer.prompt([{
            name: 'rep',
            type: 'list',
            choices: ['YES', 'NO'],
            message: 'Do you want to Play another round'
        }]);
} while (response.rep == 'YES');
