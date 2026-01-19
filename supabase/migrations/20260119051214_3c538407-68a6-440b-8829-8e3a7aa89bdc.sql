-- Create collections table for dynamic collection management
CREATE TABLE public.collections (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  emoji text DEFAULT '✨',
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;

-- Public can view active collections
CREATE POLICY "Anyone can view active collections"
  ON public.collections FOR SELECT
  USING (is_active = true);

-- Admins can view all collections
CREATE POLICY "Admins can view all collections"
  ON public.collections FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can insert collections
CREATE POLICY "Admins can insert collections"
  ON public.collections FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Admins can update collections
CREATE POLICY "Admins can update collections"
  ON public.collections FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can delete collections
CREATE POLICY "Admins can delete collections"
  ON public.collections FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Create updated_at trigger
CREATE TRIGGER update_collections_updated_at
  BEFORE UPDATE ON public.collections
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for ordering
CREATE INDEX idx_collections_display_order ON public.collections(display_order);
CREATE INDEX idx_collections_slug ON public.collections(slug);

-- Insert default collections
INSERT INTO public.collections (name, slug, description, emoji, display_order, is_active) VALUES
  ('Vibrators', 'vibrators', 'Explore endless pleasure', '💫', 1, true),
  ('Dildos', 'dildos', 'Classic satisfaction', '🌙', 2, true),
  ('Plugs', 'plugs', 'New sensations', '✨', 3, true),
  ('Bondage Kits', 'bondage', 'Surrender control', '🔗', 4, true),
  ('Roses & Tools', 'roses', 'Delicate pleasure', '🌹', 5, true),
  ('Couple Play', 'couples', 'Share the moment', '💕', 6, true),
  ('Beginner Essentials', 'beginner', 'Start your journey', '🌸', 7, true),
  ('Luxury Line', 'luxury', 'Indulge yourself', '👑', 8, true);