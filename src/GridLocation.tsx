import * as React from "react";
import * as ReactDataGrid from "react-data-grid";

interface MoveInfo {
  type: string;
  canMove: boolean;
}

export interface ReturnInfo {
  text: string;
  moveUp: MoveInfo;
  moveDown: MoveInfo;
  moveRight: MoveInfo;
  moveLeft: MoveInfo;
}

interface gridData {
  returnInfo: ReturnInfo;
  viewerType: number;
}

export default class GridLocation extends React.Component<gridData, any> {
  _columns: Array<{ key: string; name: string }> = [
    { key: "dir", name: "Direction" },
    { key: "type", name: "Type" },
    { key: "walk", name: "Walkable" }
  ];

  _rows: Array<{ dir: string; type: string; walk: string }> = [
    { dir: "-", type: "-", walk: "" },
    { dir: "-", type: "-", walk: "" },
    { dir: "-", type: "-", walk: "" },
    { dir: "-", type: "-", walk: "" }
  ];

  createRows(data: ReturnInfo) {
    this._rows = [];
    this._rows.push({
      dir: "Down",
      type: data.moveDown.type,
      walk: this.getWalkable(data.moveDown.canMove)
    });
    this._rows.push({
      dir: "Right",
      type: data.moveRight.type,
      walk: this.getWalkable(data.moveRight.canMove)
    });
    this._rows.push({
      dir: "Up",
      type: data.moveUp.type,
      walk: this.getWalkable(data.moveUp.canMove)
    });
    this._rows.push({
      dir: "Left",
      type: data.moveLeft.type,
      walk: this.getWalkable(data.moveLeft.canMove)
    });
  }

  getWalkable(canMove: boolean): string {
    if (canMove) {
      return "Yes";
    } else {
      return "No";
    }
  }

  rowGetter = (i: number) => {
    return this._rows[i];
  };

  render() {
    {
      const { returnInfo } = this.props;
      this.createRows(returnInfo);

      var grid;

      if (this._rows) {
        grid = (
          <ReactDataGrid
            columns={this._columns}
            rowGetter={this.rowGetter}
            rowsCount={this._rows.length}
          />
        );
      }
      return (
        <div>
          <h1>{returnInfo.text}</h1>
          {grid}
        </div>
      );
    }
  }
}
