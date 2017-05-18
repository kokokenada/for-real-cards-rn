import React, {Component, PropTypes} from 'react';
import {TabNavigator, addNavigationHelpers, StackNavigator} from 'react-navigation'
import {AppNavigator} from './router';
import {NAVIGATE_PACKAGE_NAME} from './navigation-package';
import {connect} from 'react-redux';

interface Props {
  dispatch: any,
  nav: any
}
interface State {
}
export class AppWithNavigationState extends Component<Props, State> {

  render() {
    return (
      <AppNavigator navigation={addNavigationHelpers({dispatch: this.props.dispatch, state: this.props.nav})}/>
    );
  }
}

const mapStateToProps = state => {
  return ({
    nav: state[NAVIGATE_PACKAGE_NAME],
  });
};

export default connect(mapStateToProps)(AppWithNavigationState);
