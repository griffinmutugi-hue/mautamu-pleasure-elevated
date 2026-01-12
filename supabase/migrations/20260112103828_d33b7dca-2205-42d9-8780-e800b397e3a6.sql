-- Block anonymous access to profiles table
-- This ensures only authenticated users can read profile data
CREATE POLICY "Block anonymous access to profiles"
  ON public.profiles FOR SELECT
  TO anon
  USING (false);