-- V4__seed_projects_full.sql

-- 1) Mevcut projeleri güncelle (title ile)
UPDATE projects
SET
  description        = COALESCE(description, 'ACADEM-X proje açıklaması.'),
  short_description  = 'Forum + gerçek zamanlı özellikler (Socket).',
  long_description   = 'ACADEM-X; forum, kullanıcı etkileşimi ve gerçek zamanlı mesajlaşma gibi özelliklere odaklanan bir platform projesidir. Gerçek zamanlı yapı için Socket yaklaşımı kullanılmıştır. API tarafı REST yapısında kurgulanmıştır. Proje; kullanıcı akışı, veri modeli ve modüler yapı kurma pratiği açısından önemli bir çalışmadır.'
WHERE title = 'ACADEM-X';

UPDATE projects
SET
  description        = COALESCE(description, 'Diyarbakır Kuyumcu proje açıklaması.'),
  short_description  = 'Canlı altın fiyatları, şık ve hızlı arayüz.',
  long_description   = 'Diyarbakır Kuyumcu projesi; canlı altın fiyatlarını API üzerinden çekip arayüzde dinamik olarak gösteren bir web uygulamasıdır. Kullanıcı deneyimi odaklı, hızlı açılan ve mobil uyumlu bir tasarım hedeflenmiştir. Projede veri çekme, tablo/karte gösterimleri ve düzenli UI bileşenleri üzerinde çalışılmıştır.'
WHERE title = 'Diyarbakır Kuyumcu';

UPDATE projects
SET
  description        = COALESCE(description, 'SensKids proje açıklaması.'),
  short_description  = 'E-ticaret & içerik sitesi (WooCommerce).',
  long_description   = 'SensKids; WooCommerce tabanlı e-ticaret ve içerik yapısını birleştiren bir web sitesidir. Ürün yönetimi, blog içerikleri, SEO düzenlemeleri ve sipariş süreçleri gibi alanlarda geliştirmeler yapılmıştır. Proje; gerçek bir müşteri/ürün senaryosunda site yönetimi ve geliştirme deneyimi kazandırmıştır.'
WHERE title = 'SensKids';


-- 2) Tsunami Tarım projesi yoksa ekle
INSERT INTO projects
(title, description, short_description, long_description, live_url, repo_url, cover_image_url, created_at)
SELECT
  'Tsunami Tarım & Hayvancılık',
  'Tsunami Tarım & Hayvancılık için geliştirdiğim kurumsal tanıtım web sitesi.',
  'HTML/CSS/JS ile ilk web projem.',
  'Tsunami Tarım & Hayvancılık; HTML, CSS ve JavaScript kullanarak geliştirdiğim ilk web projelerimden biridir. Sayfa yapısı, responsive düzen, temel etkileşimler ve içerik yerleşimi üzerinde çalışılmıştır. Bu proje benim için web geliştirmeye giriş niteliğinde önemli bir adımdır.',
  'https://www.tsunamitarimhayvancilik.com/',
  NULL,
  NULL,
  NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM projects WHERE title = 'Tsunami Tarım & Hayvancılık'
);


-- 3) Kendi portfolio projesi yoksa ekle
INSERT INTO projects
(title, description, short_description, long_description, live_url, repo_url, cover_image_url, created_at)
SELECT
  'Kişisel Portfolio',
  'Spring Boot + React + PostgreSQL ile geliştirdiğim full-stack portfolyo uygulaması.',
  'Spring Boot + React ile full-stack portfolio.',
  'Kişisel Portfolio; Spring Boot (backend) + React (frontend) + PostgreSQL (veritabanı) ile geliştirdiğim full-stack portfolyo projemdir. Projede proje yönetimi (CRUD), public/admin endpoint ayrımı, DTO kullanımı, Flyway ile migration, API standart response yapısı gibi konular uygulanmıştır. Ayrıca modern ve şık bir arayüz tasarımı hedeflenmiştir.',
  NULL,
  NULL,
  NULL,
  NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM projects WHERE title = 'Kişisel Portfolio'
);


-- 4) Features / Technologies tablolarını temizle ve yeniden doldur (seed için)
-- Not: Bu kısım seed amaçlı, prod ortamda yapmayız.
DELETE FROM project_features;
DELETE FROM project_technologies;


-- 5) ACADEM-X features + tech
INSERT INTO project_features (project_id, feature)
SELECT p.id, f.feature
FROM projects p
JOIN (VALUES
  ('Forum altyapısı ve içerik yönetimi'),
  ('Gerçek zamanlı iletişim / socket yaklaşımı'),
  ('REST API ile veri akışı'),
  ('Modüler yapı ve DTO yaklaşımı')
) AS f(feature) ON p.title = 'ACADEM-X';

INSERT INTO project_technologies (project_id, technology)
SELECT p.id, t.technology
FROM projects p
JOIN (VALUES
  ('React'),
  ('Socket / Realtime'),
  ('REST API')
) AS t(technology) ON p.title = 'ACADEM-X';


-- 6) Diyarbakır Kuyumcu features + tech
INSERT INTO project_features (project_id, feature)
SELECT p.id, f.feature
FROM projects p
JOIN (VALUES
  ('Canlı veri çekme ve arayüzde güncelleme'),
  ('Mobil uyumlu modern tasarım'),
  ('Hızlı arama ve kullanıcı odaklı kart yapısı')
) AS f(feature) ON p.title = 'Diyarbakır Kuyumcu';

INSERT INTO project_technologies (project_id, technology)
SELECT p.id, t.technology
FROM projects p
JOIN (VALUES
  ('React'),
  ('API Integration'),
  ('UI/UX')
) AS t(technology) ON p.title = 'Diyarbakır Kuyumcu';


-- 7) SensKids features + tech
INSERT INTO project_features (project_id, feature)
SELECT p.id, f.feature
FROM projects p
JOIN (VALUES
  ('WooCommerce e-ticaret altyapısı'),
  ('SEO ve içerik düzenlemeleri'),
  ('Sipariş & kargo süreçleri geliştirmeleri')
) AS f(feature) ON p.title = 'SensKids';

INSERT INTO project_technologies (project_id, technology)
SELECT p.id, t.technology
FROM projects p
JOIN (VALUES
  ('WordPress'),
  ('WooCommerce'),
  ('SEO')
) AS t(technology) ON p.title = 'SensKids';


-- 8) Tsunami Tarım features + tech
INSERT INTO project_features (project_id, feature)
SELECT p.id, f.feature
FROM projects p
JOIN (VALUES
  ('Responsive sayfa düzeni'),
  ('Temel etkileşimler (JS)'),
  ('Kurumsal tanıtım sayfa yapısı')
) AS f(feature) ON p.title = 'Tsunami Tarım & Hayvancılık';

INSERT INTO project_technologies (project_id, technology)
SELECT p.id, t.technology
FROM projects p
JOIN (VALUES
  ('HTML'),
  ('CSS'),
  ('JavaScript')
) AS t(technology) ON p.title = 'Tsunami Tarım & Hayvancılık';


-- 9) Portfolio features + tech
INSERT INTO project_features (project_id, feature)
SELECT p.id, f.feature
FROM projects p
JOIN (VALUES
  ('Public/Admin endpoint ayrımı'),
  ('CRUD: Proje ekle/güncelle/sil'),
  ('Flyway migration yönetimi'),
  ('DTO + Global Exception Handler yapısı')
) AS f(feature) ON p.title = 'Kişisel Portfolio';

INSERT INTO project_technologies (project_id, technology)
SELECT p.id, t.technology
FROM projects p
JOIN (VALUES
  ('Spring Boot'),
  ('React'),
  ('PostgreSQL'),
  ('Flyway')
) AS t(technology) ON p.title = 'Kişisel Portfolio';
