ALTER TABLE projects
ADD COLUMN IF NOT EXISTS display_order INT NOT NULL DEFAULT 0;

-- İstersen eski kayıtları id’ye göre sırala (güzel başlar)
UPDATE projects
SET display_order = id
WHERE display_order = 0;
