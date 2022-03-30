import React, { Component } from "react";
import { WhatsAppOutlined } from "@ant-design/icons";

import { connect } from "react-redux";

class Whatsapp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: true,
      query: "",
      statusLogin: false,
      name: "",
      picture: {},
      referido: {},
    };
  }

  render() {
    return (
      <div>
        {" "}
        <a
          href="https://wa.me/56978542618?"
          className="whatsapp_float"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="iconotrasnpare">
            <WhatsAppOutlined />
          </i>
        </a>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({});

Whatsapp = connect(mapDispatchToProps, null)(Whatsapp);

export default Whatsapp;
