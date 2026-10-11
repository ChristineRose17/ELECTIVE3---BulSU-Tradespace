-- Migration: Convert listing_availability to weekly recurring rules (day_of_week 0-6)
-- Schema only - NO seed data or inserts

ALTER TABLE "listing_availability" ADD COLUMN IF NOT EXISTS "day_of_week" INTEGER;
ALTER TABLE "listing_availability" DROP COLUMN IF EXISTS "date";
ALTER TABLE "listing_availability" ALTER COLUMN "day_of_week" SET NOT NULL;
