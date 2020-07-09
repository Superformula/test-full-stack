/* eslint-disable */
import React, { Component } from "react";
import PropTypes from "prop-types";

// copied from past project

export default class ExteriorClickWrapper extends Component {
  constructor(props) {
    super(props);

    this.set_wrapper_ref = this.set_wrapper_ref.bind(this);
    this.handle_exterior_click = this.handle_exterior_click.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handle_exterior_click);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handle_exterior_click);
  }

  set_wrapper_ref(node) {
    this.wrapperRef = node;
  }

  handle_exterior_click(e) {
    const { exterior_click_handler } = this.props;

    if (
      this.wrapperRef &&
      !this.wrapperRef.contains(e.target) &&
      typeof exterior_click_handler === "function"
    ) {
      exterior_click_handler(e);
    }
  }

  render() {
    const props_without_handler = {
      ...this.props,
      exterior_click_handler: undefined,
    };

    return (
      <div
        ref={this.set_wrapper_ref}
        style={{ display: "inline-block" }}
        {...props_without_handler}
      >
        {this.props.children}
      </div>
    );
  }
}

ExteriorClickWrapper.propTypes = {
  exterior_click_handler: PropTypes.func.isRequired,
};
