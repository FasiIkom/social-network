# SocialNetwork — Slicing Test (Frontend)

Slicing **responsive** dari desain "SocialNetwork" (desktop + mobile) untuk
Technical Test Frontend Developer Insignia.

## Tech Stack

- **Next.js 14** (App Router) + React 18
- CSS murni (custom, tanpa UI library) untuk slicing presisi
- Dummy data online: **https://dummyjson.com** (tanpa registrasi)

## Pemetaan dummy API

| Section   | Endpoint dummyjson | Dipakai untuk           |
| --------- | ------------------ | ----------------------- |
| Videos    | `/products`        | judul, thumbnail, views |
| People    | `/users`           | avatar, nama, jabatan   |
| Documents | `/posts`           | judul, author, views    |
| Activity  | `/comments`        | nama + isi komentar     |
| Channels  | statis (desain)    | daftar channel          |

## Menjalankan

```bash
npm install
npm run dev
```

Buka http://localhost:3001

## Konfigurasi (opsional)

Base URL API bisa diubah lewat env `NEXT_PUBLIC_API_BASE` (default
`https://dummyjson.com`).
