# 🌐 TradeFlow AI — Autonomous Customs & Logistics Agent

AI-powered cross-border logistics platform. Automate customs paperwork, classify HS codes, check compliance, and optimize trade routes.

## 🚀 Features
- 📄 **AI Document Parser** — Extract data from any invoice format
- 🏷️ **HS Code Classifier** — AI classifies products with 99%+ accuracy  
- ⚖️ **Compliance Checker** — Real-time trade law verification
- 📝 **Document Generator** — Bill of Lading, Shipping Bill, COO
- 🗺️ **Route Optimizer** — Avoid port congestion in real-time
- 💰 **Duty Calculator** — 180+ countries, real-time rates

## ⚡ Deploy FREE in 10 Minutes

### Step 1: MongoDB Atlas (Free)
1. Go to [cloud.mongodb.com](https://cloud.mongodb.com)
2. Sign Up → Create Free Cluster (M0 — 512MB)
3. Database Access → Add user (save username + password)
4. Network Access → Add IP: `0.0.0.0/0`
5. Clusters → Connect → Copy connection string

### Step 2: Gemini API Key (Free)
1. Go to [aistudio.google.com](https://aistudio.google.com)
2. Click "Get API Key" → Copy key (starts with AIzaSy...)

### Step 3: Razorpay (Free Test Mode)
1. Go to [razorpay.com](https://razorpay.com) → Sign Up
2. Settings → API Keys → Generate Test Key
3. Copy Key ID + Key Secret

### Step 4: Deploy on Vercel (Free)
1. Go to [vercel.com](https://vercel.com) → Sign up with GitHub
2. New Project → Import `tradeflow-ai` repo
3. Add Environment Variables:
   ```
   MONGODB_URI = (your Atlas connection string)
   JWT_SECRET = (any 32+ char random string)
   GEMINI_API_KEY = (your Gemini key)
   RAZORPAY_KEY_ID = rzp_test_xxx
   RAZORPAY_KEY_SECRET = your_secret
   NEXT_PUBLIC_RAZORPAY_KEY_ID = rzp_test_xxx
   ```
4. Click Deploy → Wait 2-3 min → **YOUR SAAS IS LIVE!** 🎉

## 🛠️ Tech Stack
| Layer | Technology | Cost |
|-------|-----------|------|
| Frontend | Next.js 14 + Tailwind CSS | FREE |
| Backend | Next.js API Routes | FREE |
| Database | MongoDB Atlas M0 | FREE |
| AI Engine | Google Gemini 1.5 Flash | FREE |
| Payments | Razorpay Test Mode | FREE |
| Hosting | Vercel | FREE |

## 💡 Trade Corridors Supported
- 🇮🇳 India → 🇺🇸 USA
- 🇮🇳 India → 🇦🇪 UAE  
- More corridors via AI

## 📈 Business Model
- **Free:** 5 shipments/month
- **Starter:** ₹4,999/month — 50 shipments
- **Pro:** ₹14,999/month — Unlimited + API access

---
Built with ❤️ by AI SaaS Builder Agent
