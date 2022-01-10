import React, { Component } from "react";
import { css } from "@emotion/react";
import { MoonLoader } from 'react-spinners'

export default class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      override: css`
        margin: 0 auto;
      `,
    };
  }
  render() {
    return (
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.4)",
          position: "fixed",
          height: "100vh",
          width: "100vw",
          zIndex: "1",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 0,
          margin: 0,
          top: 0,
          left: 0,
        }}
      >
        <MoonLoader color={"red"} loading={this.props.loading || true} css={this.state.override} size={40} />
      </div>
    );
  }
}
