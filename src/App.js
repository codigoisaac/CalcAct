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
    const { innerText } = e.target,
      { currentNumber, store, operation } = this.state;

    this.setState({ lastPressed: innerText });

    if (!Number.isNaN(Number(innerText))) {
      // if is a number
      if (currentNumber == "0") {
        this.setState({ currentNumber: innerText });
      } else if (ops.includes(lastPressed)) {
        this.setState({ currentNumber: innerText });
      } else {
        this.setState({ currentNumber: currentNumber + innerText });
      }

      return;
    }

    switch (innerText) {
      case "C":
        this.setState({
          currentNumber: "0",
          store: undefined,
          operation: undefined,
        });
        break;

      case ".":
        !currentNumber.includes(".") &&
          this.setState({ currentNumber: currentNumber + "." });
        break;

      // operations
      default: {
        if (!operation) {
          this.setState({
            operation: innerText,
            store: currentNumber,
            currentNumber: "",
          });
        } else if (innerText === "=") {
          const evaluated = eval(`${store} ${operation} ${currentNumber}`);
          this.setState({
            operation: undefined,
            store: evaluated,
            currentNumber: evaluated,
          });
        } else {
          const evaluated = eval(`${store} ${operation} ${currentNumber}`);
          this.setState({
            operation: innerText,
            store: evaluated,
            currentNumber: evaluated,
          });
        }
      }
    }
  };

  render() {
    const { currentNumber, store, operation } = this.state;

    return (
      <main>
        <small>
          {store} {operation}
        </small>
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
