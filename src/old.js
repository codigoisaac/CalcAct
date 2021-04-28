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
