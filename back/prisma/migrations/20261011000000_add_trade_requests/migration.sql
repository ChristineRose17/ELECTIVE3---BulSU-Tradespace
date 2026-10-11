-- Migration: Add TradeRequest, TradeRequestEvent, ListingAvailability models, extend Notification and Listing
-- Schema only - NO seed data or inserts

-- CreateTable
CREATE TABLE IF NOT EXISTS "trade_requests" (
    "id" SERIAL NOT NULL,
    "item_id" INTEGER NOT NULL,
    "buyer_id" INTEGER NOT NULL,
    "seller_id" INTEGER NOT NULL,
    "meetup_location" TEXT NOT NULL,
    "meetup_date" TEXT NOT NULL,
    "meetup_time" TEXT NOT NULL,
    "notes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "proposed_by" TEXT NOT NULL DEFAULT 'buyer',
    "decline_reason" TEXT,
    "custom_time" BOOLEAN NOT NULL DEFAULT false,
    "expires_at" TIMESTAMP(3),
    "responded_at" TIMESTAMP(3),
    "completed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "trade_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "trade_request_events" (
    "id" SERIAL NOT NULL,
    "request_id" INTEGER NOT NULL,
    "actor_id" INTEGER NOT NULL,
    "action" TEXT NOT NULL,
    "snapshot_location" TEXT,
    "snapshot_date" TEXT,
    "snapshot_time" TEXT,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "trade_request_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "listing_availability" (
    "id" SERIAL NOT NULL,
    "item_id" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "listing_availability_pkey" PRIMARY KEY ("id")
);

-- AlterTable listings
ALTER TABLE "listings" ADD COLUMN IF NOT EXISTS "preferred_location" TEXT;

-- AlterTable notifications
ALTER TABLE "notifications" ADD COLUMN IF NOT EXISTS "title" TEXT;
ALTER TABLE "notifications" ADD COLUMN IF NOT EXISTS "related_request_id" INTEGER;
ALTER TABLE "notifications" ADD COLUMN IF NOT EXISTS "related_item_id" INTEGER;

-- CreateIndexes
CREATE INDEX IF NOT EXISTS "trade_requests_item_id_idx" ON "trade_requests"("item_id");
CREATE INDEX IF NOT EXISTS "trade_requests_buyer_id_idx" ON "trade_requests"("buyer_id");
CREATE INDEX IF NOT EXISTS "trade_requests_seller_id_idx" ON "trade_requests"("seller_id");
CREATE INDEX IF NOT EXISTS "trade_requests_status_idx" ON "trade_requests"("status");
CREATE INDEX IF NOT EXISTS "trade_request_events_request_id_idx" ON "trade_request_events"("request_id");
CREATE INDEX IF NOT EXISTS "listing_availability_item_id_idx" ON "listing_availability"("item_id");
CREATE INDEX IF NOT EXISTS "notifications_related_request_id_idx" ON "notifications"("related_request_id");

-- AddForeignKey
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'trade_requests_item_id_fkey'
    ) THEN
        ALTER TABLE "trade_requests" ADD CONSTRAINT "trade_requests_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "listings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'trade_requests_buyer_id_fkey'
    ) THEN
        ALTER TABLE "trade_requests" ADD CONSTRAINT "trade_requests_buyer_id_fkey" FOREIGN KEY ("buyer_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'trade_requests_seller_id_fkey'
    ) THEN
        ALTER TABLE "trade_requests" ADD CONSTRAINT "trade_requests_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'trade_request_events_request_id_fkey'
    ) THEN
        ALTER TABLE "trade_request_events" ADD CONSTRAINT "trade_request_events_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "trade_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'trade_request_events_actor_id_fkey'
    ) THEN
        ALTER TABLE "trade_request_events" ADD CONSTRAINT "trade_request_events_actor_id_fkey" FOREIGN KEY ("actor_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'listing_availability_item_id_fkey'
    ) THEN
        ALTER TABLE "listing_availability" ADD CONSTRAINT "listing_availability_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "listings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'notifications_related_request_id_fkey'
    ) THEN
        ALTER TABLE "notifications" ADD CONSTRAINT "notifications_related_request_id_fkey" FOREIGN KEY ("related_request_id") REFERENCES "trade_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;
