import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'; 
import green from '@material-ui/core/colors/green';

import Layout from './containers/Layout/Layout';
import Logout from './components/Auth/Logout/Logout';
import MySquads from './containers/MySquads/MySquads';

import Spinner from './components/UI/Spinner/Spinner';

const SignIn = React.lazy(() => {
  return import('./containers/SignIn/SignIn');
});

const SquadBuilder = React.lazy(() => {
  return import('./containers/SquadBuilder/SquadBuilder');
});

const theme = createMuiTheme({
  palette: {
     primary: {
       main: green[800]
     }
  },
  typography: {
    useNextVariants: true,
  }
});

const App = props => {

  let switchBlock = <Switch>
                      <Route path="/sign-in" render={props => <SignIn {...props} />} />
                      <Route path="/" exact component={SquadBuilder} />
                      <Redirect to="/" />
                    </Switch>;

  if(props.isAuth) {
    switchBlock = <Switch>
                    <Route path="/logout" exact component={Logout} />
                    <Route path="/my-squads" exact component={MySquads} />
                    <Route path="/" exact component={SquadBuilder} />
                    <Redirect to="/" />
                  </Switch>;
  }

  return (
    <>
    <MuiThemeProvider theme = { theme }>
      <BrowserRouter basename="/squad-builder">
        <Layout>
          <Suspense fallback={<Spinner />}>
              { switchBlock }
          </Suspense>
        </Layout>
      </BrowserRouter>
    </MuiThemeProvider>
    </>
  );
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(App);