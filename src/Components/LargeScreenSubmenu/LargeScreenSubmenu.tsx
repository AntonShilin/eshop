import * as React from "react";
import submenu from "./LargeScreenSubmenu.module.scss";
import { NavLink } from "react-router-dom";
import SearchPanel from "./SearchPanel/SearchPanel";

export interface ISubmenuProps {}

export interface State {}

class LargeScreenSubmenu extends React.Component<ISubmenuProps, State> {
  render() {
    return (
      <div className={`container-xl ${submenu.rootmenu} d-none d-lg-block`}>
        <div className="row">
          <div className="col">
            <NavLink to="#">Fable</NavLink>
          </div>
          <div className="col">
            <NavLink to="#">Biography</NavLink>
          </div>
          <div className="col">
            <NavLink to="#">c</NavLink>
          </div>
          <div className="col">
            <NavLink to="#">supreme</NavLink>
          </div>
          <div className="col">
            <NavLink to="#">apparel</NavLink>
          </div>
          <div className="col">
            <NavLink to="#">accessories</NavLink>
          </div>
          <div className="col">
            <NavLink to="#">new arival</NavLink>
          </div>
          <div className="col">
            <NavLink to="#">gift cards</NavLink>
          </div>
          <div className="col">
            <NavLink to="#">shop all</NavLink>
          </div>
          <div className="col">
            <SearchPanel />
          </div>
        </div>
      </div>
    );
  }
}

export default LargeScreenSubmenu;
