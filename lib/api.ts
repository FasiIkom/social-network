// Sumber dummy data online: https://dummyjson.com (tanpa registrasi / app-id).
// Mapping ke section pada desain "SocialNetwork":
//   Videos    -> /products  (judul + thumbnail + "views")
//   People    -> /users     (avatar + nama + jabatan)
//   Documents -> /posts      (judul + author + "views")
//   Activity  -> /comments   (nama + komentar)
//   Channels  -> daftar statis sesuai desain

const BASE = process.env.NEXT_PUBLIC_API_BASE || "https://dummyjson.com";

export interface CardItem {
  id: number | string;
  title: string;
  meta?: string;
  sub?: string;
  image?: string;
}

export type ActivityIcon = "chat" | "heart";

export interface ActivityItem {
  id: number;
  name: string;
  action: string;
  icon: ActivityIcon;
  body: string;
  time: string;
  image?: string;
}

export interface CurrentUser {
  firstName: string;
  lastName: string;
  role: string;
  image?: string;
}

// Angka "views" deterministik dari id supaya tidak berubah-ubah.
function views(seed: number): string {
  const n = ((seed * 48271) % 200000) + 800;
  return `${n.toLocaleString("en-US")} views`;
}

const TIMES = [
  "2 seconds ago",
  "5 minutes ago",
  "44 minutes ago",
  "1 hour ago",
  "1 day ago",
  "19 minutes ago",
];

async function getJSON(path: string): Promise<any> {
  const res = await fetch(`${BASE}${path}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
}

export async function getVideos(): Promise<CardItem[]> {
  const d = await getJSON("/products?limit=5&select=title,thumbnail,brand");
  return d.products.map((p: any) => ({
    id: p.id,
    title: p.title,
    sub: p.brand || "Waseem Arshad",
    meta: views(p.id),
    image: p.thumbnail,
  }));
}

export async function getPeople(): Promise<CardItem[]> {
  const d = await getJSON(
    "/users?limit=5&select=firstName,lastName,company,image"
  );
  return d.users.map((u: any) => ({
    id: u.id,
    title: `${u.firstName} ${u.lastName}`,
    // jabatan saja — orang tidak punya "views" seperti video/dokumen
    sub: u.company?.title || "Member",
    image: u.image,
  }));
}

export async function getDocuments(): Promise<CardItem[]> {
  const d = await getJSON("/posts?limit=5&select=title,reactions,userId");
  return d.posts.map((p: any) => ({
    id: p.id,
    title: p.title,
    sub: `By User ${p.userId}`,
    meta: views(p.id + 13),
  }));
}

// aksi + ikon diambil dari satu sumber yang sama supaya selalu sinkron
// (mis. "commented" pasti pakai ikon chat, bukan heart).
const ACTIVITY_KINDS: { action: string; icon: ActivityIcon }[] = [
  { action: "commented", icon: "chat" },
  { action: "added a new video", icon: "heart" },
  { action: "shared a document", icon: "chat" },
];

export async function getActivity(): Promise<ActivityItem[]> {
  const d = await getJSON("/comments?limit=6");
  return d.comments.map((c: any, i: number) => {
    const kind = ACTIVITY_KINDS[i % ACTIVITY_KINDS.length];
    return {
      id: c.id,
      name: c.user?.fullName || c.user?.username || "John Stainior",
      action: kind.action,
      icon: kind.icon,
      body: c.body,
      time: TIMES[i % TIMES.length],
    };
  });
}

// Header user diambil dari API (user pertama) alih-alih hardcoded "Waseem Arshad".
export async function getCurrentUser(): Promise<CurrentUser> {
  const u = await getJSON("/users/1?select=firstName,lastName,company,image");
  return {
    firstName: u.firstName,
    lastName: u.lastName,
    role: u.company?.title || "Member",
    image: u.image,
  };
}

// Channels diambil dari daftar brand unik pada /products (bukan array statis lagi).
export async function getChannels(): Promise<string[]> {
  const d = await getJSON("/products?limit=0&select=brand");
  const brands = Array.from(
    new Set(d.products.map((p: any) => p.brand).filter(Boolean))
  ) as string[];
  return brands.slice(0, 10);
}

// Hanya item yang punya section di halaman (lihat NAV_TARGETS).
export const NAV_ITEMS = ["Videos", "People", "Documents", "Channels"];

// id section tujuan utk tiap item nav yang punya bagian di halaman.
// Item tanpa entri di sini (Events/Communities/Favorites) tidak men-scroll.
export const NAV_TARGETS: Record<string, string> = {
  Videos: "videos",
  People: "people",
  Documents: "documents",
  Channels: "channels",
};

// smooth-scroll ke section berdasarkan id; aman dipanggil di client.
export function scrollToSection(id: string) {
  if (typeof document === "undefined") return;
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}
