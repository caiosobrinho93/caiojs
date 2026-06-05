-- ═══════════════════════════════════════════════════════════
-- CAIO SOBRINHO — Seed Data
-- ═══════════════════════════════════════════════════════════

-- Categories
INSERT INTO categories (name, slug, description, icon, badge, "order") VALUES
  ('Web Design', 'web-design', 'Criação de interfaces modernas, responsivas e focadas em experiência do usuário.', 'Palette', 'Especialidade', 1),
  ('Desenvolvimento de Sistemas', 'sistemas', 'Sistemas completos, robustos e escaláveis para negócios de todos os tamanhos.', 'Code', NULL, 2),
  ('Dashboards Empresariais', 'dashboards', 'Painéis inteligentes para visualização de dados e tomada de decisão.', 'BarChart3', NULL, 3),
  ('Bubble.io', 'bubble', 'Desenvolvimento no-code e low-code para MVPs e soluções rápidas.', 'Workflow', 'No-Code', 4),
  ('Marcenaria Planejada', 'marcenaria', 'Projetos sob medida em marcenaria — do planejamento à execução.', 'Hammer', '8 anos', 5),
  ('Design', 'design', 'Design gráfico, identidade visual e peças criativas para marcas.', 'Figma', NULL, 6),
  ('Edição de Vídeo', 'video', 'Edição profissional de vídeos, motion graphics e conteúdo audiovisual.', 'Video', NULL, 7),
  ('Automações', 'automacoes', 'Automação de processos, integrações e workflows inteligentes.', 'Zap', NULL, 8);

-- Stats
INSERT INTO stats (label, value, icon, suffix, "order") VALUES
  ('Projetos Realizados', '50', 'Briefcase', '+', 1),
  ('Anos em Projetos', '6', 'Calendar', '+', 2),
  ('Anos em Marcenaria', '8', 'Hammer', '+', 3),
  ('Áreas de Atuação', '8', 'Grid3x3', '', 4);

-- Services
INSERT INTO services (title, description, icon, features, "order") VALUES
  ('Web Design & Desenvolvimento', 'Criação de sites e sistemas web modernos, performáticos e otimizados para resultados.', 'Globe', ARRAY['Landing Pages Premium', 'Sistemas Web Completos', 'E-commerce', 'Otimização SEO', 'Design Responsivo'], 1),
  ('Dashboards & BI', 'Painéis inteligentes para transformar dados em decisões estratégicas para o seu negócio.', 'BarChart3', ARRAY['Visualização de Dados', 'KPIs em Tempo Real', 'Relatórios Automatizados', 'Integração com APIs', 'Alertas Inteligentes'], 2),
  ('Automação de Processos', 'Eliminação de trabalho manual repetitivo através de automações inteligentes e integrações.', 'Zap', ARRAY['Workflows Automatizados', 'Integrações de Sistemas', 'Chatbots', 'Email Marketing', 'CRM Automation'], 3),
  ('Marcenaria Planejada', 'Projetos completos de marcenaria sob medida — do desenho técnico à instalação final.', 'Hammer', ARRAY['Projetos Sob Medida', 'Modelagem 3D', 'Cozinhas Planejadas', 'Closets', 'Móveis Corporativos'], 4),
  ('Design & Branding', 'Identidade visual completa e peças de design que comunicam profissionalismo e confiança.', 'Palette', ARRAY['Identidade Visual', 'Logo Design', 'Material Gráfico', 'Social Media', 'Apresentações'], 5),
  ('Soluções No-Code', 'MVPs e sistemas rápidos usando plataformas no-code como Bubble.io para validar ideias.', 'Workflow', ARRAY['MVPs Rápidos', 'Bubble.io', 'Prototipagem', 'Validação de Ideia', 'Apps Web'], 6);

-- Sample Projects
INSERT INTO projects (title, slug, short_description, full_description, category_id, tags, technologies, status, is_featured, is_highlighted, project_date, "order") VALUES
  (
    'Dashboard Financeiro Corporativo',
    'dashboard-financeiro-corporativo',
    'Painel completo de gestão financeira com indicadores em tempo real para empresa do setor industrial.',
    'Desenvolvimento de um dashboard financeiro completo para uma empresa do setor industrial, com visualização de KPIs em tempo real, relatórios automatizados e alertas de performance. O sistema integra dados de múltiplas fontes e apresenta informações estratégicas de forma clara e acionável.',
    (SELECT id FROM categories WHERE slug = 'dashboards'),
    ARRAY['Dashboard', 'Finanças', 'BI', 'Corporativo'],
    ARRAY['React', 'Next.js', 'PostgreSQL', 'Chart.js', 'Tailwind CSS'],
    'published', true, true, '2025-03-15', 1
  ),
  (
    'Sistema de Gestão de Pedidos',
    'sistema-gestao-pedidos',
    'Sistema completo para gestão de pedidos, estoque e clientes para comércio local.',
    'Sistema web responsivo para gestão integral de um comércio local, incluindo módulos de pedidos, controle de estoque, cadastro de clientes e relatórios de vendas. Interface intuitiva que permitiu redução de 40% no tempo de processamento de pedidos.',
    (SELECT id FROM categories WHERE slug = 'sistemas'),
    ARRAY['Sistema', 'Gestão', 'ERP', 'Comércio'],
    ARRAY['Bubble.io', 'Airtable', 'Zapier', 'Stripe'],
    'published', true, true, '2025-01-20', 2
  ),
  (
    'Landing Page Studio de Arquitetura',
    'landing-page-studio-arquitetura',
    'Website premium para studio de arquitetura com galeria de projetos e formulário de contato.',
    'Criação de uma landing page premium para um studio de arquitetura, focada em transmitir sofisticação e profissionalismo. Inclui galeria de projetos com lightbox, seção de depoimentos, formulário de contato e otimização completa de SEO.',
    (SELECT id FROM categories WHERE slug = 'web-design'),
    ARRAY['Landing Page', 'Arquitetura', 'Design', 'Premium'],
    ARRAY['Next.js', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    'published', true, false, '2024-11-10', 3
  ),
  (
    'Cozinha Planejada Residencial',
    'cozinha-planejada-residencial',
    'Projeto completo de cozinha planejada com ilha central e acabamento em laca.',
    'Projeto e execução de cozinha planejada completa para residência de alto padrão. Incluiu modelagem 3D, escolha de materiais, fabricação e instalação. A cozinha conta com ilha central, acabamento em laca branca e detalhes em madeira natural.',
    (SELECT id FROM categories WHERE slug = 'marcenaria'),
    ARRAY['Marcenaria', 'Cozinha', 'Residencial', 'Alto Padrão'],
    ARRAY['SketchUp', 'Promob', 'MDF', 'Laca'],
    'published', true, false, '2024-08-05', 4
  ),
  (
    'Automação de Marketing Digital',
    'automacao-marketing-digital',
    'Sistema automatizado de email marketing com segmentação e triggers comportamentais.',
    'Implementação de um sistema completo de automação de marketing digital, incluindo fluxos de email, segmentação de leads, triggers comportamentais e integração com CRM. Resultado: aumento de 65% na taxa de conversão de leads.',
    (SELECT id FROM categories WHERE slug = 'automacoes'),
    ARRAY['Automação', 'Marketing', 'Email', 'CRM'],
    ARRAY['n8n', 'Mailchimp', 'HubSpot', 'Zapier'],
    'published', false, false, '2024-06-20', 5
  ),
  (
    'Identidade Visual Startup Tech',
    'identidade-visual-startup-tech',
    'Branding completo para startup de tecnologia — do logo ao manual da marca.',
    'Desenvolvimento de identidade visual completa para uma startup de tecnologia, incluindo logotipo, paleta de cores, tipografia, ícones, papelaria, templates de apresentação e manual da marca. Visual moderno e tecnológico que reflete inovação.',
    (SELECT id FROM categories WHERE slug = 'design'),
    ARRAY['Branding', 'Logo', 'Startup', 'Tech'],
    ARRAY['Figma', 'Adobe Illustrator', 'Adobe Photoshop'],
    'published', false, false, '2024-04-12', 6
  );

-- Sample Testimonials
INSERT INTO testimonials (name, city, comment, rating, status) VALUES
  ('Ricardo Mendes', 'São José do Rio Preto, SP', 'O Caio entregou um sistema que superou todas as expectativas. Profissional extremamente competente e atencioso.', 5, 'approved'),
  ('Ana Clara Ferreira', 'Mirassol, SP', 'Minha cozinha ficou exatamente como eu sonhava. Trabalho impecável do início ao fim.', 5, 'approved'),
  ('Lucas Oliveira', 'Votuporanga, SP', 'O dashboard transformou a forma como tomamos decisões na empresa. Dados claros, interface incrível.', 5, 'approved'),
  ('Mariana Costa', 'São Paulo, SP', 'Landing page premium que realmente fez diferença nos nossos resultados. Altamente recomendado.', 5, 'approved');

-- Site Content
INSERT INTO site_content (key, value, type, "group", label) VALUES
  ('hero_title', 'CAIO SOBRINHO', 'text', 'hero', 'Título do Hero'),
  ('hero_subtitle', 'Transformando ideias em soluções digitais, sistemas inteligentes e projetos reais.', 'text', 'hero', 'Subtítulo do Hero'),
  ('about_intro', 'Sou o Caio Sobrinho — um profissional que acredita que boas soluções nascem da combinação entre visão estratégica, domínio técnico e execução impecável.', 'text', 'about', 'Introdução do Sobre'),
  ('about_text', 'Com mais de 6 anos de experiência em projetos e 8 anos em marcenaria, minha trajetória é marcada pela versatilidade. Atuo em desenvolvimento web, criação de sistemas, dashboards empresariais, automações, design e marcenaria planejada. Cada projeto é uma oportunidade de resolver problemas reais e entregar resultados que fazem diferença.', 'markdown', 'about', 'Texto do Sobre'),
  ('about_philosophy', 'Minha filosofia é simples: entender profundamente o problema antes de criar a solução. Penso em sistemas, não em tarefas isoladas. Busco elegância na simplicidade e impacto nos resultados.', 'text', 'about', 'Filosofia');
