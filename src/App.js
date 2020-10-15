import React, { Component } from 'react';
import Authentication from './container/Authentication/Authentication'
import { Route, Switch,Redirect } from 'react-router-dom';
import Panel from './container/Panel/Panel'
import Manager from './container/Manager/Manager'
import { connect } from 'react-redux';
import Mamad from './mamad'

class App extends Component {

  render() {
        // let url = '../../../../../../assets/Sounds/wind.mp3';
        // let audio = new Audio(url);
        // audio.play();
    console.log(this.props.isAuthenticated)
    let result = null;
    if (this.props.isAuthenticated) {
      result = (
              <div>
        <Switch> 
          <Route path="/panel" component={Panel} />
          <Route path="/manager" component={Manager} /> 
          <Redirect to="/panel" />
        </Switch>  
     </div>
      )

    }

    else {
      result = (
                <Switch> 
          <Route path="/" exact component={Authentication} />
          <Redirect to="/" />
        </Switch>  
      )
    }

    return (
      <div>
{result}
     </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  };
};
export default connect(mapStateToProps, null)(App);
