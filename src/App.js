import './App.css';
import Homepage from './components/Homepage';
import Landing from './components/Landing';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Analytics from './components/Analytics';
import store from './store'
import { Provider } from 'react-redux';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <Router>
        <Routes>
      <Route path="/" Component={Landing}/>
      <Route path="/login" Component={Login}/>
      <Route exact path='/signup' Component={SignUp}/>
      <Route exact path='/Analytics' Component={Analytics} />
      <Route path='/Homepage' Component={Homepage} />
      </Routes>
      </Router>
      </Provider>
    </div>
  );
}

export default App;
