import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions';
class LandingPage extends Component {

  componentDidMount(){
    this.props.getCats();
  }

  render(){
    console.log(this.props.catsInfo)
    return(
      <div>
      </div>
    )
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchCatsData: dispatch(getCats()),
//     fetchDogsData: dispatch(getDogs())
//   };
// };

const mapStateToProps = (state) => {
  return {
    catsInfo: state.cat.data,
    dogsInfo: state.dog.data
  }
}

export default connect(mapStateToProps, actions)(LandingPage)


