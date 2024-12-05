import React, { useState } from "react";
import { data } from "../restApi.json";
import { Link as RouterLink } from "react-router-dom"; // Импортируем Link из react-router-dom
import { Link as ScrollLink } from "react-scroll"; // Импортируем Link из react-scroll

const Navbar = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <nav>
        <div className="logo">A_FOOD</div>
        <div className={show ? "navLinks showmenu" : "navLinks"}>
          <div className="links">
            {data[0].navbarLinks.map((element) => {
              // Условие для ссылки "REVIEWS"
              if (element.link === "comments") {
                return (
                  <RouterLink
                    to={`/${element.link}`} // Используем react-router-dom для "REVIEWS"
                    key={element.id}
                  >
                    {element.title}
                  </RouterLink>
                );
              }
              // Остальные ссылки используют react-scroll
              return (
                <ScrollLink
                  to={element.link}
                  spy={true}
                  smooth={true}
                  duration={500}
                  key={element.id}
                >
                  {element.title}
                </ScrollLink>
              );
            })}
          </div>
          <img
            src="/burger_icon.svg"
            alt="burger"
            width="62"
            height="62"
            onClick={() => setShow(!show)} // Для переключения меню
          />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
