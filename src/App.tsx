import React, { Component } from "react";
import "./assets/App.scss";
import Amplify from "aws-amplify";
import Card from "./components/Card";
import aws_exports from "./aws-exports";
import { User } from "./models";
import EditModal from "./components/EditModal";
Amplify.configure(aws_exports);
Amplify.Logger.LOG_LEVEL = "INFO";

class App extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeUser: null,
      modalIsOpen: false,
    };
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };
  
  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  setActiveUser = (user: User) => {
    this.setState({activeUser: user});
    this.openModal();
  };

  render() {
    return (
      <div className="App">
        <div className="App-content">
          <Card 
            activeUser={this.state.activeUser}
            propagateUser={this.setActiveUser} />
          { this.state.activeUser ? <EditModal
            modalIsOpen={this.state.modalIsOpen}
            handleClose={this.closeModal}
            user={this.state.activeUser}
          /> : null }
        </div>
      </div>
    );
  }
}

export default App;
