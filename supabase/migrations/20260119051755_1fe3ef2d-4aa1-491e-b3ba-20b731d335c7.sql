-- Create site_content table for CMS functionality
CREATE TABLE public.site_content (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page text NOT NULL,
  section text NOT NULL,
  content_key text NOT NULL,
  content_value text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  UNIQUE(page, section, content_key)
);

-- Enable RLS
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Public can view all content
CREATE POLICY "Anyone can view site content"
  ON public.site_content FOR SELECT
  USING (true);

-- Admins can insert content
CREATE POLICY "Admins can insert site content"
  ON public.site_content FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Admins can update content
CREATE POLICY "Admins can update site content"
  ON public.site_content FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can delete content
CREATE POLICY "Admins can delete site content"
  ON public.site_content FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Create updated_at trigger
CREATE TRIGGER update_site_content_updated_at
  BEFORE UPDATE ON public.site_content
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for lookups
CREATE INDEX idx_site_content_page_section ON public.site_content(page, section);

-- Insert default homepage content
INSERT INTO public.site_content (page, section, content_key, content_value) VALUES
  ('home', 'hero', 'title', 'Discover Your Desires'),
  ('home', 'hero', 'subtitle', 'Premium intimate products delivered discreetly to your door. Explore our curated collection for every desire.'),
  ('home', 'hero', 'cta_primary', 'Shop Collections'),
  ('home', 'hero', 'cta_secondary', 'Best Sellers'),
  ('about', 'mission', 'title', 'About Mautamu'),
  ('about', 'mission', 'description', 'We believe in empowering individuals to explore their desires with confidence and discretion. Our carefully curated selection of premium products is designed to enhance intimacy and self-discovery.'),
  ('home', 'promise', 'title', 'Our Promise'),
  ('home', 'promise', 'description', 'Experience the Mautamu difference - where quality meets discretion');