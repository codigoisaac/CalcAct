import "./index.css";
import React from "react";

const nums = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0],
  ops = ["/", "x", "-", "+", "="];

class App extends React.Component {
  state = {
    lastPressed: undefined,
    currentNumber: "0",
    prevNumber: undefined,
  };

  onClick = (e) => {
    const { innerText } = e.target,
      { lastPressed, currentNumber, prevNumber } = this.state;

    if (!Number.isNaN(Number(innerText))) {
      // if is not a number
      if (currentNumber === "0") {
        this.setState({ currentNumber: innerText });
      } else {
        this.setState({ currentNumber: currentNumber + innerText });
      }
    }

    switch (innerText) {
      case "C":
        this.setState({ currentNumber: "0", prevNumber: undefined });
        break;
    }

    this.setState({ lastPressed: innerText });
  };

  render() {
    const { currentNumber } = this.state;

    return (
      <main>
        <header>{currentNumber}</header>
        <div id="nums-container">
          <button id="clear" onClick={this.onClick}>
            C
          </button>
          {nums.map((num) => (
            <button
              className={`number ${num === 0 && "big-h"}`}
              onClick={this.onClick}
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
            <button className="operator" key={op} onClick={this.onClick}>
              {op}
            </button>
          ))}
        </div>
      </main>
    );
  }
}

export default App;
