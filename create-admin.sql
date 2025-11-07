-- Create Admin User for Production
-- Run this in Supabase SQL Editor after running supabase-safe.sql

-- Insert admin user with hashed password
-- Password: admin123 (hashed with bcrypt)
INSERT INTO "User" ("id", "firstName", "lastName", "username", "password", "roleId", "createdAt", "updatedAt") 
VALUES (
  'admin_user_001',
  'Admin',
  'User',
  'admin',
  '$2a$10$JP0K88OKoA5rtph5GmkE1.McGwi7ADQf00meXdXzvix5befftE5ne',
  'role_admin',
  NOW(),
  NOW()
) ON CONFLICT ("username") DO NOTHING;

-- Verify admin user was created
SELECT "id", "firstName", "lastName", "username", "roleId" FROM "User" WHERE "username" = 'admin';