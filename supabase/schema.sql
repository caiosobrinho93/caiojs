-- ═══════════════════════════════════════════════════════════
-- CAIO SOBRINHO — Database Schema
-- Supabase PostgreSQL
-- ═══════════════════════════════════════════════════════════

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ═══════════════════════════════════════════════════════════
-- CATEGORIES (Áreas de atuação)
-- ═══════════════════════════════════════════════════════════
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  image_url TEXT,
  badge TEXT,
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ═══════════════════════════════════════════════════════════
-- PROJECTS
-- ═══════════════════════════════════════════════════════════
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  short_description TEXT,
  full_description TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  thumbnail_url TEXT,
  tags TEXT[] DEFAULT '{}',
  technologies TEXT[] DEFAULT '{}',
  results TEXT,
  learnings TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_highlighted BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  project_date DATE,
  external_url TEXT,
  "order" INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ═══════════════════════════════════════════════════════════
-- PROJECT MEDIA
-- ═══════════════════════════════════════════════════════════
CREATE TABLE project_media (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  type TEXT DEFAULT 'image' CHECK (type IN ('image', 'video')),
  alt_text TEXT,
  "order" INTEGER DEFAULT 0,
  is_cover BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ═══════════════════════════════════════════════════════════
-- TESTIMONIALS
-- ═══════════════════════════════════════════════════════════
CREATE TABLE testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT,
  comment TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  photo_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ═══════════════════════════════════════════════════════════
-- SITE CONTENT (CMS key-value)
-- ═══════════════════════════════════════════════════════════
CREATE TABLE site_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL DEFAULT '',
  type TEXT DEFAULT 'text' CHECK (type IN ('text', 'number', 'json', 'markdown')),
  "group" TEXT DEFAULT 'general',
  label TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- ═══════════════════════════════════════════════════════════
-- STATS
-- ═══════════════════════════════════════════════════════════
CREATE TABLE stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  icon TEXT,
  suffix TEXT DEFAULT '',
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ═══════════════════════════════════════════════════════════
-- SERVICES
-- ═══════════════════════════════════════════════════════════
CREATE TABLE services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  icon TEXT,
  features TEXT[] DEFAULT '{}',
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ═══════════════════════════════════════════════════════════
-- PAGE VIEWS (Analytics)
-- ═══════════════════════════════════════════════════════════
CREATE TABLE page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT NOT NULL,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  referrer TEXT,
  user_agent TEXT,
  ip_hash TEXT,
  country TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  date DATE DEFAULT CURRENT_DATE
);

-- ═══════════════════════════════════════════════════════════
-- CONTACT MESSAGES
-- ═══════════════════════════════════════════════════════════
CREATE TABLE contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ═══════════════════════════════════════════════════════════
-- INDEXES
-- ═══════════════════════════════════════════════════════════
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_category ON projects(category_id);
CREATE INDEX idx_projects_featured ON projects(is_featured) WHERE is_featured = true;
CREATE INDEX idx_projects_highlighted ON projects(is_highlighted) WHERE is_highlighted = true;
CREATE INDEX idx_project_media_project ON project_media(project_id);
CREATE INDEX idx_testimonials_status ON testimonials(status);
CREATE INDEX idx_site_content_key ON site_content(key);
CREATE INDEX idx_site_content_group ON site_content("group");
CREATE INDEX idx_page_views_path ON page_views(page_path);
CREATE INDEX idx_page_views_date ON page_views(date);
CREATE INDEX idx_page_views_project ON page_views(project_id);
CREATE INDEX idx_contact_messages_read ON contact_messages(is_read);

-- ═══════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY
-- ═══════════════════════════════════════════════════════════

-- Categories
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view active categories" ON categories
  FOR SELECT USING (is_active = true);
CREATE POLICY "Auth users can manage categories" ON categories
  FOR ALL USING (auth.uid() IS NOT NULL);

-- Projects
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view published projects" ON projects
  FOR SELECT USING (status = 'published');
CREATE POLICY "Auth users can manage projects" ON projects
  FOR ALL USING (auth.uid() IS NOT NULL);

-- Project Media
ALTER TABLE project_media ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view project media" ON project_media
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM projects WHERE projects.id = project_media.project_id AND projects.status = 'published'
    )
  );
CREATE POLICY "Auth users can manage project media" ON project_media
  FOR ALL USING (auth.uid() IS NOT NULL);

-- Testimonials
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view approved testimonials" ON testimonials
  FOR SELECT USING (status = 'approved');
CREATE POLICY "Anyone can insert testimonials" ON testimonials
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Auth users can manage testimonials" ON testimonials
  FOR ALL USING (auth.uid() IS NOT NULL);

-- Site Content
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view site content" ON site_content
  FOR SELECT USING (true);
CREATE POLICY "Auth users can manage site content" ON site_content
  FOR ALL USING (auth.uid() IS NOT NULL);

-- Stats
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view active stats" ON stats
  FOR SELECT USING (is_active = true);
CREATE POLICY "Auth users can manage stats" ON stats
  FOR ALL USING (auth.uid() IS NOT NULL);

-- Services
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view active services" ON services
  FOR SELECT USING (is_active = true);
CREATE POLICY "Auth users can manage services" ON services
  FOR ALL USING (auth.uid() IS NOT NULL);

-- Page Views
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert page views" ON page_views
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Auth users can view analytics" ON page_views
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- Contact Messages
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert contact messages" ON contact_messages
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Auth users can manage contact messages" ON contact_messages
  FOR ALL USING (auth.uid() IS NOT NULL);

-- ═══════════════════════════════════════════════════════════
-- UPDATED_AT TRIGGER
-- ═══════════════════════════════════════════════════════════
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at_categories BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at_projects BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at_project_media BEFORE UPDATE ON project_media FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at_testimonials BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at_site_content BEFORE UPDATE ON site_content FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at_stats BEFORE UPDATE ON stats FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at_services BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at_contact_messages BEFORE UPDATE ON contact_messages FOR EACH ROW EXECUTE FUNCTION update_updated_at();
