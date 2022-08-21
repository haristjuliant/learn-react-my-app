// tutorial anda sampai sini https://id.reactjs.org/tutorial/tutorial.html#showing-the-past-moves

import React from "react";
import ReactDOM from 'react-dom/client';
import './index.css'

// {
// // mengganti komponen Square yang berupa kelas, dengan function.
// // karena dalam class Square tidak menyimpan state, dan hanya ada satu function, yaitu render()
// // perubahan ada dibawa kelas ini

// // class Square extends React.Component {
// //     /**
// //      * this.state agar mengingat state (posisi). dalam hal ini state jika nanti * * sudah di click.
// //      * ini contoh, React mengatur state dalam consturctor
// //      * konstructor this.state harus dianggap private
// //      */
// //     // ini akan dihapus, karena Square tidak menyimpan state dari game
// //     // constructor(props) {
// //     //     super(props)
// //     //     this.state = {
// //     //         value: null
// //     //     }
// //     // }

// //     render() {
// //         return (
// //             // <button className="square" onClick= {function() { console.log('click')}}>
// //             // jika memakai arrow funcutin
// //             // onClick prop (properties) harus di passing functiin. jadi React hanya akan memanggil fungsi setelah click.
// //             // jika tanpa arrow function/function, seperti ini 
// //             //      onClick = { console.log('click')}
// //             // maka akan 'click' akan terjalan setiap kali component re-render.
// //             // ada ada 9. (karena 9 square)
// //             <button
// //                 className="square"
// //                 /**
// //                  * === ini untuk yang sebelumnya ===
// //                  * mengganti action onClick dengan state
// //                  * dengan memanggil this.setState dari handler onClick() pada method render() Square, kita memberi tahu React untuk me-render ulang Square setiap <button> di klik
// //                  */
                
// //                 // prop onClick pada komponen built-in DOM <button> memberi tahu React menyiapkan event listener klik
// //                 // ketika tombol di klik, React memanggil event handler onClick yang sudah didefinisikan pada method render() Square
// //                 // event handler ini memanggil this.props.onClick(). prop onClick dari Square ditentukan oleh Board
// //                 // karena Board mengoperkan :
// //                 //        onClick= {()=> this.handleClick(i)}
// //                 // ke Square, Square memanggil this.handleClick(i) ketika di klik
// //                 onClick = {() => { this.props.onClick()}}
// //                 /**
// //                  * ada konvensi dalam React, penamaan on[Event] pada props yang merepresentasikan event dan
// //                  * handle[Event] untuk method yang menangani event tersebut
// //                  */
// //                 >
// //                 {this.props.value}
// //             </button>
// //         )
// //     }
// // }
// }

// pengubahan dari class menjadi function
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    )
}

// function untuk menentukan pemenang
function calculateWinner(squares) {
    // definisi pola square bagian mana yang menang
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for (let i = 0; i< lines.length; i++) {
        const [a,b,c] = lines[i]
        if (squares[a] && squares[a]=== squares[b] && squares[a]=== squares[c]) {
            return squares[a]
        }   
    }
    return null
}

class Board extends React.Component {
    /**
     *    ---- updated for history in state komponen Game ----
     * constructor di board sudah tidak diperlukan. Board menerima prop squares dan onClick dari komponen Game.
     * sudah ada handler untuk klik di dalam Board di banyak Square,
     * jadi yang perlu memberikan lokasi dari setiap Square ke handler onClick u/ memberi tahu square mana yang di klik.
     */

    /**
     * menyimpan state dalam component Board. tidak dalam tiap Square. karena akan rentan bug dan menyulitkan refractor
     * component Board dapat memberitahu setiap Square untuk menampilkan data dengan memberikannya melalui prop
     * agar data beberapa children dapat diambil dan membuat komponen berkomunikasi satu sama lain, deklarasikan state pada komponen Parent.
     * menaikan state ke komponen induk lazim ketika me-refractor komponen React
     */

    /** sekarang component state sudah tidak lg disimpan di Square
     * namun di Board. 
     * sehingga Komponen Squarer disebut 'Controlled Components'
     * Board memiliki control penuk pada komponen Square
     */

    // // sudah tidak dibutuhkan karena state dari komponen Game
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         squares: Array(9).fill(null),
    //         // X giliran pertama defaultnya 
    //         xIsNext: true,
    //     }
    // }

    renderSquare(i) {
        // method renderSquare() membaca dari dari state
        return (
            // diperlukan cara agar Square dapat memperbaharui state di Board.
            // tapi state dianggap 'private' didalam komponen, jadi tidak dapat mengubah state Board melalu Square secara langsung
            // makanya, diberika fungsi dari Board ke Square. fungsi dipanggil ketika komponen di klik
            // hati2, <Square> karena beberapa baris agar mudah dibaca
            // juga return harus di kasih tanda kurung, agar Js me-return beberapa block ini, bukan hanya satu baris setelah return
            <Square
                value={this.props.squares[i]}
                onClick = {()=> this.props.onClick(i)}
            />
        )
    }

    render() {

        // render sudah di handle di komponen Game
        /*
        const winner = calculateWinner(this.state.squares)
        let status;
        // jika winner sudah ada nilainya
        if (winner) {
            status = 'Winner: '+winner
        }
        // jika winner tidak ada nilainya (return null kalau di func calculateWinner). falsefy 
        else {
            status = 'Next player: '+ (this.state.xIsNext ? 'X' : 'O')
        }
        */

        return (
            <div>
                {/* status sudah di render di komponen Game */}
                {/* <div className="status">{status}</div> */}
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        )
    }
}

class Game extends React.Component {
    /**
     * jadi idenya, state Square dinaikan ke state board. sehingga board dapat mengendalikan square
     * lalu jika ditambahkan history (setiap langkap game disimpan dalam history), maka harus ada state yang bisa mengendalikan board
     * sehingga state board dinaikan ke state Game, sehingga Game dapat mengontrol pada data Board untuk me-render giliran sebelumnya dari history
     */

    // state awal untuk komponen Game dalam konstruktor
    constructor(props) {
        super(props)
        this.state= {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber+1)
        const current = history[history.length-1]
        
        // immutability :
        // squares tidak diubah secara langsung, namun di copy dari data utama
        const squares = current.squares.slice()
        // break method handleClick() (mengabaikan click) jika square sudah bernilai atau sudah ada pemenang
        if (squares[i] || calculateWinner(squares)) {
            return
        }
        // mengisi square pada i dengan X atau O
        squares[i] = this.state.xIsNext ? 'X' : 'O'     
        this.setState({ 
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,   
            // membalikan state dari X atau O ke posisi sebaliknya
            xIsNext: !this.state.xIsNext,
        })
    }

    jumpTo(step){
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        })
    }

    render() {
        const history = this.state.history
        const current = history[this.state.stepNumber]
        const winner = calculateWinner(current.squares)

        const moves = history.map( (step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start'
            return (
                // harus punya key pada react ketika membuat list dinamik
                <li key={move}>
                    <button onClick={()=> this.jumpTo(move)}>{desc}
                    </button>
                </li>
            )
        })

        let status
        if (winner) {
            status = 'Winner: ' + winner
        } else {
            status = 'Next Player: ' + (this.state.xIsNext? 'X' : 'O')
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        )
    }
}

// ==============================

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<Game />)