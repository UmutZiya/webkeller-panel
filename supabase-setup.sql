-- WebKeller Panel - PostgreSQL Database Setup for Supabase
-- Run this SQL in Supabase SQL Editor

-- User table
CREATE TABLE "User" (
  "id" TEXT PRIMARY KEY,
  "firstName" TEXT NOT NULL,
  "lastName" TEXT NOT NULL,
  "username" TEXT UNIQUE NOT NULL,
  "password" TEXT NOT NULL,
  "roleId" TEXT,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Role table
CREATE TABLE "Role" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT UNIQUE NOT NULL,
  "allowedMenus" JSONB NOT NULL,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Business table
CREATE TABLE "Business" (
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

-- Service table
CREATE TABLE "Service" (
  "id" TEXT PRIMARY KEY,
  "businessId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "taxRate" INTEGER NOT NULL,
  "price" INTEGER NOT NULL,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Staff table
CREATE TABLE "Staff" (
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

-- Customer table
CREATE TABLE "Customer" (
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

-- Appointment table
CREATE TABLE "Appointment" (
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

-- CashTransaction table
CREATE TABLE "CashTransaction" (
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

-- Staff-Service many-to-many relation table
CREATE TABLE "_StaffServices" (
  "A" TEXT NOT NULL,
  "B" TEXT NOT NULL
);

-- Add foreign key constraints
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "Service" ADD CONSTRAINT "Service_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Staff" ADD CONSTRAINT "Staff_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Customer" ADD CONSTRAINT "Customer_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "CashTransaction" ADD CONSTRAINT "CashTransaction_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "_StaffServices" ADD CONSTRAINT "_StaffServices_A_fkey" FOREIGN KEY ("A") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "_StaffServices" ADD CONSTRAINT "_StaffServices_B_fkey" FOREIGN KEY ("B") REFERENCES "Staff"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Add unique constraints for many-to-many table
CREATE UNIQUE INDEX "_StaffServices_AB_unique" ON "_StaffServices"("A", "B");
CREATE INDEX "_StaffServices_B_index" ON "_StaffServices"("B");

-- Insert default roles
INSERT INTO "Role" ("id", "name", "allowedMenus") VALUES 
('role_admin', 'Admin', '["isletmem", "musteriler", "randevu", "kullanicilar"]'),
('role_staff', 'Personel', '["randevu", "musteriler"]'),
('role_accounting', 'Muhasebe', '["isletmem", "kasa"]');