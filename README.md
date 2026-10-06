# Astrofotografia.it

Community open source per astrofotografi: pubblicazione di foto, GIF e brevi video, versionamento delle elaborazioni, originali RAW/FITS intatti, commenti, like e dati di plate solving.

## Stato

MVP funzionante. Sono operative registrazione e accesso, galleria, pagina progetto, upload sicuro, revisioni, like, commenti, contest con voto, conservazione e download dell'originale con impronta SHA-256. Worker RAW/FITS, object storage S3 e plate solving asincrono sono nella roadmap produttiva.

## Avvio locale

```bash
cp .env.example .env
npm install
npm run db:push
npm run db:seed
npm run dev
```

Apri http://localhost:3000 e crea il primo account.

## Docker

```bash
docker compose up -d --build
docker compose exec web npm run db:seed
```

PostgreSQL e RustFS persistono rispettivamente nei volumi `postgres-data` e `rustfs-data`.

Per la configurazione consigliata con SiteGround GrowBig e storage self-hosted sulla VPS, consulta [docs/deployment-siteground-vps.md](docs/deployment-siteground-vps.md).

## Formati

- Immagini: JPEG, PNG, WebP, TIFF, GIF
- Video brevi: MP4, WebM
- RAW Canon/Nikon: CR2, CR3, NEF, NRW
- Astronomici: FITS, FIT, FTS

Gli originali non vengono modificati. Le future anteprime RAW/FITS saranno file derivati separati.

## Architettura prevista

- Next.js + TypeScript
- PostgreSQL per sviluppo e produzione
- RustFS self-hosted tramite API S3 per originali e derivati
- worker Python con LibRaw/Astropy e astrometry.net
- coda asincrona per anteprime, istogrammi e plate solving

## Contribuire

Issue e pull request sono benvenute. Prima di lavorare su una funzionalità ampia, apri una issue descrivendo proposta e impatto.

## Verifiche automatiche

GitHub Actions esegue su ogni push e pull request: installazione riproducibile, generazione e verifica dello schema Prisma, test, build di produzione e controllo delle vulnerabilità ad alta gravità.

## Licenza

AGPL-3.0. Vedi [LICENSE](LICENSE).
