-- Validate phone number format (Kenyan numbers: 07xxxxxxxx, +2547xxxxxxxx, or 2547xxxxxxxx)
ALTER TABLE public.orders 
  ADD CONSTRAINT check_phone_format 
  CHECK (customer_phone ~* '^(\+?254|0)7\d{8}$');

-- Validate name length (2-100 characters)
ALTER TABLE public.orders
  ADD CONSTRAINT check_name_length
  CHECK (length(customer_name) BETWEEN 2 AND 100);

-- Validate location length (3-100 characters)
ALTER TABLE public.orders
  ADD CONSTRAINT check_location_length
  CHECK (length(delivery_location) BETWEEN 3 AND 100);

-- Validate address length (5-200 characters)
ALTER TABLE public.orders
  ADD CONSTRAINT check_address_length
  CHECK (length(delivery_address) BETWEEN 5 AND 200);

-- Ensure positive amounts only
ALTER TABLE public.orders
  ADD CONSTRAINT check_positive_amounts
  CHECK (total >= 0 AND subtotal >= 0 AND shipping >= 0);

-- Validate order items have positive quantities
ALTER TABLE public.order_items
  ADD CONSTRAINT check_positive_quantity
  CHECK (quantity > 0);

-- Validate order items have non-negative prices
ALTER TABLE public.order_items
  ADD CONSTRAINT check_positive_price
  CHECK (price >= 0);