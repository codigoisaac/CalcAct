import "./index.css";
import React from "react";

const nums = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0],
  numIds = [
    "seven",
    "eight",
    "nine",
    "four",
    "five",
    "six",
    "one",
    "two",
    "three",
    "zero",
  ],
  ops = ["/", "*", "-", "+", "="],
  opIds = ["divide", "multiply", "subtract", "add", "equals"];

class App extends React.Component {
  state = {
    currentNumber: "0",
    showingResult: false,
  };

  onClick = (e) => {
    const { currentNumber, showingResult } = this.state,
      { innerText } = e.target;

    switch (innerText) {
      case "C": {
        this.setState({
          currentNumber: "0",
          showingResult: false,
        });
        break;
      }

      case ".": {
        if (!currentNumber.includes(".")) {
          this.setState({ currentNumber: currentNumber + innerText });
        }
        break;
      }

      case "=": {
        const evaluated = eval(currentNumber).toString();
        this.setState({ currentNumber: evaluated, showingResult: true });
        break;
      }

      default: {
        if (nums.includes(parseInt(innerText))) {
          // pressed a number
          if (currentNumber === "0" || showingResult === true) {
            this.setState({ currentNumber: innerText, showingResult: false });
          } else {
            this.setState({ currentNumber: currentNumber + innerText });
          }
        } else {
          // pressed a operator
          if (ops.includes(currentNumber.slice(-1))) {
            // operator followed by operator
            this.setState({
              currentNumber: currentNumber.slice(0, -1) + innerText,
            });
          } else {
            this.setState({ currentNumber: currentNumber + innerText });
          }
          this.setState({ showingResult: false });
        }
      }
    }
  };

  render() {
    const { currentNumber, store } = this.state;

    return (
      <main>
        <small>{store}</small>
        <header id="display">{currentNumber}</header>

        <div id="nums-container">
          <button id="clear" onClick={this.onClick}>
            C
          </button>

          {nums.map((num) => (
            <button
              className={`number${num === 0 ? " big-h" : ""}`}
              onClick={this.onClick}
              key={num}
              id={numIds[nums.indexOf(num)]}
            >
              {num}
            </button>
          ))}

          <button id="decimal" onClick={this.onClick}>
            .
          </button>
        </div>

        <div id="ops-container">
          {ops.map((op) => (
            <button
              id={`${opIds[ops.indexOf(op)]}`}
              className={"operator"}
              key={op}
              onClick={this.onClick}
            >
              {op}
            </button>
          ))}
        </div>
      </main>
    );
  }
}

export default App;
