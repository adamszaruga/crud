import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import Targets from './Components/Targets';
import Contacts from './Components/Contacts';

import TargetsQuery from './HOCs/TargetsQuery';
import ContactsQuery from './HOCs/ContactsQuery';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container-fluid">
          <div className="row">
            <Sidebar />

            <main role="main" className="col-md-10 ml-sm-auto col-lg-10 px-4">
              <Switch>
                <Route exact path="/" render={() => <TargetsQuery Child={Targets} />} />
                <Route path="/targets" render={() => <TargetsQuery Child={Targets} />} />
                <Route path="/contacts" render={() => <ContactsQuery Child={Contacts} />} />
              </Switch>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
