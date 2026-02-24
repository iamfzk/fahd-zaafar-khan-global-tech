# Deploy Options – FZK Global Tech

Site ko live karne ke liye koi bhi **ek** option use karo. Sab free hain.

---

## Option 1: Netlify (recommended – sabse simple)

1. **https://app.netlify.com** pe jao → **Sign up** / **Log in** (GitHub se login karo).
2. **Add new site** → **Import an existing project**.
3. **GitHub** choose karo → **iamfzk/fahd-zaafar-khan-global-tech** repo select karo.
4. **Branch:** `main` | **Build command:** khali chhod do | **Publish directory:** `.` (root).
5. **Deploy site** pe click karo.
6. 1–2 minute baad tumhe link milega: `https://something.netlify.app` (custom name bhi de sakte ho).

---

## Option 2: Vercel

1. **https://vercel.com** pe jao → **Sign up** / **Log in** (GitHub se).
2. **Add New** → **Project**.
3. **Import** → **iamfzk/fahd-zaafar-khan-global-tech** select karo.
4. **Framework Preset:** Other (ya None). **Root Directory:** `.` | Build command khali.
5. **Deploy** pe click karo.
6. Live link: `https://fahd-zaafar-khan-global-tech.vercel.app` (ya jo bhi project name ho).

---

## Option 3: Cloudflare Pages

1. **https://dash.cloudflare.com** → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. **GitHub** authorize karo → **iamfzk/fahd-zaafar-khan-global-tech** select karo.
3. **Production branch:** `main` (ya `master`).
4. **Build command:** khali ya `exit 0` | **Build output directory:** khali (root).
5. **Save and Deploy**.
6. Live link: `https://fahd-zaafar-khan-global-tech.pages.dev` (ya custom subdomain).

---

## Option 4: GitHub Pages (agar pehle enable nahi kiya)

1. Repo: **https://github.com/iamfzk/fahd-zaafar-khan-global-tech** → **Settings** → **Pages**.
2. **Source:** **Deploy from a branch**.
3. **Branch:** `master` (ya `main`) | **Folder:** `/ (root)` → **Save**.
4. 2–5 minute baad: **https://iamfzk.github.io/fahd-zaafar-khan-global-tech/**

---

**Summary:** Netlify / Vercel / Cloudflare mein se koi bhi use karo – GitHub repo connect karte hi deploy ho jayega. GitHub Pages ke liye Settings → Pages mein branch select karna zaroori hai.
