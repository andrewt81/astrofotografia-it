import "./styles.css";
export const metadata = { title: "Astrofotografia.it", description: "La community italiana dell'astrofotografia" };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="it"><body><header><a className="brand" href="/"><span>✦</span> astrofotografia.it</a><nav><a href="/">Esplora</a><a href="/upload" className="upload">Carica media</a></nav></header>{children}<footer>Progetto open source · AGPL-3.0 · Astrofotografia.it</footer></body></html>; }
