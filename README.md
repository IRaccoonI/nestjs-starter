## Set up development

### Installation

Enable and prepare `pnpm` using **Corepack** (comes with Node.js ≥16.13):

```bash
corepack enable
corepack prepare pnpm@latest-10 --activate
```

Install dependencies:

```bash
pnpm install
```

---

### Environment

Duplicate `.env.development.example` file and name it `.env.development`.

---

### Prepare docker

Before start development you need to deploy local postgres instance via docker

```bash
docker compose up -d
```

---

### Migrate DB

Run database migration:

```bash
pnpm run orm:up
```

---

### Run Dev

Press `F5` (VS Code only) or run:

```bash
pnpm run start:dev
```
