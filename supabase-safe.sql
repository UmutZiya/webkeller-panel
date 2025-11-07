-- WebKeller Panel - Safe PostgreSQL Setup for Supabase
-- This version handles existing objects gracefully

-- Drop existing tables if they exist (optional - use with caution)
-- DROP TABLE IF EXISTS "_StaffServices" CASCADE;
-- DROP TABLE IF EXISTS "CashTransaction" CASCADE;
-- DROP TABLE IF EXISTS "Appointment" CASCADE;
-- DROP TABLE IF EXISTS "Customer" CASCADE;
-- DROP TABLE IF EXISTS "Staff" CASCADE;
-- DROP TABLE IF EXISTS "Service" CASCADE;
-- DROP TABLE IF EXISTS "Business" CASCADE;
-- DROP TABLE IF EXISTS "User" CASCADE;
-- DROP TABLE IF EXISTS "Role" CASCADE;

-- Create tables with IF NOT EXISTS
CREATE TABLE IF NOT EXISTS "Role" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT UNIQUE NOT NULL,
  "allowedMenus" JSONB NOT NULL,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "User" (
  "id" TEXT PRIMARY KEY,
  "firstName" TEXT NOT NULL,
  "lastName" TEXT NOT NULL,
  "username" TEXT UNIQUE NOT NULL,
  "password" TEXT NOT NULL,
  "roleId" TEXT,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "Business" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "address" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "city" TEXT NOT NULL,
  "district" TEXT NOT NULL,
  "taxOffice" TEXT NOT NULL,
  "taxNumber" TEXT NOT NULL,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "Service" (
  "id" TEXT PRIMARY KEY,
  "businessId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "taxRate" INTEGER NOT NULL,
  "price" INTEGER NOT NULL,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "Staff" (
  "id" TEXT PRIMARY KEY,
  "businessId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "nationalId" TEXT NOT NULL,
  "address" TEXT NOT NULL,
  "notes" TEXT,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "Customer" (
  "id" TEXT PRIMARY KEY,
  "businessId" TEXT,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "taxNumber" TEXT,
  "taxOffice" TEXT,
  "companyName" TEXT,
  "city" TEXT,
  "district" TEXT,
  "customerType" TEXT,
  "website" TEXT,
  "address" TEXT,
  "notes" TEXT,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "Appointment" (
  "id" TEXT PRIMARY KEY,
  "businessId" TEXT NOT NULL,
  "serviceId" TEXT NOT NULL,
  "staffId" TEXT NOT NULL,
  "customerId" TEXT NOT NULL,
  "date" TIMESTAMP NOT NULL,
  "status" TEXT NOT NULL,
  "notes" TEXT,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "CashTransaction" (
  "id" TEXT PRIMARY KEY,
  "businessId" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "amount" INTEGER NOT NULL,
  "paymentType" TEXT NOT NULL,
  "taxRate" INTEGER NOT NULL,
  "company" TEXT,
  "documentNo" TEXT,
  "date" TIMESTAMP NOT NULL,
  "description" TEXT,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "_StaffServices" (
  "A" TEXT NOT NULL,
  "B" TEXT NOT NULL
);

-- Insert default roles safely
INSERT INTO "Role" ("id", "name", "allowedMenus") VALUES 
('role_admin', 'Admin', '["isletmem", "musteriler", "randevu", "kullanicilar"]'),
('role_staff', 'Personel', '["randevu", "musteriler"]'),
('role_accounting', 'Muhasebe', '["isletmem", "kasa"]')
ON CONFLICT ("id") DO NOTHING;