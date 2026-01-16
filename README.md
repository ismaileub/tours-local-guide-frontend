# Tourist Guide Frontend

This is the **frontend application** for the Tourist Guide project. It is built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Shadcn UI**. This app allows tourists to view tours, book guides, and make payments using stripe payment systems.

**Live Demo:** [https://tourist-guide-frontend.vercel.app](https://tour-guide-frontend-amber.vercel.app/)

---

## 🛠 Features

- View all tours with details (cover image, price, duration, etc.)
- Book individual guides or tour packages
- Secure payment integration (Stripe / other payment gateway)
- User authentication (login/signup)
- Review system for tours and guides
- Responsive UI with Tailwind CSS
- Safe image loading from Cloudinary & ImgBB with fallback handling

---

## ⚡ Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) >= 18
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/) (optional, for cloning the repository)

---

## 🔧 Setup Instructions (Local Development)

1. **Clone the repository**

```bash
git clone https://github.com/your-username/tourist-guide-frontend.git
cd tourist-guide-frontend
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_BASE_API=https://your-backend-api.com
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_yourkey
AUTH_SECRET=rtfgdgdfg
```

> Replace these values with your actual backend URL and Stripe key.

4. **Next.js configuration for remote images**

Edit `next.config.js` to allow images from Cloudinary and ImgBB:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "i.ibb.co" },
    ],
  },
};

export default nextConfig;
```

5. **Run the development server**

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Safe Image Handling

Use a `SafeImage` component to prevent 400 errors for broken or malformed URLs:

```tsx
import Image from "next/image";

interface SafeImageProps {
  src?: string;
  alt?: string;
  className?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className,
}) => {
  return (
    <Image
      src={src?.replace(".co.com", ".co") || "/tour-placeholder.jpg"} // auto-fix common ImgBB mistake
      alt={alt || "Tour Image"}
      fill
      className={className || "object-cover"}
      onError={(e) => {
        (e.target as HTMLImageElement).src = "/tour-placeholder.jpg";
      }}
    />
  );
};
```

Usage:

```tsx
<SafeImage src={tour.coverPhoto} alt={tour.title} />
```

- Automatically fixes `.co.com` → `.co` errors
- Uses fallback image if the URL is broken
- Works with Cloudinary and ImgBB

---

## 📦 Build & Production

To create a production build:

```bash
npm run build
npm start
# or
yarn build
yarn start
```

- App runs on [http://localhost:3000](http://localhost:3000) by default
- Make sure your backend API is deployed and reachable
- Do not use `localhost` URLs for images in production
- **Live Demo:** [https://tourist-guide-frontend.vercel.app](https://tourist-guide-frontend.vercel.app)

---

## 🔗 Folder Structure

```
frontend/
│
├─ public/                  # Static assets (images, icons, etc.)
├─ src/
│   ├─ app/                 # Next.js pages and layouts
│   ├─ components/          # Shared React components
│   ├─ context/             # React contexts
│   ├─ hooks/               # Custom hooks
│   ├─ services/            # API service functions
│   ├─ utils/               # Helper functions
│   └─ styles/              # Tailwind or custom CSS
├─ .env.local               # Local environment variables
├─ next.config.js           # Next.js configuration
├─ package.json             # Project dependencies & scripts
└─ README.md                # Project documentation
```

---

## 📝 Useful Scripts

| Command          | Description                 |
| ---------------- | --------------------------- |
| `npm run dev`    | Run app in development mode |
| `npm run build`  | Build production version    |
| `npm start`      | Start production server     |
| `npm run lint`   | Lint the code               |
| `npm run format` | Format code using Prettier  |

---

## ⚠️ Common Issues

1. **400 error on images**

   - Ensure URLs are correct (no `.co.com` typo)
   - Add image domains in `next.config.js`
   - Use `SafeImage` component to handle broken/malformed URLs

2. **CORS or API errors**

   - Ensure `NEXT_PUBLIC_BASE_API` points to the deployed backend
   - Avoid `localhost` in production

3. **Stripe errors**

   - Ensure `NEXT_PUBLIC_STRIPE_PUBLIC_KEY` is correct
   - Check backend handling of payment intents

---

## 📚 References

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [ImgBB API](https://api.imgbb.com/)
- [Stripe API](https://stripe.com/docs)

---

## 🙌 Author

**Your Name**

- GitHub: [https://github.com/ismaileub](https://github.com/ismaileub)
- Email: ismail301515@gmail.com
-
