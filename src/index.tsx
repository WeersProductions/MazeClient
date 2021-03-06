import * as React from "react";
import { render } from "react-dom";
import GridLocation, { ReturnInfo } from "./GridLocation";
import styled from "react-emotion";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const MoveButton = styled("button")`
  padding: 5px;
  margin: 5px;
  background-image: linear-gradient(-45deg, #a23923, #ee5838);
  color: white;
  font-size: 1.2rem;
  display: inline-block;
  border-radius: 7px;
  align-items: center;
  text-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  border-style: none;
`;

interface State {
  x: number;
  y: number;
  tileData: ReturnInfo;
  started: boolean;
}

export default class App extends React.Component<{}, State> {
  state = {
    x: 0,
    y: 0,
    tileData: {
      text: "asdf",
      moveUp: { canMove: true, type: "empty" },
      moveDown: { canMove: true, type: "empty" },
      moveLeft: { canMove: true, type: "empty" },
      moveRight: { canMove: true, type: "empty" }
    },
    started: false
  };

  version = 0;

  buttonClick(deltaX: number, deltaY: number) {
    this.setState(
      {
        x: this.state.x + deltaX,
        y: this.state.y + deltaY,
        started: true
      },
      () => {
        var url: string =
          "https://iapandora.nl/maze/api/" + this.state.x + "/" + this.state.y;

        this.version++;
        this.get(url, this.version);
      }
    );
  }

  async get(url: string, version: number) {
    const data = await fetch(url).then(x => x.json());

    if (this.version === version) {
      this.setState({
        tileData: data
      });
    }
  }

  render() {
    var result;
    if (this.state.started) {
      result = (
        <div>
          <GridLocation
            {...{
              returnInfo: this.state.tileData
            }}
          />
          <MoveButton onClick={e => this.buttonClick(-1, 0)}>Left</MoveButton>
          <MoveButton onClick={e => this.buttonClick(1, 0)}>Right</MoveButton>
          <MoveButton onClick={e => this.buttonClick(0, 1)}>Up</MoveButton>
          <MoveButton onClick={e => this.buttonClick(0, -1)}>Down</MoveButton>
        </div>
      );
    } else {
      result = (
        <div>
          <MoveButton onClick={e => this.buttonClick(0, 0)}>Start</MoveButton>
        </div>
      );
    }
    return <div style={styles}>{result}</div>;
  }
}

render(<App />, document.getElementById("root"));
