# Tahap build
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Salin package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Salin semua file ke dalam container
COPY . .

# Build aplikasi Next.js dalam mode produksi
RUN npm run build

# Tahap produksi
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Salin hanya file yang diperlukan dari tahap build, tanpa folder cache
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Expose port yang digunakan oleh Next.js
EXPOSE 3000

# Jalankan aplikasi Next.js dalam mode produksi
CMD ["sh", "-c", "PORT=${PORT} node server.js"]