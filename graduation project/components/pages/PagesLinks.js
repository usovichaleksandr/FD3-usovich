import React from 'react';
import { NavLink } from 'react-router-dom';

import './PagesLinks.css';



class PagesLinks extends React.Component {
          
  render() {

    return (
      <div>
        <NavLink to="/" className={obj => ("PageLink"+(obj.isActive?" ActivePageLink":""))}>Главная</NavLink>
        <NavLink to="/fullMuviesList" className={obj => ("PageLink"+(obj.isActive?" ActivePageLink":""))}>Все фильмы</NavLink>
        <NavLink to="/firstMuviesList" className={obj => ("PageLink"+(obj.isActive?" ActivePageLink":""))}>Страница 1</NavLink>
        <NavLink to="/SecondMuviesList" className={obj => ("PageLink"+(obj.isActive?" ActivePageLink":""))}>Страница 2</NavLink>
        <NavLink to="/Ratig" className={obj => ("PageLink"+(obj.isActive?" ActivePageLink":""))}>топ 10 </NavLink>
      </div>
    );
    
  }

}
    
export default PagesLinks;
