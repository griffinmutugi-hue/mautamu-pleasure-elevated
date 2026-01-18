import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Product {
  id: string;
  name: string;
  price: number;
  original_price?: number | null;
  description: string;
  long_description?: string | null;
  category: string;
  images: string[];
  rating: number;
  review_count: number;
  material?: string | null;
  size?: string | null;
  care_instructions?: string | null;
  is_bestseller: boolean;
  is_new: boolean;
  is_active: boolean;
  quantity: number;
  created_at?: string;
  updated_at?: string;
}

// Fetch all active products
export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Product[];
    },
  });
};

// Fetch products by category
export const useProductsByCategory = (category: string) => {
  return useQuery({
    queryKey: ["products", "category", category],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category", category)
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Product[];
    },
    enabled: !!category,
  });
};

// Fetch bestseller products
export const useBestsellerProducts = () => {
  return useQuery({
    queryKey: ["products", "bestsellers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_bestseller", true)
        .eq("is_active", true)
        .order("rating", { ascending: false });

      if (error) throw error;
      return data as Product[];
    },
  });
};

// Fetch new arrival products
export const useNewArrivals = () => {
  return useQuery({
    queryKey: ["products", "new-arrivals"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_new", true)
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Product[];
    },
  });
};

// Fetch single product by ID
export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      return data as Product | null;
    },
    enabled: !!id,
  });
};

// Search products
export const useSearchProducts = (query: string) => {
  return useQuery({
    queryKey: ["products", "search", query],
    queryFn: async () => {
      if (!query.trim()) return [];
      
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .or(`name.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`)
        .order("rating", { ascending: false });

      if (error) throw error;
      return data as Product[];
    },
    enabled: query.trim().length > 0,
  });
};

// Fetch related products by category (excluding current product)
export const useRelatedProducts = (category: string, excludeId: string) => {
  return useQuery({
    queryKey: ["products", "related", category, excludeId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category", category)
        .eq("is_active", true)
        .neq("id", excludeId)
        .limit(4)
        .order("rating", { ascending: false });

      if (error) throw error;
      return data as Product[];
    },
    enabled: !!category && !!excludeId,
  });
};
