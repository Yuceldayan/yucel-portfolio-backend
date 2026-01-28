-- V3__project_details.sql

-- 1) projects tablosuna yeni alanlar
ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS short_description VARCHAR(260),
  ADD COLUMN IF NOT EXISTS long_description TEXT;

-- 2) Eski description -> yeni alanlara taşı
UPDATE projects
SET
  long_description  = COALESCE(long_description, description),
  short_description = COALESCE(short_description, LEFT(description, 260))
WHERE
  (long_description IS NULL OR short_description IS NULL);

-- 3) NULL kalmasın (NOT NULL yapacağız)
UPDATE projects SET short_description = '' WHERE short_description IS NULL;
UPDATE projects SET long_description  = '' WHERE long_description  IS NULL;

-- 4) NOT NULL yap
ALTER TABLE projects
  ALTER COLUMN short_description SET NOT NULL,
  ALTER COLUMN long_description  SET NOT NULL;

-- 5) İstersen eski description'ı koru (şimdilik dokunma)
-- Eğer tamamen kaldırmak istersen şunu açarsın:
-- ALTER TABLE projects DROP COLUMN IF EXISTS description;

-- 6) Features tablosu (Hibernate bunu bekliyor)
CREATE TABLE IF NOT EXISTS project_features (
  project_id BIGINT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  feature VARCHAR(300) NOT NULL
);

-- 7) Technologies tablosu
CREATE TABLE IF NOT EXISTS project_technologies (
  project_id BIGINT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  technology VARCHAR(120) NOT NULL
);
