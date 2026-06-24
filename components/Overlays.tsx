"use client";

import React from "react";
import { NAV_ITEMS, NAV_TARGETS, scrollToSection } from "../lib/api";
import { IconClose, IconUpload, IconLogout } from "./icons";

export function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-title">Main Menu</div>
        <nav className="sheet-menu">
          {NAV_ITEMS.map((item) => {
            const target = NAV_TARGETS[item];
            return (
              <a
                key={item}
                href={target ? `#${target}` : "#"}
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                  if (target) scrollToSection(target);
                }}
              >
                {item}
              </a>
            );
          })}
        </nav>
      </div>
      <button className="overlay-close" onClick={onClose} aria-label="Tutup">
        <IconClose />
      </button>
    </div>
  );
}

export function ProfileMenu({
  onClose,
  avatar,
  name,
  role,
}: {
  onClose: () => void;
  avatar?: string;
  name?: string;
  role?: string;
}) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="profile-head">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="pavatar"
            src={avatar || "https://dummyjson.com/icon/waseem/120"}
            alt={name || "User"}
          />
          <h3>{name || " "}</h3>
          <p>{role || " "}</p>
          <button className="btn-start-upload">
            <IconUpload width={20} height={20} /> Start Upload
          </button>
        </div>
        <nav className="sheet-menu">
          <a href="#" onClick={(e) => { e.preventDefault(); onClose(); }}>
            My Profile
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); onClose(); }}>
            Edit Profile
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); onClose(); }}>
            Security
          </a>
        </nav>
        <div className="sheet-logout">
          Log Out <IconLogout />
        </div>
      </div>
      <button className="overlay-close" onClick={onClose} aria-label="Tutup">
        <IconClose />
      </button>
    </div>
  );
}
