# WebKeller Panel - Geliştirici Kılavuzu

## 📋 İçindekiler

- [Başlangıç](#başlangıç)
- [Geliştirme Ortamı](#geliştirme-ortamı)
- [Proje Mimarisi](#proje-mimarisi)
- [Kod Standartları](#kod-standartları)
- [Component Geliştirme](#component-geliştirme)
- [API Route Geliştirme](#api-route-geliştirme)
- [Veritabanı İşlemleri](#veritabanı-işlemleri)
- [State Yönetimi](#state-yönetimi)
- [Güvenlik](#güvenlik)
- [Test](#test)
- [Deployment](#deployment)
- [Sorun Giderme](#sorun-giderme)

## 🚀 Başlangıç

### Ön Gereksinimler

- Node.js 18.0.0 veya üzeri
- npm 8.0.0 veya üzeri
- MySQL 8.0 veya üzeri
- Git
- VS Code veya tercih edilen IDE

### İlk Kurulum

1. **Repository'yi klonlayın:**
```bash
git clone https://github.com/your-org/webkeller-panel.git
cd webkeller-panel
```

2. **Bağımlılıkları yükleyin:**
```bash
npm install
```

3. **Ortam değişkenlerini ayarlayın:**
```bash
cp .env.example .env
```

`.env` dosyasını düzenleyin:
```env
# Database
DATABASE_URL="mysql://root:password@localhost:3306/webkeller_dev"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

4. **Veritabanını hazırlayın:**
```bash
# Migration'ları çalıştırın
npx prisma migrate dev

# Seed verilerini yükleyin
npm run prisma:seed

# Admin kullanıcısı oluşturun
npm run create-admin
```

5. **Geliştirme sunucusunu başlatın:**
```bash
npm run dev
```

## 💻 Geliştirme Ortamı

### Önerilen VS Code Eklentileri

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "prisma.prisma",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "steoates.autoimport"
  ]
}
```

### VS Code Ayarları

`.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

### Prettier Yapılandırması

`.prettierrc`:
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false
}
```

## 🏗 Proje Mimarisi

### Klasör Yapısı

```
webkeller-panel/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── dashboard/         # Dashboard sayfaları
│   ├── login/            # Auth sayfaları
│   └── layout.tsx        # Root layout
├── components/           # React Components
│   ├── layout/          # Layout components
│   └── ui/              # UI components
├── contexts/            # React Contexts
├── hooks/               # Custom hooks
├── lib/                 # Utility functions
├── prisma/              # Database
│   ├── schema.prisma    # Database schema
│   └── migrations/      # Database migrations
├── public/              # Static files
└── scripts/             # Utility scripts
```

### Teknoloji Stack Detayları

#### Frontend
- **Next.js 13.5**: App Router kullanımı
- **React 18.2**: Server Components desteği
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS
- **Radix UI**: Headless UI components
- **React Hook Form**: Form yönetimi
- **Zod**: Schema validation

#### Backend
- **Next.js API Routes**: RESTful API
- **Prisma ORM**: Type-safe database access
- **JWT (jose)**: Authentication
- **bcryptjs**: Password hashing

## 📝 Kod Standartları

### TypeScript Kuralları

```typescript
// ✅ İyi
interface UserProps {
  id: string;
  name: string;
  email: string;
}

// ❌ Kötü
interface UserProps {
  id: any;
  name: any;
  email: any;
}
```

### React Component Standartları

```typescript
// ✅ İyi - Functional Component
import { FC } from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button: FC<ButtonProps> = ({ 
  label, 
  onClick, 
  variant = 'primary' 
}) => {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded',
        variant === 'primary' && 'bg-blue-500 text-white',
        variant === 'secondary' && 'bg-gray-200 text-gray-800'
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
```

### Dosya İsimlendirme

- **Components**: PascalCase (örn: `UserCard.tsx`)
- **Utilities**: camelCase (örn: `formatDate.ts`)
- **Constants**: UPPER_SNAKE_CASE (örn: `API_ENDPOINTS.ts`)
- **Hooks**: camelCase with 'use' prefix (örn: `useAuth.ts`)

### Import Sıralaması

```typescript
// 1. React imports
import React, { useState, useEffect } from 'react';

// 2. Third-party imports
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

// 3. Local imports - absolute paths
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';

// 4. Local imports - relative paths
import { UserCard } from './UserCard';

// 5. Type imports
import type { User } from '@/types';
```

## 🎨 Component Geliştirme

### UI Component Örneği

```typescript
// components/ui/Card.tsx
import { FC, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  description?: string;
}

export const Card: FC<CardProps> = ({
  children,
  className,
  title,
  description,
}) => {
  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-800 rounded-lg shadow-md p-6',
        className
      )}
    >
      {title && (
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
      )}
      {description && (
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {description}
        </p>
      )}
      {children}
    </div>
  );
};
```

### Form Component Örneği

```typescript
// components/forms/UserForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const userSchema = z.object({
  firstName: z.string().min(2, 'En az 2 karakter olmalı'),
  lastName: z.string().min(2, 'En az 2 karakter olmalı'),
  email: z.string().email('Geçerli bir email adresi girin'),
  phone: z.string().regex(/^\+90\d{10}$/, 'Geçerli telefon numarası girin'),
});

type UserFormData = z.infer<typeof userSchema>;

export function UserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data: UserFormData) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) throw new Error('Kullanıcı oluşturulamadı');
      
      // Success handling
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">
          Ad
        </label>
        <input
          {...register('firstName')}
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.firstName && (
          <p className="text-red-500 text-sm mt-1">
            {errors.firstName.message}
          </p>
        )}
      </div>
      
      {/* Diğer form alanları */}
      
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Kaydet
      </button>
    </form>
  );
}
```

## 🔌 API Route Geliştirme

### API Route Örneği

```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

// Validation schema
const createUserSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  username: z.string().min(3),
  password: z.string().min(6),
  roleId: z.string().optional(),
});

// GET - List users
export async function GET(request: NextRequest) {
  try {
    const users = await prisma.user.findMany({
      include: {
        role: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Kullanıcılar getirilemedi' },
      { status: 500 }
    );
  }
}

// POST - Create user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = createUserSchema.parse(body);
    
    // Check if username exists
    const existingUser = await prisma.user.findUnique({
      where: { username: validatedData.username },
    });
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'Bu kullanıcı adı zaten kullanılıyor' },
        { status: 409 }
      );
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);
    
    // Create user
    const user = await prisma.user.create({
      data: {
        ...validatedData,
        password: hashedPassword,
      },
      include: {
        role: true,
      },
    });
    
    // Remove password from response
    const { password, ...userWithoutPassword } = user;
    
    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Geçersiz veri', details: error.errors },
        { status: 400 }
      );
    }
    
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Kullanıcı oluşturulamadı' },
      { status: 500 }
    );
  }
}
```

### Middleware Örneği

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const publicPaths = ['/login', '/api/auth/login'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip public paths
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }
  
  // Check for auth token
  const token = request.cookies.get('auth-token')?.value;
  
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
};
```

## 🗄 Veritabanı İşlemleri

### Prisma Client Kullanımı

```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' 
      ? ['query', 'error', 'warn'] 
      : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
```

### Migration Oluşturma

```bash
# Yeni migration oluştur
npx prisma migrate dev --name add_user_fields

# Migration'ları production'a uygula
npx prisma migrate deploy

# Veritabanını sıfırla (dikkatli kullanın!)
npx prisma migrate reset
```

### Seed Script Örneği

```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create default roles
  const adminRole = await prisma.role.upsert({
    where: { name: 'Admin' },
    update: {},
    create: {
      name: 'Admin',
      allowedMenus: ['isletmem', 'musteriler', 'randevu', 'kullanicilar'],
    },
  });

  const userRole = await prisma.role.upsert({
    where: { name: 'User' },
    update: {},
    create: {
      name: 'User',
      allowedMenus: ['randevu', 'musteriler'],
    },
  });

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      firstName: 'Admin',
      lastName: 'User',
      username: 'admin',
      password: hashedPassword,
      roleId: adminRole.id,
    },
  });

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

## 🔄 State Yönetimi

### Context API Kullanımı

```typescript
// contexts/AuthContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  username: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for existing session
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        router.push('/dashboard');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
```

### Custom Hook Örneği

```typescript
// hooks/useDebounce.ts
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Kullanım
function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      // API çağrısı yap
      searchAPI(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Ara..."
    />
  );
}
```

## 🔒 Güvenlik

### Güvenlik Best Practices

1. **Input Validation**
```typescript
// Zod kullanarak input validation
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
});
```

2. **SQL Injection Koruması**
```typescript
// Prisma ORM otomatik olarak SQL injection'a karşı koruma sağlar
const user = await prisma.user.findUnique({
  where: { id: userId }, // Güvenli
});
```

3. **XSS Koruması**
```typescript
// React otomatik olarak XSS koruması sağlar
// DangerouslySetInnerHTML kullanımından kaçının
```

4. **CSRF Koruması**
```typescript
// CSRF token kullanımı
import { randomBytes } from 'crypto';

export function generateCSRFToken(): string {
  return randomBytes(32).toString('hex');
}
```

5. **Rate Limiting**
```typescript
// API route'larda rate limiting
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 100, // maksimum istek sayısı
});
```

### Environment Variables

```env
# .env.local (development)
DATABASE_URL="mysql://root:password@localhost:3306/webkeller_dev"
JWT_SECRET="development-secret-change-in-production"

# .env.production (production)
DATABASE_URL="${PRODUCTION_DATABASE_URL}"
JWT_SECRET="${PRODUCTION_JWT_SECRET}"
```

## 🧪 Test

### Unit Test Örneği

```typescript
// __tests__/utils/formatDate.test.ts
import { formatDate } from '@/lib/utils';

describe('formatDate', () => {
  it('should format date correctly', () => {
    const date = new Date('2024-01-01T10:00:00Z');
    const formatted = formatDate(date);
    expect(formatted).toBe('01 Ocak 2024');
  });

  it('should handle null date', () => {
    const formatted = formatDate(null);
    expect(formatted).toBe('');
  });
});
```

### Integration Test Örneği

```typescript
// __tests__/api/users.test.ts
import { createMocks } from 'node-mocks-http';
import { GET, POST } from '@/app/api/users/route';

describe('/api/users', () => {
  it('should return users list', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    await GET(req);

    expect(res._getStatusCode()).toBe(200);
    const json = JSON.parse(res._getData());
    expect(Array.isArray(json)).toBe(true);
  });

  it('should create new user', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        firstName: 'Test',
        lastName: 'User',
        username: 'testuser',
        password: 'Test123!',
      },
    });

    await POST(req);

    expect(res._getStatusCode()).toBe(201);
    const json = JSON.parse(res._getData());
    expect(json.username).toBe('testuser');
  });
});
```

## 🚀 Deployment

### Vercel Deployment

1. **Vercel CLI kurulumu:**
```bash
npm i -g vercel
```

2. **Deploy:**
```bash
vercel --prod
```

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

### PM2 ile Production

```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'webkeller-panel',
    script: 'npm',
    args: 'start',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
    },
    instances: 'max',
    exec_mode: 'cluster',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
  }],
};
```

## 🔧 Sorun Giderme

### Yaygın Hatalar ve Çözümleri

#### 1. Prisma Client Hatası
```bash
# Hata: Cannot find module '@prisma/client'
# Çözüm:
npx prisma generate
```

#### 2. Database Connection Hatası
```bash
# Hata: Can't reach database server
# Çözüm: DATABASE_URL'yi kontrol edin
mysql -u root -p -h localhost
```

#### 3. Build Hatası
```bash
# Hata: Module not found
# Çözüm: Cache temizleme
rm -rf .next node_modules
npm install
npm run build
```

#### 4. TypeScript Hatası
```bash
# Hata: Type errors
# Çözüm: TypeScript config kontrol
npx tsc --noEmit
```

### Debug Yapılandırması

`.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev"
    },
    {
      "name": "Next.js: debug client-side",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    }
  ]
}
```

### Performance Optimization

1. **Image Optimization:**
```typescript
import Image from 'next/image';

<Image
  src="/logo.png"
  alt="Logo"
  width={200}
  height={50}
  priority // LCP için önemli görseller
  placeholder="blur" // Blur placeholder
/>
```

2. **Code Splitting:**
```typescript
// Dynamic imports
const HeavyComponent = dynamic(
  () => import('@/components/HeavyComponent'),
  { 
    loading: () => <Skeleton />,
    ssr: false 
  }
);
```

3. **Database Query Optimization:**
```typescript
// Select only needed fields
const users = await prisma.user.findMany({
  select: {
    id: true,
    username: true,
    email: true,
  },
});

// Use pagination
const users = await prisma.user.findMany({
  skip: (page - 1) * pageSize,
  take: pageSize,
});
```

## 📚 Kaynaklar

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [React Documentation](https://react.dev)

---

**WebKeller Panel** - Geliştirici Kılavuzu v1.0.0