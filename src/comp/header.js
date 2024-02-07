import React from "react";
import "./Header.css";
import "./theme.css";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/confing";
import { getAuth, signOut } from "firebase/auth";
import { useTranslation } from 'react-i18next';
const Header = () => {
  const [user, loading, error] = useAuthState(auth);
  const { theme, changeTheme } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();
  return (
    <div>
      <header className={`hide-when-mobile`}>
        <h1>
          <Link to="/">Courses 4 Arab</Link>
        </h1>

        <button
          onClick={() => {
            changeTheme(theme === "light" ? "dark" : "light");
          }}
          className="themeBtn"
        >
          {theme}
        </button>

        <ul className="flex">
          <li className="main-list lang">
            <p>languaga</p>
            <ul className="lang-box">
              <li
              onClick={() => {
                i18n.changeLanguage("ar")
              }}
                className="flex"
                style={{ justifyContent: "space-between" }}
                dir="rtl "
              >
                {i18n.language === "ar" && <i className="fa-solid fa-check"></i>}
                <p>العربية</p>
              </li>
              <li   onClick={() => {
                i18n.changeLanguage("en")
              }} className="flex">
                <p>ُEnglish</p>
                {i18n.language === "en" && <i className="fa-solid fa-check"></i>}
              </li>
              <li   onClick={() => {
                i18n.changeLanguage("fr")
              }} className="flex">
                <p>french</p>
                {i18n.language === "fr" && <i className="fa-solid fa-check"></i>}

              </li>
            </ul>
          </li>

          {!user && (
            <li className="main-list">
              <NavLink className="main-link" to="/SingIn">
                Sign-in
              </NavLink>
            </li>
          )}

          {!user && (
            <li className="main-list">
              <NavLink className="main-link" to="/SingUp">
                Sign-up
              </NavLink>
            </li>
          )}

          {user && (
            <li className="main-list">
              <NavLink
                onClick={() => {
                  signOut(auth)
                    .then(() => {
                      // Sign-out successful.
                    })
                    .catch((error) => {
                      // An error happened.
                    });
                }}
                className="main-link"
              >
                {t("Sign-out")}
              </NavLink>
            </li>
          )}

          {user && (
            <li className="main-list">
              <NavLink className="main-link" to="/Html">
                HTML
              </NavLink>
            </li>
          )}

          {user && (
            <li className="main-list">
              <NavLink className="main-link" to="/Javascript">
                profile
              </NavLink>
            </li>
          )}
        </ul>
      </header>

      <header className="show-when-mobile">
        <Link to="/">
          <h1>Courses 4 Arab</h1>
        </Link>
        <label className="absolute" htmlFor="burger">
          <i className="fas fa-bars" />
        </label>
        <input id="burger" type="checkbox" />
        <div className="show-on-click">
          <div className="main-div">
            <label htmlFor="html">
              <NavLink to="/Html">
                HTML <i className="fas fa-plus" />
              </NavLink>
            </label>
            <input id="html" type="checkbox" />
            <ul className="sub-div">
              <li>
                <a href="">Full Course</a>
              </li>
              <li>
                <a href="">Crash Course</a>
              </li>
              <li>
                <a href="">learn in 1h</a>
              </li>
            </ul>
          </div>
          <div className="main-div">
            <label htmlFor="sing">
              <NavLink to="/SingUp">
                Sing Up <i className="fas fa-plus" />
              </NavLink>
            </label>
          </div>
          <div className="main-div">
            <label htmlFor="sing">
              <NavLink to="/SingIn">
                Sing In <i className="fas fa-plus" />
              </NavLink>
            </label>
          </div>
          <div className="main-div">
            <label htmlFor="js">
              <NavLink to="/Javascript">
                Javascript <i className="fas fa-plus" />
              </NavLink>
            </label>
            <input id="js" type="checkbox" />
            <ul className="sub-div">
              <li>
                <a href="#">coming soon🔥</a>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
