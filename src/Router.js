import React from 'react';
import { Scene, Stack, Actions, Router } from 'react-native-router-flux';

import Start from './scenes/start';
import Main from './scenes/main';

const RouterComponent = () => {
  return (
    <Router>
      <Stack key="root">
        <Scene key="StartStack" hideNavBar>
          <Scene key="start" component={Start} hideNavBar />

          <Scene key="main" component={Main} hideNavBar />
        </Scene>
      </Stack>
    </Router>
  );
};

export default RouterComponent;
