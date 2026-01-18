-- Add quantity column to products table for inventory tracking
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS quantity integer NOT NULL DEFAULT 0;

-- Add index for common queries
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_is_bestseller ON public.products(is_bestseller) WHERE is_bestseller = true;
CREATE INDEX IF NOT EXISTS idx_products_is_new ON public.products(is_new) WHERE is_new = true;
CREATE INDEX IF NOT EXISTS idx_products_is_active ON public.products(is_active) WHERE is_active = true;