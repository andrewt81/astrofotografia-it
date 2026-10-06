# Astrofotografia.it

Community open source per astrofotografi: pubblicazione di foto, GIF e brevi video, versionamento delle elaborazioni, originali RAW/FITS intatti, commenti, like e dati di plate solving.

## Stato

MVP in sviluppo. Sono operative galleria, pagina progetto, upload locale sicuro, versioni nel modello dati, conservazione e download dell'originale con impronta SHA-256. Autenticazione, worker RAW/FITS, object storage S3 e plate solving asincrono sono nella roadmap.

## Avvio locale

```bash
cp .env.example .env
npm install
npm run db:push
npm run dev
```

Apri http://localhost:3000. In sviluppo viene creato al primo upload un utente dimostrativo.

## Formati

- Immagini: JPEG, PNG, WebP, TIFF, GIF
- Video brevi: MP4, WebM
- RAW Canon/Nikon: CR2, CR3, NEF, NRW
- Astronomici: FITS, FIT, FTS

Gli originali non vengono modificati. Le future anteprime RAW/FITS saranno file derivati separati.

## Architettura prevista

- Next.js + TypeScript
- PostgreSQL in produzione (SQLite per il prototipo locale)
- S3/MinIO per originali e derivati
- worker Python con LibRaw/Astropy e astrometry.net
- coda asincrona per anteprime, istogrammi e plate solving

## Contribuire

Issue e pull request sono benvenute. Prima di lavorare su una funzionalità ampia, apri una issue descrivendo proposta e impatto.

## Licenza

AGPL-3.0. Vedi [LICENSE](LICENSE).
