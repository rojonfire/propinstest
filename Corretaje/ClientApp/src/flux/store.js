import { EventEmitter } from "events";

import Dispatcher from "./dispatcher";
import Constants from "./constants";
import getSidebarNavItems from "../data/sidebar-nav-items";

class Store extends EventEmitter {
  constructor(props) {
    super(props);

    let user = JSON.parse(localStorage.getItem("user"));

    let navItems = getSidebarNavItems();

    let _store = {
      menuVisible: false,
      navItems: navItems,
    }; 

    if (user) {
      if (user.tipoCuenta === 0) {
        this.state = {
          menuVisible: false,
          navItems: navItems,
        };
      } else {
        let menusPermitidos = [];
        navItems.map((menu) => {
          if (menu.perfiles.includes(user.tipoCuenta)) {
            menusPermitidos.push(menu);
          }
        });
        _store = {
          menuVisible: false,
          navItems: menusPermitidos,
        };
      }
    }

    this.state = {
      _store: _store
    }

    this.registerToActions = this.registerToActions.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);

    Dispatcher.register(this.registerToActions.bind(this));
  }

  registerToActions({ actionType, payload }) {
    switch (actionType) {
      case Constants.TOGGLE_SIDEBAR:
        this.toggleSidebar();
        break;
      default:
    }
  }

  toggleSidebar() {
    const {_store} = this.state;
    _store.menuVisible = !_store.menuVisible;
    this.emit(Constants.CHANGE);
  }

  getMenuState() {
    const {_store} = this.state;    
    return _store.menuVisible;
  }

  getSidebarItems(tipoCuenta) {
    const {_store} = this.state;
    let user = JSON.parse(localStorage.getItem("user"));

    if (!user){
      this.forceUpdate();
    }

    let navItems = getSidebarNavItems(tipoCuenta ? tipoCuenta : user.tipoCuenta);
    
    let store = {
      menuVisible: false,
      navItems: navItems,
    }; 

    if (user) {
      if (user.tipoCuenta === 0) {
        this.state = {
          menuVisible: false,
          navItems: navItems,
        };
      } else {
        let menusPermitidos = [];
        navItems.map((menu) => {
          if (menu.perfiles.includes(user.tipoCuenta)) {
            menusPermitidos.push(menu);
          }
        });
        store = {
          menuVisible: false,
          navItems: menusPermitidos,
        };
      }
    }
    return store.navItems;
  }

  addChangeListener(callback) {
    this.on(Constants.CHANGE, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(Constants.CHANGE, callback);
  }
}

export default new Store();
