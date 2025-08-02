-- CMS 콘텐츠 관리 시스템 데이터베이스 스키마
-- Supabase PostgreSQL

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Site Settings Table
CREATE TABLE IF NOT EXISTS site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    site_name VARCHAR(255) NOT NULL DEFAULT 'STAY FITNESS',
    site_description TEXT,
    logo_url TEXT,
    favicon_url TEXT,
    primary_color VARCHAR(7) DEFAULT '#2563eb',
    secondary_color VARCHAR(7) DEFAULT '#1e40af',
    font_family VARCHAR(100) DEFAULT 'Inter',
    contact_info JSONB DEFAULT '{}',
    seo JSONB DEFAULT '{}',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by UUID REFERENCES admin_users(id)
);

-- Pages Table (CMS 페이지 관리)
CREATE TABLE IF NOT EXISTS cms_pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    meta_title VARCHAR(255),
    meta_description TEXT,
    meta_keywords TEXT[],
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    template VARCHAR(50) DEFAULT 'default',
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES admin_users(id),
    updated_by UUID REFERENCES admin_users(id)
);

-- Content Blocks Table (페이지 블록 관리)
CREATE TABLE IF NOT EXISTS content_blocks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_id UUID REFERENCES cms_pages(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL CHECK (type IN ('text', 'image', 'video', 'button', 'section', 'hero', 'card', 'testimonial')),
    block_order INTEGER NOT NULL DEFAULT 0,
    data JSONB NOT NULL DEFAULT '{}',
    styles JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Media Files Table (미디어 파일 관리)
CREATE TABLE IF NOT EXISTS media_files (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    filename VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    file_size BIGINT NOT NULL,
    url TEXT NOT NULL,
    alt_text TEXT,
    caption TEXT,
    width INTEGER,
    height INTEGER,
    folder VARCHAR(255) DEFAULT 'uploads',
    uploaded_by UUID REFERENCES admin_users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Content Templates Table (재사용 가능한 템플릿)
CREATE TABLE IF NOT EXISTS content_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    preview_image TEXT,
    category VARCHAR(50) DEFAULT 'general' CHECK (category IN ('landing', 'about', 'service', 'contact', 'blog', 'general')),
    template_data JSONB NOT NULL DEFAULT '[]',
    is_system BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES admin_users(id)
);

-- Content Versions Table (버전 관리)
CREATE TABLE IF NOT EXISTS content_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_id UUID REFERENCES cms_pages(id) ON DELETE CASCADE,
    version_number INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    blocks_data JSONB NOT NULL DEFAULT '[]',
    notes TEXT,
    created_by UUID REFERENCES admin_users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(page_id, version_number)
);

-- Content Permissions Table (콘텐츠 편집 권한)
CREATE TABLE IF NOT EXISTS content_permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES admin_users(id) ON DELETE CASCADE,
    page_id UUID REFERENCES cms_pages(id) ON DELETE CASCADE,
    role VARCHAR(20) DEFAULT 'viewer' CHECK (role IN ('viewer', 'editor', 'admin')),
    permissions JSONB NOT NULL DEFAULT '{"read": true, "write": false, "delete": false, "publish": false, "manage_media": false, "manage_users": false}',
    granted_by UUID REFERENCES admin_users(id),
    granted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, page_id)
);

-- Content Activity Log (변경 이력 추적)
CREATE TABLE IF NOT EXISTS content_activity_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_id UUID REFERENCES cms_pages(id) ON DELETE CASCADE,
    user_id UUID REFERENCES admin_users(id),
    action VARCHAR(50) NOT NULL CHECK (action IN ('created', 'updated', 'published', 'unpublished', 'deleted', 'restored')),
    details JSONB DEFAULT '{}',
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_cms_pages_slug ON cms_pages(slug);
CREATE INDEX IF NOT EXISTS idx_cms_pages_status ON cms_pages(status);
CREATE INDEX IF NOT EXISTS idx_cms_pages_created_at ON cms_pages(created_at);
CREATE INDEX IF NOT EXISTS idx_content_blocks_page_id ON content_blocks(page_id);
CREATE INDEX IF NOT EXISTS idx_content_blocks_order ON content_blocks(page_id, block_order);
CREATE INDEX IF NOT EXISTS idx_content_blocks_type ON content_blocks(type);
CREATE INDEX IF NOT EXISTS idx_media_files_folder ON media_files(folder);
CREATE INDEX IF NOT EXISTS idx_media_files_mime_type ON media_files(mime_type);
CREATE INDEX IF NOT EXISTS idx_content_versions_page_id ON content_versions(page_id);
CREATE INDEX IF NOT EXISTS idx_content_permissions_user_id ON content_permissions(user_id);
CREATE INDEX IF NOT EXISTS idx_content_activity_log_page_id ON content_activity_log(page_id);
CREATE INDEX IF NOT EXISTS idx_content_activity_log_created_at ON content_activity_log(created_at);

-- Create Updated At Trigger Function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create Triggers for Updated At
CREATE TRIGGER update_cms_pages_updated_at BEFORE UPDATE ON cms_pages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_content_blocks_updated_at BEFORE UPDATE ON content_blocks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_media_files_updated_at BEFORE UPDATE ON media_files
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_content_templates_updated_at BEFORE UPDATE ON content_templates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert Default Site Settings
INSERT INTO site_settings (
    site_name,
    site_description,
    primary_color,
    secondary_color,
    font_family,
    contact_info,
    seo
) VALUES (
    'STAY FITNESS',
    '전문 퍼스널 트레이닝과 그룹 클래스를 제공하는 프리미엄 피트니스 센터',
    '#2563eb',
    '#1e40af',
    'Inter',
    '{"phone": "02-123-4567", "email": "info@stayfitness.com", "address": "서울시 강남구", "social_links": {"instagram": "@stayfitness", "kakao": "stayfitness"}}',
    '{"meta_title": "스테이피트니스 - 피트니스의 새 기준", "meta_description": "전문 퍼스널 트레이닝과 그룹 클래스를 제공하는 프리미엄 피트니스 센터", "meta_keywords": ["피트니스", "헬스장", "퍼스널 트레이닝", "PT"]}'
) ON CONFLICT DO NOTHING;

-- Create Default Content Templates
INSERT INTO content_templates (name, description, category, template_data, is_system) VALUES 
(
    '기본 랜딩 페이지',
    '히어로 섹션, 특징, 후기, CTA가 포함된 기본 랜딩 페이지 템플릿',
    'landing',
    '[
        {"type": "hero", "order": 1, "data": {"hero": {"title": "페이지 제목", "subtitle": "페이지 부제목", "ctaButton": {"text": "지금 시작하기", "url": "/consultation"}}}},
        {"type": "section", "order": 2, "data": {"text": {"heading": "우리의 특징", "content": "여기에 섹션 내용을 작성하세요."}}},
        {"type": "testimonial", "order": 3, "data": {"testimonial": {"content": "고객 후기 내용", "author": "고객 이름", "position": "직책"}}},
        {"type": "button", "order": 4, "data": {"button": {"text": "상담 신청", "url": "/consultation", "variant": "primary", "size": "lg"}}}
    ]',
    true
),
(
    '소개 페이지',
    '회사 소개와 팀 정보가 포함된 About 페이지 템플릿',
    'about',
    '[
        {"type": "hero", "order": 1, "data": {"hero": {"title": "회사 소개", "subtitle": "우리에 대해 알아보세요"}}},
        {"type": "text", "order": 2, "data": {"text": {"heading": "우리의 미션", "content": "회사의 미션과 비전을 설명하세요."}}},
        {"type": "card", "order": 3, "data": {"card": {"title": "팀원 소개", "description": "팀원에 대한 정보"}}}
    ]',
    true
);

-- Row Level Security (RLS) Policies
ALTER TABLE cms_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_permissions ENABLE ROW LEVEL SECURITY;

-- CMS Pages Policies
CREATE POLICY "Public can view published pages" ON cms_pages
    FOR SELECT USING (status = 'published');

CREATE POLICY "Admins can manage all pages" ON cms_pages
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM admin_users 
            WHERE id = auth.uid() 
            AND role IN ('super_admin', 'admin')
            AND is_active = true
        )
    );

CREATE POLICY "Editors can manage assigned pages" ON cms_pages
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM content_permissions cp
            JOIN admin_users au ON cp.user_id = au.id
            WHERE au.id = auth.uid()
            AND cp.page_id = cms_pages.id
            AND cp.role IN ('editor', 'admin')
            AND au.is_active = true
        )
    );

-- Content Blocks Policies
CREATE POLICY "Public can view blocks of published pages" ON content_blocks
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM cms_pages p 
            WHERE p.id = content_blocks.page_id 
            AND p.status = 'published'
        )
    );

CREATE POLICY "Admins can manage all blocks" ON content_blocks
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM admin_users 
            WHERE id = auth.uid() 
            AND role IN ('super_admin', 'admin')
            AND is_active = true
        )
    );

-- Media Files Policies
CREATE POLICY "Public can view media files" ON media_files
    FOR SELECT TO public USING (true);

CREATE POLICY "Authenticated users can manage media" ON media_files
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM admin_users 
            WHERE id = auth.uid() 
            AND is_active = true
        )
    );

-- Add Comments
COMMENT ON TABLE cms_pages IS 'CMS에서 관리되는 웹사이트 페이지';
COMMENT ON TABLE content_blocks IS '페이지를 구성하는 콘텐츠 블록';
COMMENT ON TABLE media_files IS '업로드된 미디어 파일 (이미지, 비디오 등)';
COMMENT ON TABLE content_templates IS '재사용 가능한 페이지 템플릿';
COMMENT ON TABLE content_versions IS '페이지 콘텐츠 버전 히스토리';
COMMENT ON TABLE content_permissions IS '사용자별 콘텐츠 편집 권한';
COMMENT ON TABLE site_settings IS '웹사이트 글로벌 설정';
COMMENT ON TABLE content_activity_log IS '콘텐츠 변경 활동 로그';