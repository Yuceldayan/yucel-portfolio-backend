# Portfolio Backend — api.yuceldayan.com

REST API that powers [canlı site](https://yucel-portfolio-frontend.vercel.app). It exposes the
portfolio content publicly and puts every write operation behind JWT
authentication, so the site's owner can manage projects, experience entries, the
about text and incoming contact messages from the admin panel without touching code.

**Frontend:** [yucel-portfolio-frontend](https://github.com/Yuceldayan/yucel-portfolio-frontend)

---

## Stack

| Layer | Choice |
|---|---|
| Runtime | Java 21 |
| Framework | Spring Boot 4 (Web MVC, Validation) |
| Persistence | Spring Data JPA / Hibernate, PostgreSQL |
| Migrations | Flyway (`V1` … `V9`) |
| Security | Spring Security + JWT (jjwt), token read from cookie or `Authorization` header |
| Packaging | Multi-stage Dockerfile |
| Hosting | Render |

## API surface

Endpoints are split into a public read side and an authenticated admin side.

| Area | Public | Admin |
|---|---|---|
| Projects | `ProjectPublicController` | `ProjectAdminController` |
| Experience | `ExperiencePublicController` | `ExperienceAdminController` |
| About | `AboutPublicController` | `AboutAdminController` |
| Contact | `ContactPublicController` (submit) | `ContactAdminController` (read) |
| Auth | — | `AuthController` (login, issues JWT) |

## Domain model

Four JPA entities, each with a Flyway migration behind it:

- **Project** — title, short/long description, cover image, tech stack, links, display order
- **Experience** — role, company, date range, description
- **About** — the single biography record
- **ContactMessage** — submissions from the public contact form

## Configuration

Configuration is profile-based; nothing sensitive is committed. Production reads
everything from environment variables:

```properties
DB_URL=jdbc:postgresql://<host>:5432/<db>
DB_USER=<user>
DB_PASS=<password>
JWT_SECRET=<secret>
PORT=8080
```

`application-dev.properties` targets a local PostgreSQL instance;
`application-prod.yml` binds the variables above and runs Flyway with
`ddl-auto: validate` so the schema is migration-driven, never auto-generated.

## Running locally

```bash
# needs a PostgreSQL database and Java 21
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

Flyway applies the migrations in `src/main/resources/db/migration` on startup.

```bash
./mvnw test          # tests
./mvnw clean package # jar
```

## Docker

```bash
docker build -t portfolio-api .
docker run -p 8080:8080 \
  -e DB_URL=... -e DB_USER=... -e DB_PASS=... -e JWT_SECRET=... \
  portfolio-api
```

The Dockerfile builds in one stage and copies only the resulting jar into the
runtime image.

---

## My role

**Sole developer.** I built this API and the
[React client](https://github.com/Yuceldayan/yucel-portfolio-frontend) that
consumes it. The commit history here records the work step by step.

**API design** — Nine controllers split deliberately into a public read side
(`ProjectPublic`, `ExperiencePublic`, `AboutPublic`, `ContactPublic`) and an
authenticated admin side (`ProjectAdmin`, `ExperienceAdmin`, `AboutAdmin`,
`ContactAdmin`), plus `AuthController`. Authorisation is a property of the route
rather than a check scattered through services.

**Domain model** — Four JPA entities (`Project`, `Experience`, `About`,
`ContactMessage`), each backed by its own Flyway migration. The schema is
migration-driven end to end: nine ordered migrations, `ddl-auto: validate`, never
auto-generated.

**Security** — Spring Security with JWT via jjwt; the filter reads the token from
either an httpOnly cookie or the `Authorization` header, so the same API serves
the browser client and direct calls.

**Deployment** — Multi-stage Dockerfile, CORS configuration for the custom domain
and Vercel preview origins, environment-driven configuration, running on Render.
