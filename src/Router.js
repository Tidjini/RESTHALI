import React from "react";
import { Scene, Stack, Actions, Router } from "react-native-router-flux";

import Start from "./scenes/start";
import Main from "./scenes/main";
import Details from "./scenes/details";

const RouterComponent = () => {
  return (
    <Router>
      <Stack key="root">
        <Scene key="StartStack" hideNavBar>
          <Scene key="start" component={Start} hideNavBar />
          <Scene key="main" component={Main} hideNavBar />
          <Scene key="details" component={Details} hideNavBar />
        </Scene>
      </Stack>
    </Router>
  );
};

export default RouterComponent;
