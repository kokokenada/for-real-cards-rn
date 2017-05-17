import React, {Component, PropTypes} from 'react';
import {TabNavigator, addNavigationHelpers, StackNavigator} from 'react-navigation'
import {AppNavigator} from './router';
import {NavigationActions} from './navigation-actions';
import {NAVIGATE_PACKAGE_NAME} from './navigation-package';
import {connect} from 'react-redux';

interface Props {
  dispatch: any,
  nav: any
}
interface State {
}
/*  Hmm.  My TypeScript JavaScript knowledhe has been exceeded.  Why isn't this the same as the JavaScript below?
export class AppWithNavigationState extends Component<Props, State> {
  dispatch;
  nav;

  constructor({dispatch, nav}) {
    super();
    console.log('constructor')
    console.log(arguments)
    this.dispatch = dispatch;
    this.nav = nav;

  }

  render() {
    return (
      <AppNavigator navigation={addNavigationHelpers({dispatch: this.dispatch, state: this.nav})}/>
    );
  }
}
*/

const AppWithNavigationState: any = ({dispatch, nav}) => (
  <AppNavigator navigation={addNavigationHelpers({dispatch, state: nav})}/>
);
AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return ({
    nav: state[NAVIGATE_PACKAGE_NAME],
  });
};

export default connect(mapStateToProps)(AppWithNavigationState);
