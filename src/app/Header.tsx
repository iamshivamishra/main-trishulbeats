"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target) &&
        !e.target.closest(".hamburger-btn")
      ) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const headerStyle = {
    width: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1000,
    padding: "15px 20px",
    background: isScrolled ? "#000" : "transparent",
    transition: "0.3s ease",
    boxShadow: isScrolled ? "0 2px 10px rgba(0,0,0,0.4)" : "none",
  };

  const containerStyle = {
    maxWidth: "1300px",
    margin: "auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    fontSize: "1.1rem",
  };

  const hamburgerStyle = {
    background: "none",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    display: "none", // controlled by media queries
  };

  return (
    <>
      <style jsx>{`
        @media (max-width: 900px) {
          .desktop-nav {
            display: none;
          }
          .hamburger-btn {
            display: block !important;
          }
        }

        @media (min-width: 901px) {
          .mobile-nav {
            display: none !important;
          }
        }
      `}</style>

      <header style={headerStyle}>
        <div style={containerStyle}>
          <h1>
            <Link href="/" style={{ color: "#fff", fontSize: "1.7rem", fontWeight: "700" }}>
              Trishul Beats
            </Link>
          </h1>

          {/* Mobile Hamburger */}
          <button
            className="hamburger-btn"
            style={hamburgerStyle}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <IoMdClose size={26} /> : <GiHamburgerMenu size={26} />}
          </button>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <ul style={{ display: "flex", gap: "25px", listStyle: "none", alignItems: "center" }}>
              <li><Link href="/" style={linkStyle}>Home</Link></li>
              <li><Link href="/beatpacks" style={linkStyle}>Beat Packs</Link></li>
              <li><Link href="/contact" style={linkStyle}>Contact</Link></li>
              <li>
                <Link href="/cart" style={{ ...linkStyle, display: "flex", alignItems: "center" }}>
                  <FaShoppingCart size={18} />
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Slide Menu */}
          <nav
            ref={mobileMenuRef}
            className="mobile-nav"
            style={{
              position: "fixed",
              top: 0,
              right: menuOpen ? 0 : "-100%",
              width: "70%",
              height: "100vh",
              background: "#111",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "0.4s ease",
              flexDirection: "column",
              gap: "30px",
              zIndex: 2000,
            }}
          >
            <Link href="/" style={{ ...linkStyle, fontSize: "1.5rem" }} onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="/beatpacks" style={{ ...linkStyle, fontSize: "1.5rem" }} onClick={() => setMenuOpen(false)}>Beat Packs</Link>
            <Link href="/contact" style={{ ...linkStyle, fontSize: "1.5rem" }} onClick={() => setMenuOpen(false)}>Contact</Link>
            <Link href="/cart" style={{ ...linkStyle, fontSize: "1.5rem" }} onClick={() => setMenuOpen(false)}>
              <FaShoppingCart size={22} />
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
