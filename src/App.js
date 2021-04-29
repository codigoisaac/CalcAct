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
    display: "0",
    showingResult: false,
    canPutDecimal: true,
  };

  onClick = (e) => {
    const { display, showingResult, canPutDecimal } = this.state,
      { innerText } = e.target;

    switch (innerText) {
      case "C": {
        this.setState({
          display: "0",
          showingResult: false,
          canPutDecimal: true,
        });
        break;
      }

      case ".": {
        if (canPutDecimal) {
          this.setState({ display: display + innerText, canPutDecimal: false });
        }
        break;
      }

      case "=": {
        const evaluated = eval(display).toString();
        this.setState({
          display: evaluated,
          showingResult: true,
          canPutDecimal: true,
        });
        break;
      }

      default: {
        if (nums.includes(parseInt(innerText))) {
          // pressed a number
          if (display === "0" || showingResult === true) {
            this.setState({ display: innerText, showingResult: false });
          } else {
            this.setState({ display: display + innerText });
          }
        } else {
          // pressed a operator
          this.setState({ canPutDecimal: true });

          const lastChar = display.slice(-1);

          if (ops.includes(lastChar)) {
            // operator followed by operator
            if (innerText === "-" && lastChar === "-") {
              // subtract after subtract
              if (display.charAt(display.length - 2) !== "-") {
                // penult char is not subtract (not 3 subtracts in a row)
                this.setState({ display: display + innerText });
              }
            } else {
              if (lastChar === "-" && innerText !== "-") {
                // last char is subtract but innertext is not
                this.setState({
                  display: display.slice(0, -2) + innerText,
                });
              } else {
                this.setState({
                  display: display.slice(0, -1) + innerText,
                });
              }
            }
          } else {
            this.setState({ display: display + innerText });
          }

          this.setState({ showingResult: false });
        }
      }
    }
  };

  render() {
    const { display, store } = this.state;

    return (
      <main>
        <small>{store}</small>
        <header id="display">{display}</header>

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
