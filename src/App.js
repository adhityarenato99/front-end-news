// import react router dom
import React from 'react';

// import react router dom
import { Switch, Route } from 'react-router-dom';

// import Component Register
import Register from './pages/Register';

// import Component Login
import Login from './pages/Login';

// Import Main Componet
import Index from './pages/Index';

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/dashboard" component={Index} />
      </Switch>
    </div>
  );
}

export default App;