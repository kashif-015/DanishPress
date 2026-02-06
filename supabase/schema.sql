-- DanishPress Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Cards table
CREATE TABLE IF NOT EXISTS cards (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  card_id VARCHAR(20) UNIQUE NOT NULL, -- Display ID like "DP001"
  name VARCHAR(255) NOT NULL,
  category VARCHAR(20) NOT NULL CHECK (category IN ('hindu', 'muslim')),
  availability VARCHAR(20) NOT NULL DEFAULT 'available' CHECK (availability IN ('available', 'limited', 'unavailable')),
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Card Images table
CREATE TABLE IF NOT EXISTS card_images (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  card_id UUID NOT NULL REFERENCES cards(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enquiry Logs table
CREATE TABLE IF NOT EXISTS enquiry_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  card_id VARCHAR(20) NOT NULL,
  card_name VARCHAR(255) NOT NULL,
  category VARCHAR(20) NOT NULL,
  availability VARCHAR(20) NOT NULL,
  user_agent TEXT,
  clicked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_cards_category ON cards(category);
CREATE INDEX IF NOT EXISTS idx_cards_featured ON cards(is_featured);
CREATE INDEX IF NOT EXISTS idx_card_images_card_id ON card_images(card_id);
CREATE INDEX IF NOT EXISTS idx_card_images_order ON card_images(card_id, display_order);
CREATE INDEX IF NOT EXISTS idx_enquiry_logs_clicked_at ON enquiry_logs(clicked_at);

-- Row Level Security (RLS) Policies

-- Enable RLS
ALTER TABLE cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE card_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiry_logs ENABLE ROW LEVEL SECURITY;

-- Cards: Public read, authenticated write
CREATE POLICY "Cards are viewable by everyone" ON cards
  FOR SELECT USING (true);

CREATE POLICY "Cards are insertable by authenticated users" ON cards
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Cards are updatable by authenticated users" ON cards
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Cards are deletable by authenticated users" ON cards
  FOR DELETE USING (auth.role() = 'authenticated');

-- Card Images: Public read, authenticated write
CREATE POLICY "Card images are viewable by everyone" ON card_images
  FOR SELECT USING (true);

CREATE POLICY "Card images are insertable by authenticated users" ON card_images
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Card images are updatable by authenticated users" ON card_images
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Card images are deletable by authenticated users" ON card_images
  FOR DELETE USING (auth.role() = 'authenticated');

-- Enquiry Logs: Public insert (for logging enquiries), authenticated read
CREATE POLICY "Enquiry logs are insertable by everyone" ON enquiry_logs
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enquiry logs are viewable by authenticated users" ON enquiry_logs
  FOR SELECT USING (auth.role() = 'authenticated');

-- Storage Bucket for card images
-- Run this in Supabase Dashboard > Storage > Create a new bucket

-- Bucket name: card-images
-- Public: Yes (for public image access)
-- Allowed MIME types: image/jpeg, image/png, image/webp, image/gif

-- Storage policies (create in Supabase Dashboard > Storage > Policies)
-- For the card-images bucket:

-- Policy 1: Allow public read access
-- Name: Public Read Access
-- Allowed operation: SELECT
-- Policy definition: true

-- Policy 2: Allow authenticated uploads
-- Name: Authenticated Upload
-- Allowed operation: INSERT
-- Policy definition: auth.role() = 'authenticated'

-- Policy 3: Allow authenticated updates
-- Name: Authenticated Update
-- Allowed operation: UPDATE
-- Policy definition: auth.role() = 'authenticated'

-- Policy 4: Allow authenticated deletes
-- Name: Authenticated Delete
-- Allowed operation: DELETE
-- Policy definition: auth.role() = 'authenticated'

-- Sample data (optional - for testing)
-- INSERT INTO cards (card_id, name, category, availability, is_featured) VALUES
--   ('DP001', 'Royal Elegance', 'hindu', 'available', true),
--   ('DP002', 'Golden Heritage', 'hindu', 'available', false),
--   ('DP003', 'Crescent Moon', 'muslim', 'available', true),
--   ('DP004', 'Emerald Grace', 'muslim', 'limited', false);
