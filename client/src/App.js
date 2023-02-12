import './App.css';
import {  Route, Switch, BrowserRouter } from 'react-router-dom';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Form from './pages/Form';
import Error from './pages/Error';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Switch>
            <Route exact path={"/"}>
              <Landing></Landing>
            </Route>
            <Route exact path={'/home'}>
              <Home></Home>
            </Route>
            <Route exact path={"/detail/:id"}>
              <Detail></Detail>
            </Route>
            <Route exact path={'/create'}>
              <Form/>
            </Route>
            <Route path={"*"}>
              <Error/>
            </Route>
          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
