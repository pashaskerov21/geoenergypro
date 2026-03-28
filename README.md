# GeoEnergyPro 🌍

A full-stack informational web platform built for the geology and energy sector. The project consists of three interconnected repositories: a public-facing website, an admin panel for content management, and a REST API backend.

> ⚠️ **Note:** This project has not been deployed to a production server. The live demo reflects the static frontend design only — the API and database services are currently inactive.

🔗 **Live Demo (Static):** [geopro-design.vercel.app](https://geopro-design.vercel.app)
🔗 **Admin Panel (Next.js):** [github.com/pashaskerov21/geopro-admin](https://github.com/pashaskerov21/geopro-admin)
🔗 **Backend (PHP Laravel):** [github.com/pashaskerov21/geopro-backend](https://github.com/pashaskerov21/geopro-backend)

---

## 🗂️ Project Architecture

```
GeoEnergyPro
├── geoenergypro        → Public website (Next.js + TypeScript)
├── geopro-admin        → Admin panel / CMS (Next.js + TypeScript)
└── geopro-backend      → REST API (PHP Laravel)
```

---

## ✨ Features

- 🌐 Multilingual support with **i18n** (custom locale routing via middleware)
- ⚡ Server-Side Rendering (**SSR**) for fast page loads and SEO performance
- 📱 Fully responsive design across all screen sizes
- 🔗 REST API integration with Laravel backend
- 🗂️ Dynamic content management via admin panel
- 🖼️ Image gallery with **Fancyapps UI**
- 🎠 Interactive sliders powered by **Swiper.js**
- 🧩 Masonry layout for content sections
- 📦 Global state management with **Redux Toolkit**
- ✅ Form validation with **Formik** + **Yup**

---

## 🛠️ Tech Stack

### Frontend (this repo)

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=flat-square&logo=redux&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=flat-square&logo=sass&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=flat-square&logo=bootstrap&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)
![Formik](https://img.shields.io/badge/Formik-172B4D?style=flat-square&logo=formik&logoColor=white)
![Swiper](https://img.shields.io/badge/Swiper-6332F6?style=flat-square&logo=swiper&logoColor=white)

### Backend
![PHP](https://img.shields.io/badge/PHP-777BB4?style=flat-square&logo=php&logoColor=white)
![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=flat-square&logo=laravel&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white)
![REST API](https://img.shields.io/badge/REST_API-009688?style=flat-square&logo=fastapi&logoColor=white)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/pashaskerov21/geoenergypro.git
cd geoenergypro

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your API base URL to .env

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

```env
NEXT_PUBLIC_API_URL=your_laravel_api_url
```

> To run the full project locally, you also need to set up the [backend repo](https://github.com/pashaskerov21/geopro-backend) and [admin panel](https://github.com/pashaskerov21/geopro-admin).

---

## 📁 Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # Reusable UI components
├── redux/            # Redux Toolkit store & slices
├── types/            # TypeScript type definitions
└── utils/            # Helper functions

lang/                 # i18n translation files
public/               # Static assets
middleware.ts         # Locale routing middleware
i18n-config.ts        # i18n configuration
```

---

## 👤 Author

**Alipasha Askerov** — Frontend Developer

[![Portfolio](https://img.shields.io/badge/Portfolio-000000?style=flat-square&logo=vercel&logoColor=white)](https://alipashaskerov.vercel.app)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/alipasha-askerov-868213246)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/pashaskerov21)
