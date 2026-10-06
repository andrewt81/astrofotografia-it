# Deployment: SiteGround GrowBig + VPS Proxmox

## Componenti

- SiteGround Node.js Project: Next.js e API applicative.
- PostgreSQL SiteGround: utenti, progetti, versioni, commenti e contest.
- VPS Proxmox Hetzner: RustFS e futuri worker RAW/FITS/plate solving.
- `s3.astrofotografia.it`: endpoint S3 pubblicato in HTTPS da Traefik.
- Console RustFS: solo `127.0.0.1:9001`, da raggiungere tramite VPN o tunnel SSH.

## VPS

1. Crea una VM o un container dedicato con un volume persistente montato in `/srv/astrofotografia/storage`.
2. Copia `deploy/vps/.env.example` in `.env` e genera credenziali casuali robuste.
3. Verifica che la rete Docker esterna `traefik` esista.
4. Avvia `docker compose -f deploy/vps/docker-compose.yml up -d`.
5. Crea nel DNS il record `s3.astrofotografia.it` verso l'IP della VPS.
6. Verifica `https://s3.astrofotografia.it/health`.

Il bucket resta privato. Il browser riceve URL PUT firmati validi 15 minuti e carica direttamente sulla VPS.

## SiteGround GrowBig

1. Client Area → Websites → Node.js Projects → New Project.
2. Collega `andrewt81/astrofotografia-it`, branch `main`.
3. Preset Next.js, Node 22, comando build `npm run build`, comando start `npm start`.
4. Crea un database PostgreSQL e copia la connection string in `DATABASE_URL`.
5. Inserisci le variabili:

```text
NEXT_PUBLIC_APP_URL=https://astrofotografia.it
MAX_UPLOAD_MB=250
STORAGE_DRIVER=s3
S3_ENDPOINT=https://s3.astrofotografia.it
S3_PUBLIC_ENDPOINT=https://s3.astrofotografia.it
S3_REGION=us-east-1
S3_BUCKET=astrofotografia
S3_FORCE_PATH_STYLE=true
S3_ACCESS_KEY=<chiave VPS>
S3_SECRET_KEY=<segreto VPS>
```

6. Esegui una volta `npx prisma db push` e `npm run db:seed` nella procedura di deploy o nella console disponibile.
7. Prova il dominio temporaneo; poi collega `astrofotografia.it`.

## Backup minimo

- Snapshot giornaliero del dataset ZFS del volume RustFS.
- Copia periodica esterna verso NAS o Hetzner Storage Box.
- Backup PostgreSQL indipendente dallo storage degli oggetti.
- Non considerare replica e snapshot sullo stesso host come backup esterno.
