create table if not exists contact_messages (
  id bigserial primary key,
  name varchar(120) not null,
  email varchar(180) not null,
  message text not null,
  created_at timestamp not null default now()
);

create table if not exists projects (
  id bigserial primary key,
  title varchar(160) not null,
  description text not null,
  live_url varchar(500),
  repo_url varchar(500)
);

create table if not exists project_tags (
  project_id bigint not null references projects(id) on delete cascade,
  tag varchar(60) not null
);

-- Demo seed (istersen silersin)
insert into projects (title, description, live_url, repo_url)
values
('ACADEM-X','Forum + gerçek zamanlı özellikler (Socket).', null, null),
('Diyarbakır Kuyumcu','Canlı altın fiyatları, şık ve hızlı arayüz.','https://diyarbakirkuyumcu.com', null),
('SensKids','E-ticaret & içerik sitesi (WooCommerce).','https://senskids.com.tr', null)
on conflict do nothing;

-- Tag seed
insert into project_tags (project_id, tag)
select p.id, t.tag
from projects p
join (values
  ('ACADEM-X','React'),
  ('ACADEM-X','Socket.IO'),
  ('ACADEM-X','REST'),
  ('Diyarbakır Kuyumcu','React'),
  ('Diyarbakır Kuyumcu','API'),
  ('SensKids','WooCommerce'),
  ('SensKids','SEO')
) as t(title, tag)
on p.title = t.title;
