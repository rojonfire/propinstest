import React from "react";

export class Layout extends React.Component {
  static displayName = Layout.name;

  render() {
    return this.props.children;
  }
}
