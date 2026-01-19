import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface SiteContent {
  id: string;
  page: string;
  section: string;
  content_key: string;
  content_value: string;
  created_at?: string;
  updated_at?: string;
}

// Fetch all content for a specific page
export const usePageContent = (page: string) => {
  return useQuery({
    queryKey: ["site_content", page],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .eq("page", page);

      if (error) throw error;
      
      // Transform into a nested object for easy access
      const content: Record<string, Record<string, string>> = {};
      data?.forEach((item) => {
        if (!content[item.section]) {
          content[item.section] = {};
        }
        content[item.section][item.content_key] = item.content_value;
      });
      
      return content;
    },
  });
};

// Fetch specific section content
export const useSectionContent = (page: string, section: string) => {
  return useQuery({
    queryKey: ["site_content", page, section],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .eq("page", page)
        .eq("section", section);

      if (error) throw error;
      
      const content: Record<string, string> = {};
      data?.forEach((item) => {
        content[item.content_key] = item.content_value;
      });
      
      return content;
    },
  });
};

// Fetch all content (for admin)
export const useAllContent = () => {
  return useQuery({
    queryKey: ["site_content", "all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .order("page", { ascending: true })
        .order("section", { ascending: true });

      if (error) throw error;
      return data as SiteContent[];
    },
  });
};

// Update content mutation
export const useUpdateContent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, content_value }: { id: string; content_value: string }) => {
      const { data, error } = await supabase
        .from("site_content")
        .update({ content_value })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site_content"] });
    },
  });
};

// Upsert content (create or update)
export const useUpsertContent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ page, section, content_key, content_value }: {
      page: string;
      section: string;
      content_key: string;
      content_value: string;
    }) => {
      // First try to find existing
      const { data: existing } = await supabase
        .from("site_content")
        .select("id")
        .eq("page", page)
        .eq("section", section)
        .eq("content_key", content_key)
        .maybeSingle();

      if (existing) {
        const { data, error } = await supabase
          .from("site_content")
          .update({ content_value })
          .eq("id", existing.id)
          .select()
          .single();
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from("site_content")
          .insert({ page, section, content_key, content_value })
          .select()
          .single();
        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site_content"] });
    },
  });
};

// Delete content mutation
export const useDeleteContent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("site_content")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site_content"] });
    },
  });
};
