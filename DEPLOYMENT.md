# Production Deployment Guide for CineFlow AI Studio

## Deployment Targets

### 1. Standalone Node.js Server / Dedicated VPS (Recommended)
This model allows native local execution of FFmpeg for high-speed video stitching, rendering, and encoding.

#### Host Requirements:
- Ubuntu 22.04 LTS / Debian 12 / Windows Server 2022
- Node.js 20 LTS or Node.js 22 LTS
- FFmpeg installed via package manager:
  ```bash
  sudo apt update && sudo apt install -y ffmpeg
  ```

#### Deployment Steps:
1. Clone the repository and install dependencies:
   ```bash
   git clone https://github.com/your-org/cineflow-studio.git /var/www/cineflow-studio
   cd /var/www/cineflow-studio
   npm ci --production=false
   ```
2. Configure `.env.local` with production values:
   ```bash
   cp .env.example .env.local
   # Ensure NEXTAUTH_SECRET is set to a secure random 32+ character string
   ```
3. Build the production package:
   ```bash
   npm run build
   ```
4. Start via process manager (PM2):
   ```bash
   npm install -g pm2
   pm2 start npm --name "cineflow-studio" -- start -- -p 3000
   pm2 save
   pm2 startup
   ```
5. Configure Nginx reverse proxy with SSL (Let's Encrypt Certbot).

---

### 2. Containerized Deployment (Docker)
Build the standalone container image:
```bash
docker build -t cineflow-studio:latest .
docker run -d -p 3000:3000 --env-file .env.local --name cineflow-app cineflow-studio:latest
```

---

### 3. Serverless Edge Deployments (Vercel)
- Set root directory to `.`
- Add environment variables in Vercel Project Settings matching `.env.example`.
- Notice: Serverless environments with read-only filesystems require external object storage (AWS S3 / Cloudflare R2) and remote cloud FFmpeg workers for heavy video exports.
