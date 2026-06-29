-- Migration: Add 'telegram' to notification_type ENUM
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor)
-- This is needed because the original schema only had 'email' and 'whatsapp',
-- but the app uses 'telegram'. Any INSERT with type='telegram' fails otherwise.

-- Step 1: Add 'telegram' to the existing ENUM (safe, non-destructive)
ALTER TYPE notification_type ADD VALUE IF NOT EXISTS 'telegram';

-- Step 2: Verify the change
SELECT enum_range(NULL::notification_type);
-- Expected output: {email,whatsapp,telegram}

-- Step 3 (optional): Check existing rows that may have failed inserts
SELECT id, user_id, type, destination_value, enabled, created_at
FROM notification_targets
ORDER BY created_at DESC;
