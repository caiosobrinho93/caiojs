export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          icon: string | null;
          image_url: string | null;
          badge: string | null;
          order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          icon?: string | null;
          image_url?: string | null;
          badge?: string | null;
          order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          icon?: string | null;
          image_url?: string | null;
          badge?: string | null;
          order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          title: string;
          slug: string;
          short_description: string | null;
          full_description: string | null;
          category_id: string | null;
          thumbnail_url: string | null;
          tags: string[];
          technologies: string[];
          results: string | null;
          learnings: string | null;
          is_featured: boolean;
          is_highlighted: boolean;
          status: "draft" | "published" | "archived";
          project_date: string | null;
          external_url: string | null;
          order: number;
          view_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          short_description?: string | null;
          full_description?: string | null;
          category_id?: string | null;
          thumbnail_url?: string | null;
          tags?: string[];
          technologies?: string[];
          results?: string | null;
          learnings?: string | null;
          is_featured?: boolean;
          is_highlighted?: boolean;
          status?: "draft" | "published" | "archived";
          project_date?: string | null;
          external_url?: string | null;
          order?: number;
          view_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          short_description?: string | null;
          full_description?: string | null;
          category_id?: string | null;
          thumbnail_url?: string | null;
          tags?: string[];
          technologies?: string[];
          results?: string | null;
          learnings?: string | null;
          is_featured?: boolean;
          is_highlighted?: boolean;
          status?: "draft" | "published" | "archived";
          project_date?: string | null;
          external_url?: string | null;
          order?: number;
          view_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      project_media: {
        Row: {
          id: string;
          project_id: string;
          url: string;
          type: "image" | "video";
          alt_text: string | null;
          order: number;
          is_cover: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          url: string;
          type: "image" | "video";
          alt_text?: string | null;
          order?: number;
          is_cover?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          url?: string;
          type?: "image" | "video";
          alt_text?: string | null;
          order?: number;
          is_cover?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      testimonials: {
        Row: {
          id: string;
          name: string;
          city: string | null;
          comment: string;
          rating: number;
          photo_url: string | null;
          status: "pending" | "approved" | "rejected";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          city?: string | null;
          comment: string;
          rating: number;
          photo_url?: string | null;
          status?: "pending" | "approved" | "rejected";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          city?: string | null;
          comment?: string;
          rating?: number;
          photo_url?: string | null;
          status?: "pending" | "approved" | "rejected";
          created_at?: string;
          updated_at?: string;
        };
      };
      site_content: {
        Row: {
          id: string;
          key: string;
          value: string;
          type: "text" | "number" | "json" | "markdown";
          group: string;
          label: string;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          id?: string;
          key: string;
          value: string;
          type?: "text" | "number" | "json" | "markdown";
          group?: string;
          label?: string;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          id?: string;
          key?: string;
          value?: string;
          type?: "text" | "number" | "json" | "markdown";
          group?: string;
          label?: string;
          updated_at?: string;
          updated_by?: string | null;
        };
      };
      stats: {
        Row: {
          id: string;
          label: string;
          value: string;
          icon: string | null;
          suffix: string | null;
          order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          label: string;
          value: string;
          icon?: string | null;
          suffix?: string | null;
          order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          label?: string;
          value?: string;
          icon?: string | null;
          suffix?: string | null;
          order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      services: {
        Row: {
          id: string;
          title: string;
          description: string;
          icon: string | null;
          features: string[];
          order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          icon?: string | null;
          features?: string[];
          order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          icon?: string | null;
          features?: string[];
          order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      page_views: {
        Row: {
          id: string;
          page_path: string;
          project_id: string | null;
          referrer: string | null;
          user_agent: string | null;
          ip_hash: string | null;
          country: string | null;
          created_at: string;
          date: string;
        };
        Insert: {
          id?: string;
          page_path: string;
          project_id?: string | null;
          referrer?: string | null;
          user_agent?: string | null;
          ip_hash?: string | null;
          country?: string | null;
          created_at?: string;
          date?: string;
        };
        Update: {
          id?: string;
          page_path?: string;
          project_id?: string | null;
          referrer?: string | null;
          user_agent?: string | null;
          ip_hash?: string | null;
          country?: string | null;
          created_at?: string;
          date?: string;
        };
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          subject: string | null;
          message: string;
          is_read: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          subject?: string | null;
          message: string;
          is_read?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          subject?: string | null;
          message?: string;
          is_read?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}

// Convenience type aliases
export type Category = Database["public"]["Tables"]["categories"]["Row"];
export type Project = Database["public"]["Tables"]["projects"]["Row"];
export type ProjectMedia = Database["public"]["Tables"]["project_media"]["Row"];
export type Testimonial = Database["public"]["Tables"]["testimonials"]["Row"];
export type SiteContent = Database["public"]["Tables"]["site_content"]["Row"];
export type Stat = Database["public"]["Tables"]["stats"]["Row"];
export type Service = Database["public"]["Tables"]["services"]["Row"];
export type PageView = Database["public"]["Tables"]["page_views"]["Row"];
export type ContactMessage = Database["public"]["Tables"]["contact_messages"]["Row"];

// Extended types
export type ProjectWithCategory = Project & {
  categories: Category | null;
};

export type ProjectWithMedia = Project & {
  project_media: ProjectMedia[];
  categories: Category | null;
};
