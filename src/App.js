import "./index.css";
import React from "react";

const nums = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0],
  ops = ["/", "*", "-", "+", "="],
  opIds = ["divide", "multiply", "subtract", "add", "equals"];

class App extends React.Component {
  state = {
    currentNumber: "0",
    store: undefined,
    operation: undefined,
    lastPressed: undefined,
  };

  onClick = (e) => {
    const { store, currentNumber, lastPressed } = this.state,
      { innerText } = e.target;

    switch (innerText) {
      case "C":
        this.setState({
          currentNumber: "0",
          store: undefined,
        });
        break;

      case "=":
        const evaluated = eval(store);
        this.setState({ currentNumber: evaluated, store: evaluated });
        break;

      default:
        if (nums.includes(innerText)) {
          // pressed a number
        } else {
          // pressed a operator
          if (ops.includes(lastPressed)) {
            // last pressed was already an operator
            this.setState({
              currentNumber: currentNumber.slice(0, -1),
            });
            alert("last = op");
          } else {
            // last pressed was a number
          }
        }
      // const actual =
      //   currentNumber === "0" ? innerText : currentNumber + innerText;
      // this.setState({
      //   store: actual,
      //   currentNumber: actual,
      //   lastPressed: innerText,
      // });
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
              className={`number ${num === 0 && "big-h"}`}
              onClick={this.onClick}
              key={num}
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
