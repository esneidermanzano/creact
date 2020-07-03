import React from 'react';
import Menu from './components/MenuComponent'
import logo from './logo.svg';
import {Navbar, Nav, NavbarBrand} from 'reactstrap';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar dark color='primary'>
        <div className='container'>
          <NavbarBrand href="/"> Ristorante confusion</NavbarBrand>
        </div>
      </Navbar>
      <Menu/>
    </div>
  );
}

export default App;
