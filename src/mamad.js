import React, { Component } from 'react';
import Authentication from './container/Authentication/Authentication'
import { Route, Switch } from 'react-router-dom';
import Panel from './container/Panel/Panel'
import Manager from './container/Manager/Manager'
import { connect } from 'react-redux';

class Mamad extends Component {

  render() {
    console.log(this.props.registered)
    // if (!this.props.registered)
    //   body = (<Route path="/" exact component={Authentication} />)
    // else
    //   body = (<div>
    //     <Route path="/panel" component={Panel} />
    //     <Route path="/manager" component={Manager} />
    //       </div>)

    return (

        <div>
            <Panel />
            {/* <Route path="/manager" component={Manager} /> */}
            {/* {body} */}
        {/* <Switch> 
          
          <Route path="/" exact component={Authentication} />
          <Route path="/panel" component={Panel} />
          <Route path="/manager" component={Manager} /> 
        </Switch>  */}
     </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    registered: state.registered
  };
};
export default connect(mapStateToProps, null)(Mamad);
