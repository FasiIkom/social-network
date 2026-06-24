"use client";

import React, { useEffect, useState } from "react";
import {
  getVideos,
  getPeople,
  getDocuments,
  getActivity,
  getChannels,
  getCurrentUser,
  NAV_ITEMS,
  NAV_TARGETS,
  scrollToSection,
  CardItem,
  ActivityItem as TActivity,
  CurrentUser,
} from "../lib/api";
import {
  IconMenu,
  IconSearch,
  IconUpload,
  IconArrow,
  IconChat,
  IconHeart,
  IconPlayRing,
  IconFacebook,
  IconTwitter,
  IconLinkedin,
} from "../components/icons";
import { MobileMenu, ProfileMenu } from "../components/Overlays";

function Card({ item, featured }: { item: CardItem; featured?: boolean }) {
  const hasImg = !!item.image;
  return (
    <div className={`card ${featured ? "featured" : ""}`}>
      {hasImg && (
        <div
          className="card-img"
          style={{ backgroundImage: `url(${item.image})` }}
        />
      )}
      <div className="card-body">
        <div className="card-title">{item.title}</div>
        {item.sub && <div className="card-sub">{item.sub}</div>}
        {item.meta && <div className="card-meta">{item.meta}</div>}
      </div>
    </div>
  );
}

function CtaCard({ label }: { label: string }) {
  const [l1, l2] = label.split("|");
  return (
    <div className="card cta">
      <div className="cta-inner">
        <IconPlayRing />
        <b>
          {l1}
          {l2 && (
            <>
              <br />
              {l2}
            </>
          )}
        </b>
      </div>
    </div>
  );
}

function SkeletonCard({ featured }: { featured?: boolean }) {
  return (
    <div
      className={`card skeleton ${featured ? "featured" : ""}`}
      aria-hidden="true"
    />
  );
}

function BigSection({
  id,
  title,
  browse,
  items,
  cta,
  className,
  loading,
}: {
  id: string;
  title: string;
  browse: string;
  items: CardItem[];
  cta: string;
  className?: string;
  loading?: boolean;
}) {
  const featured = items[0];
  const rest = items.slice(1);
  return (
    <section id={id} className={`section ${className || ""}`}>
      <div className="section-head">
        <h2>{title}</h2>
        <a href="#">
          {browse} <IconArrow />
        </a>
      </div>
      <div className="biggrid">
        {loading ? (
          <>
            <SkeletonCard featured />
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </>
        ) : (
          <>
            {featured && <Card item={featured} featured />}
            {rest.map((it) => (
              <Card key={it.id} item={it} />
            ))}
          </>
        )}
        <CtaCard label={cta} />
      </div>
    </section>
  );
}

function ActivitySkeletonRow() {
  return (
    <div className="activity-item" aria-hidden="true">
      <div className="a-thumb skeleton" />
      <div className="sk-lines">
        <div className="sk-line skeleton sk-w-50" />
        <div className="sk-line skeleton sk-w-90" />
        <div className="sk-line skeleton sk-w-30" />
      </div>
    </div>
  );
}

function Activity({
  items,
  loading,
}: {
  items: TActivity[];
  loading?: boolean;
}) {
  return (
    <section className="section s-activity">
      <div className="section-head">
        <h2>Activity</h2>
        <a href="#">View timeline / Filter activities</a>
      </div>
      <div>
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <ActivitySkeletonRow key={i} />
            ))
          : items.map((a) => (
              <div key={a.id} className="activity-item">
                <div className="a-thumb" />
                <div>
                  <div className="a-name">
                    {a.name} <span>{a.action}</span>
                  </div>
                  <div className="a-body">{a.body}</div>
                  <div className="a-time">
                    {a.icon === "chat" ? <IconChat /> : <IconHeart />}
                    {a.time}
                  </div>
                </div>
              </div>
            ))}
      </div>
    </section>
  );
}

export default function Home() {
  const [videos, setVideos] = useState<CardItem[]>([]);
  const [people, setPeople] = useState<CardItem[]>([]);
  const [docs, setDocs] = useState<CardItem[]>([]);
  const [activity, setActivity] = useState<TActivity[]>([]);
  const [channels, setChannels] = useState<string[]>([]);
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [loading, setLoading] = useState({
    videos: true,
    people: true,
    docs: true,
    activity: true,
    channels: true,
  });

  useEffect(() => {
    const done = (key: keyof typeof loading) =>
      setLoading((l) => ({ ...l, [key]: false }));

    getVideos().then(setVideos).catch(() => {}).finally(() => done("videos"));
    getPeople().then(setPeople).catch(() => {}).finally(() => done("people"));
    getDocuments().then(setDocs).catch(() => {}).finally(() => done("docs"));
    getActivity().then(setActivity).catch(() => {}).finally(() => done("activity"));
    getChannels().then(setChannels).catch(() => {}).finally(() => done("channels"));
    getCurrentUser().then(setUser).catch(() => {});
  }, []);

  const headerAvatar = user?.image;

  return (
    <div className="page">
      {/* ---------- Header ---------- */}
      <header className="header">
        <button
          className="icon-btn hamburger"
          onClick={() => setMenuOpen(true)}
          aria-label="Menu"
        >
          <IconMenu />
        </button>

        <div className="logo">
          <b>Social</b>
          <span>Network</span>
        </div>

        <div className="search desktop">
          <input placeholder="Find..." />
          <span className="search-ic">
            <IconSearch />
          </span>
        </div>

        <div className="header-actions">
          <button className="btn-upload">
            <IconUpload />
            <span className="lbl">Upload</span>
          </button>
          <button className="user" onClick={() => setProfileOpen(true)}>
            <span className="badge">13</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="avatar"
              src={headerAvatar || "https://dummyjson.com/icon/waseem/80"}
              alt={user ? `${user.firstName} ${user.lastName}` : "User"}
            />
            <span className="uname">
              {user?.firstName || " "}
              <small>{user?.lastName || " "}</small>
            </span>
          </button>
        </div>
      </header>

      {/* search khusus mobile */}
      <div className="search mobile-search">
        <input placeholder="Find" />
        <span className="search-ic">
          <IconSearch />
        </span>
      </div>

      {/* ---------- Top nav ---------- */}
      <nav className="topnav">
        {NAV_ITEMS.map((item) => {
          const target = NAV_TARGETS[item];
          return (
            <a
              key={item}
              href={target ? `#${target}` : "#"}
              onClick={(e) => {
                if (!target) return;
                e.preventDefault();
                scrollToSection(target);
              }}
            >
              {item}
            </a>
          );
        })}
      </nav>

      {/* ---------- Body ---------- */}
      <div className="layout">
        <main>
          <BigSection
            id="videos"
            title="Videos"
            browse="Browse all videos"
            items={videos}
            cta="Upload|Your Own Video"
            className="s-videos"
            loading={loading.videos}
          />
          <BigSection
            id="people"
            title="People"
            browse="View all"
            items={people}
            cta="Show|Your work"
            className="s-people"
            loading={loading.people}
          />
          <BigSection
            id="documents"
            title="Documents"
            browse="Browse all documents"
            items={docs}
            cta="Share|Your Document"
            className="s-documents"
            loading={loading.docs}
          />
        </main>

        <aside>
          <Activity items={activity} loading={loading.activity} />

          <section id="channels" className="section s-channels">
            <div className="section-head">
              <h2>Channels</h2>
              <a href="#">
                Browse all channels <IconArrow />
              </a>
            </div>
            <div className="channels-grid">
              {loading.channels
                ? Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="channel skeleton" aria-hidden="true" />
                  ))
                : channels.map((c) => (
                    <div key={c} className="channel">
                      {c}
                    </div>
                  ))}
            </div>
          </section>
        </aside>
      </div>

      {/* ---------- Footer ---------- */}
      <footer className="footer">
        <div className="social">
          <a href="#" aria-label="Twitter">
            <IconTwitter />
          </a>
          <a href="#" aria-label="LinkedIn">
            <IconLinkedin />
          </a>
          <a href="#" aria-label="Facebook">
            <IconFacebook />
          </a>
        </div>
        <div className="footer-links">
          <a href="#">About</a>
          <a href="#">For Business</a>
          <a href="#">Suggestions</a>
          <a href="#">Help &amp; FAQs</a>
          <a href="#">Contacts</a>
          <a href="#">Pricing</a>
        </div>
        <div className="copyright">
          © 2013 companyname inc.
          <br />
          Privacy / Terms
        </div>
      </footer>

      {/* ---------- Overlays ---------- */}
      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
      {profileOpen && (
        <ProfileMenu
          onClose={() => setProfileOpen(false)}
          avatar={headerAvatar}
          name={user ? `${user.firstName} ${user.lastName}` : undefined}
          role={user?.role}
        />
      )}
    </div>
  );
}
