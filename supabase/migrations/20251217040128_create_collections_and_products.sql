/*
  # Create Collections and Products Tables for Boutique Fashion E-commerce

  ## New Tables
  
  ### `collections`
  - `id` (uuid, primary key) - Unique identifier for each collection
  - `name` (text) - Collection name (e.g., "Kurtis", "Anarkalis")
  - `slug` (text, unique) - URL-friendly version of name
  - `description` (text) - Description of the collection
  - `image_url` (text) - Cover image for the collection
  - `display_order` (integer) - Order in which collections appear
  - `created_at` (timestamptz) - Timestamp of creation
  
  ### `products`
  - `id` (uuid, primary key) - Unique identifier for each product
  - `name` (text) - Product name
  - `price` (decimal) - Product price
  - `image_url` (text) - Main product image URL
  - `collection_id` (uuid, foreign key) - Reference to collections table
  - `is_featured` (boolean) - Whether product appears in featured carousel
  - `description` (text) - Product description
  - `created_at` (timestamptz) - Timestamp of creation

  ## Security
  - Enable RLS on both tables
  - Add policies for public read access (anyone can view products)
  - Products are read-only for public users
*/

-- Create collections table
CREATE TABLE IF NOT EXISTS collections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  image_url text DEFAULT '',
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price decimal(10,2) NOT NULL,
  image_url text NOT NULL,
  collection_id uuid REFERENCES collections(id) ON DELETE CASCADE,
  is_featured boolean DEFAULT false,
  description text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Anyone can view collections"
  ON collections
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can view products"
  ON products
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_products_collection_id ON products(collection_id);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_collections_slug ON collections(slug);