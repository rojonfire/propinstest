import React, { Component } from "react";
import icon from '../../utils/images';
import {
  getAllProyectos,
} from "../../action";
import { connect } from "react-redux";
class Home extends Component {
  constructor(props) {
    super(props);    
  } 

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getAllProyectos());
  }
  
  render() {   
    return (
      <div className="wrapper fadeInDown ReactModal__Body--open ">
        <img
                id="main-logo"
                className="d-inline-block align-top mr-1"
                style={{ maxWidth: '80%' }}
                src={icon.logoColor}
                alt="Shards Dashboard"
              />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch: (action) => {
    dispatch(action);
  },
});

Home = connect(
  mapDispatchToProps
)(Home);

export default Home;

