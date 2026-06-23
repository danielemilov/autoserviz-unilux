import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./Header.css";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const menuButtonRef = useRef(null);

  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [headerIsScrolled, setHeaderIsScrolled] = useState(false);

  const homeIsActive =
    location.pathname === "/" &&
    location.hash !== "#contacts";

  const contactsAreActive =
    location.pathname === "/" &&
    location.hash === "#contacts";

  const closeMenu = useCallback(() => {
    setMenuIsOpen(false);
  }, []);

  const scrollToTop = useCallback((behavior = "smooth") => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          behavior,
        });
      });
    });
  }, []);

  const scrollToContacts = useCallback((behavior = "smooth") => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const contactsSection = document.getElementById("contacts");

        if (!contactsSection) {
          return;
        }

        const header = document.querySelector(".site-header");
        const headerHeight =
          header?.getBoundingClientRect().height ?? 0;

        const targetPosition =
          contactsSection.getBoundingClientRect().top +
          window.scrollY -
          headerHeight -
          14;

        window.scrollTo({
          top: Math.max(0, targetPosition),
          behavior,
        });
      });
    });
  }, []);

  const handleHomeClick = useCallback(
    (event) => {
      event.preventDefault();

      closeMenu();

      const alreadyOnHome =
        location.pathname === "/" &&
        location.hash === "";

      if (!alreadyOnHome) {
        navigate("/");
      }

      scrollToTop();
    },
    [
      closeMenu,
      location.hash,
      location.pathname,
      navigate,
      scrollToTop,
    ],
  );

  const handleContactsClick = useCallback(
    (event) => {
      closeMenu();

      const alreadyOnContacts =
        location.pathname === "/" &&
        location.hash === "#contacts";

      if (alreadyOnContacts) {
        event.preventDefault();
        scrollToContacts();
      }
    },
    [
      closeMenu,
      location.hash,
      location.pathname,
      scrollToContacts,
    ],
  );

  const toggleMenu = () => {
    setMenuIsOpen((currentValue) => !currentValue);
  };

  useEffect(() => {
    let animationFrame = null;

    const updateScrolledState = () => {
      animationFrame = null;
      setHeaderIsScrolled(window.scrollY > 14);
    };

    const handleScroll = () => {
      if (animationFrame !== null) {
        return;
      }

      animationFrame = requestAnimationFrame(updateScrolledState);
    };

    updateScrolledState();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  useEffect(() => {
    closeMenu();

    if (location.hash === "#contacts") {
      scrollToContacts();
    }
  }, [
    closeMenu,
    location.hash,
    location.pathname,
    scrollToContacts,
  ]);

  useEffect(() => {
    if (!menuIsOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const previousOverscrollBehavior =
      document.body.style.overscrollBehavior;

    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.overscrollBehavior =
        previousOverscrollBehavior;
    };
  }, [menuIsOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && menuIsOpen) {
        closeMenu();

        requestAnimationFrame(() => {
          menuButtonRef.current?.focus();
        });
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 780) {
        closeMenu();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [closeMenu, menuIsOpen]);

  return (
    <header
      className={[
        "site-header",
        headerIsScrolled ? "site-header--scrolled" : "",
        menuIsOpen ? "site-header--menu-open" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="page-width site-header__inner">
        <Link
          className="site-brand"
          to="/"
          aria-label="Автосервиз UNILUX — начална страница"
          onClick={handleHomeClick}
        >
          <span
            className="site-brand__accent"
            aria-hidden="true"
          />

          <span className="site-brand__mark">
            <img
              src="/unilux-logo.jpg"
              alt=""
              draggable="false"
            />
          </span>

          <span className="site-brand__wordmark">
            <strong>UNILUX</strong>
            <small>АВТОСЕРВИЗ</small>
          </span>
        </Link>

        <button
          ref={menuButtonRef}
          className="site-header__menu-button"
          type="button"
          aria-controls="primary-navigation"
          aria-expanded={menuIsOpen}
          aria-label={
            menuIsOpen
              ? "Затвори основното меню"
              : "Отвори основното меню"
          }
          onClick={toggleMenu}
        >
          <span className="site-header__menu-label">
            {menuIsOpen ? "Затвори" : "Меню"}
          </span>

          <span
            className="site-header__menu-icon"
            aria-hidden="true"
          >
            <span />
            <span />
          </span>
        </button>

        <nav
          id="primary-navigation"
          className={[
            "site-nav",
            menuIsOpen ? "site-nav--open" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-label="Основна навигация"
        >
          <div className="site-nav__content">
            <ul className="site-nav__list">
              <li className="site-nav__item">
                <Link
                  className={[
                    "site-nav__link",
                    homeIsActive ? "is-active" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  to="/"
                  aria-current={homeIsActive ? "page" : undefined}
                  onClick={handleHomeClick}
                >
                  <span className="site-nav__text">
                    Начало
                  </span>
                </Link>
              </li>

              <li className="site-nav__item">
                <NavLink
                  className={({ isActive }) =>
                    [
                      "site-nav__link",
                      isActive ? "is-active" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")
                  }
                  to="/services"
                  onClick={closeMenu}
                >
                  <span className="site-nav__text">
                    Услуги
                  </span>
                </NavLink>
              </li>

              <li className="site-nav__item">
                <Link
                  className={[
                    "site-nav__link",
                    contactsAreActive ? "is-active" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  to="/#contacts"
                  aria-current={
                    contactsAreActive ? "location" : undefined
                  }
                  onClick={handleContactsClick}
                >
                  <span className="site-nav__text">
                    Контакти
                  </span>
                </Link>
              </li>
            </ul>

            <div className="site-nav__mobile-foot">
              <span className="site-nav__mobile-line" />

              <div>
                <strong>Автосервиз UNILUX</strong>
                <small>Ремонт · Диагностика · Поддръжка</small>
              </div>
            </div>
          </div>

          <span
            className="site-nav__ghost"
            aria-hidden="true"
          >
            UNILUX
          </span>
        </nav>
      </div>
    </header>
  );
}