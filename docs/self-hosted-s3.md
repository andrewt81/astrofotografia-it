# Self-hosted S3-compatible storage

This project stores original media and generated derivatives in a private S3-compatible object store. Any compatible provider can be used, including a self-hosted server or a managed S3 service.

## Requirements

- private bucket;
- HTTPS endpoint reachable by the application and users;
- path-style addressing support when required by the chosen implementation;
- CORS permission for signed `PUT` requests from the application origin;
- persistent storage outside the application container;
- independent backups.

## Example deployment

The example in `deploy/vps/docker-compose.yml` starts a single-node RustFS service behind an existing Traefik network. Before using it:

1. Copy `deploy/vps/.env.example` to a private `.env` file.
2. Replace the credentials with long random values.
3. Change `s3.example.com` to the storage hostname.
4. Change the persistent data path for the host.
5. Ensure the reverse proxy provides a valid TLS certificate.
6. Keep the administration console private.

The application uses signed upload URLs. Files travel directly from the browser to object storage and do not pass through the application server.

## Application variables

```text
STORAGE_DRIVER=s3
S3_ENDPOINT=https://s3.example.com
S3_PUBLIC_ENDPOINT=https://s3.example.com
S3_REGION=us-east-1
S3_BUCKET=astrofotografia
S3_FORCE_PATH_STYLE=true
S3_ACCESS_KEY=<application-access-key>
S3_SECRET_KEY=<application-secret-key>
```

Do not commit real credentials. Use a dedicated identity with access limited to the application bucket.

## Backup

Snapshots on the storage host are useful for fast recovery but are not an independent backup. Keep another copy on separate hardware or with a different storage provider, and test restoration periodically.
