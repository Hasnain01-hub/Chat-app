import React from "react";
import $ from "jquery";
import { List } from "phosphor-react";

const Nav = () => {
  const menuToggle = () => {
    $("#layout-menu").addClass("menu-open");
  };
  return (
    <>
      {" "}
      <nav
        className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
        id="layout-navbar"
      >
        <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
          <a className="nav-item nav- px-0 me-xl-4" href="#/">
            <List
              size={22}
              onClick={() => {
                menuToggle();
              }}
            />
          </a>
        </div>
        <div
          className="navbar-nav-right d-flex align-items-center"
          id="navbar-collapse"
        >
          <ul className="navbar-nav flex-row align-items-center ms-auto">
            {/* Place this tag where you want the button to render. */}
            <li className="nav-item lh-1 me-3">
              <a
                className="github-button"
                href="#."
                data-icon="octicon-star"
                data-size="large"
                data-show-count="true"
                aria-label="Star themeselection/sneat-html-admin-template-free on GitHub"
              >
                Admin
              </a>
            </li>
            {/* User */}
            <li className="nav-item navbar-dropdown dropdown-user dropdown">
              <a
                className="nav-link dropdown-toggle hide-arrow"
                href="#/;"
                data-bs-toggle="dropdown"
              >
                <div className="avatar avatar-online">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    alt=""
                    className="w-px-40 h-auto rounded-circle"
                  />
                </div>
              </a>
            </li>
            {/*/ User */}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Nav;