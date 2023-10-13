import logo from "@/assets/logo.svg";
import toggleBtn from "@/assets/toggleBtn.svg";
import toggleBtnClose from "@/assets/toggleBtnClose.svg";
import styled from "@/styles/nav.module.sass";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useMediaQuery from "@/hooks/useMediaQuery";
const navLinks = [
  { to: "/1", title: "使用說明" },
  { to: "/2", title: "收費方式" },
  { to: "/", title: "站點資訊" },
  { to: "/3", title: "最新消息" },
  { to: "/4", title: "活動專區" },
];
export default function Nav() {
  const [toggleNav, setToggleNav] = useState(false);
  const handleToggleNav = () => {
    setToggleNav((prev) => !prev);
  };
  /* 解決手機板開啟navbar後啟動hidden而resize到500px上body依然會hidden */
  const isMobile = useMediaQuery("(max-width: 500px)");

  useEffect(() => {
    if (toggleNav && isMobile) {
      document.querySelector("body")!.style.overflow = "hidden";
    } else document.querySelector("body")!.style.overflow = "auto";

    return () => {
      document.querySelector("body")!.style.overflow = "auto";
    };
  }, [toggleNav, isMobile]);

  return (
    <div className={`${styled["navbar-container"]}`}>
      <Link to="/" className={`${styled["logo"]}`}>
        <img src={logo} />
      </Link>
      <nav
        className={`${styled["navbar-links-wrapper"]} ${
          toggleNav ? styled["toggle-button-open"] : ""
        }`}
      >
        <ul>
          {navLinks.map(({ to, title }) => {
            return (
              <li key={title}>
                <NavLink to={to}>{title}</NavLink>
              </li>
            );
          })}
        </ul>
        <div className={`${styled["login-block"]}`}>
          <button>登入</button>
        </div>
      </nav>
      <button
        className={`${styled["toggle-button"]}`}
        onClick={handleToggleNav}
      >
        {toggleNav ? (
          <img src={toggleBtnClose} alt="toggleBtnClose" />
        ) : (
          <img src={toggleBtn} alt="toggleBtnOpen" />
        )}
      </button>
    </div>
  );
}
