-- About (Hakkımda) verisi için tablo
-- Genelde tek kayıt tutulur (id=1)

CREATE TABLE IF NOT EXISTS about (
    id BIGINT PRIMARY KEY,

    -- Üst başlıklar / kısa metinler
    title VARCHAR(160) NOT NULL DEFAULT 'Hakkımda',
    subtitle VARCHAR(260) NOT NULL DEFAULT '',

    -- Ana bio metni
    bio TEXT NOT NULL DEFAULT '',

    -- Küçük etiketler / kısa maddeler
    highlights TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],

    -- Stats (kartlar)
    stats JSONB NOT NULL DEFAULT '[]'::jsonb,

    -- Eğitim
    education_school VARCHAR(200) NOT NULL DEFAULT '',
    education_department VARCHAR(200) NOT NULL DEFAULT '',
    education_year VARCHAR(60) NOT NULL DEFAULT '',
    education_desc TEXT NOT NULL DEFAULT '',
    education_tags TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],

    -- Hedefler
    goals_desc TEXT NOT NULL DEFAULT '',
    goals_tags TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],

    -- Tech Stack
    tech_frontend TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    tech_backend  TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    tech_tools    TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- updated_at otomatik güncellensin (PostgreSQL)
CREATE OR REPLACE FUNCTION set_updated_at_about()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_about_updated_at ON about;

CREATE TRIGGER trg_about_updated_at
BEFORE UPDATE ON about
FOR EACH ROW
EXECUTE FUNCTION set_updated_at_about();

-- Tek kayıt seed: id=1
INSERT INTO about (
  id, title, subtitle, bio,
  highlights,
  stats,
  education_school, education_department, education_year, education_desc, education_tags,
  goals_desc, goals_tags,
  tech_frontend, tech_backend, tech_tools
)
SELECT
  1,
  'Hakkımda',
  'Modern web teknolojileriyle değer yaratan çözümler geliştiren full-stack developer',
  'Modern web teknolojileriyle uçtan uca ürün geliştiren; performans, güvenilirlik ve kullanıcı deneyimi odaklı bir yazılım geliştiriciyim.',
  ARRAY['Performans Odaklı','Hızlı Teslimat','Yaratıcı Çözümler']::TEXT[],
  '[
    {"value":"6+","label":"Canlı Proje"},
    {"value":"2+","label":"Yıl Deneyim"},
    {"value":"15+","label":"Mentorluk"},
    {"value":"12+","label":"Teknoloji"}
  ]'::jsonb,
  'Harran Üniversitesi',
  'Bilgisayar Mühendisliği',
  '2022 - 2026',
  'Yazılım geliştirme ve veri analizi odaklı eğitim. Algoritmalar, veri yapıları ve modern yazılım geliştirme yaklaşımları üzerine çalışmalar.',
  ARRAY['Java','C','Algoritmalar']::TEXT[],
  'Sürekli öğrenme ve yenilikçi bakış açımla modern teknolojilerle kullanıcı deneyimi güçlü çözümler geliştirmeyi hedefliyorum.',
  ARRAY['Temiz Kod','Takım Çalışması','Liderlik','Yenilikçilik']::TEXT[],
  ARRAY['React','JavaScript','TypeScript','HTML5','CSS3','Tailwind']::TEXT[],
  ARRAY['Java','Spring Boot','Node.js','REST API','PostgreSQL','SQL']::TEXT[],
  ARRAY['Git','GitHub','Docker','Vite','npm']::TEXT[]
WHERE NOT EXISTS (SELECT 1 FROM about);
