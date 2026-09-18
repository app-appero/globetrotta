# GlobeTrotta

Sito personale/portfolio di Rosario Trotta — Full-Stack & AI Developer.

Vetrina professionale orientata all'acquisizione di clienti (nuove attività, professionisti,
piccole imprese, startup). Il sito pubblico è **100% statico** (nessuna dipendenza da
Firebase a runtime) e viene pubblicato su Firebase Hosting; un pannello privato su
`/admin` (Firebase Auth + Firestore + Storage) permette di gestire tutti i contenuti —
progetti e testi — senza toccare il codice. Vedi la sezione [Pannello admin](#pannello-admin-admin).

## Stack

- [React](https://react.dev/) 18 + JavaScript (nessun TypeScript)
- [Vite](https://vitejs.dev/) come build tool
- [vite-react-ssg](https://github.com/win-han/vite-react-ssg) per generare, in fase di build,
  una pagina HTML statica per ogni rotta (incluse le pagine progetto dinamiche
  `/progetti/:slug`) — necessario perché le anteprime social (LinkedIn, ecc.) leggano i meta
  tag Open Graph dall'HTML senza dover eseguire JavaScript
- [React Router](https://reactrouter.com/) per il routing
- [Tailwind CSS](https://tailwindcss.com/) per lo stile
- [react-helmet-async](https://github.com/staylor/react-helmet-async) per i meta tag SEO/OG per pagina

Il sito pubblico non ha database, API custom o autenticazione propri. Il pannello
`/admin` (facoltativo, per la gestione contenuti) usa Firebase Auth/Firestore/Storage,
caricati solo quando si visita `/admin` — vedi [Pannello admin](#pannello-admin-admin).

## Installazione

```bash
npm install
```

## Sviluppo locale

```bash
npm run dev
```

Avvia il dev server di Vite su `http://localhost:5173`.

## Build di produzione

```bash
npm run build
```

Genera i file statici in `dist/`, incluse:

- una pagina `.html` per ogni rotta statica (`/`, `/progetti`, `/soluzioni`, `/chi-sono`,
  `/contatti`) e una per ogni progetto (`/progetti/<slug>`), ciascuna con i propri meta tag
  title/description/Open Graph già presenti nell'HTML;
- `sitemap.xml` (generato automaticamente dallo script `scripts/generate-sitemap.js`, eseguito
  in automatico dopo la build tramite lo script `postbuild`);
- `robots.txt` (statico, in `public/`).

Puoi controllare il risultato in locale con:

```bash
npm run preview
```

## Deploy su Firebase Hosting

1. Se non l'hai già fatto, crea un progetto su [Firebase Console](https://console.firebase.google.com/).
2. Sostituisci il placeholder in `.firebaserc` con il tuo project id:

   ```json
   { "projects": { "default": "il-tuo-project-id" } }
   ```

3. Se non hai Firebase CLI installato: `npm install -g firebase-tools`, poi `firebase login`.
4. Build e deploy:

   ```bash
   npm run build
   firebase deploy
   ```

`firebase.json` è già configurato per servire `dist/` come sito statico, con `cleanUrls`
attivo (così `/progetti/oracle-tennis.html` viene servito come `/progetti/oracle-tennis`) e un
rewrite di fallback verso `index.html` per eventuali percorsi non pre-renderizzati.

## Struttura del progetto

```
src/
├── main.jsx                 punto di ingresso (ViteReactSSG)
├── App.jsx                  albero delle rotte (include /admin/*, lazy-loaded)
├── data/                     TUTTI i testi/dati del sito pubblico — generati da
│                              `npm run sync-content` a partire da Firestore quando si usa
│                              il pannello admin, altrimenti modificabili anche a mano
│   ├── site.js, hero.js, problems.js, ...  un file per ogni blocco di contenuto
│   └── projects/               un file per ogni progetto + index.js di aggregazione
├── types/project.js          JSDoc con la struttura dati di un progetto (documentazione/autocomplete)
├── layouts/MainLayout.jsx    Navbar + contenuto pagina + Footer (sito pubblico)
├── components/                componenti riutilizzabili (Navbar, ProjectCard, Seo, ...)
├── sections/                  sezioni della homepage (Hero, ProblemsSection, ...)
├── pages/                     una pagina per rotta (Home, Projects, ProjectDetail, ...)
├── hooks/useProjectFilters.js  filtro categorie lato client per /progetti
└── admin/                     pannello privato /admin (Firebase Auth/Firestore/Storage),
                                 vedi sezione "Pannello admin" più sotto

scripts/
├── generate-sitemap.js       genera dist/sitemap.xml dopo la build (già esistente)
├── sync-content.mjs           rigenera src/data/*.js da Firestore (parte di `npm run publish`)
├── seed-content.mjs           one-shot: carica i contenuti attuali in Firestore
└── lib/firebaseAdmin.mjs      client Firestore Admin condiviso dai due script sopra

public/
└── projects/<slug>/          immagini dei singoli progetti
```

`src/data` è il "content layer": tutti i testi/dati che cambiano nel tempo vivono lì,
separati dai componenti React ("presentation layer"). Questo rende possibile in futuro
sostituire `src/data` con un CMS (Sanity, Contentful, ecc.) senza dover riscrivere la UI.

## Come aggiungere un nuovo progetto

Non serve toccare il router, la homepage, i componenti o creare una nuova pagina React: il
sistema è completamente data-driven. Per aggiungere un progetto:

1. **Duplica un file esistente** in `src/data/projects/` (es. copia `oracleTennis.js` in
   `nomeNuovoProgetto.js`) e compila tutti i campi. La struttura di ogni campo è documentata
   in `src/types/project.js`. Campi principali:
   - `slug` — deve essere univoco, in kebab-case, determina l'URL `/progetti/<slug>`;
   - `title`, `subtitle`, `shortDescription`, `description`;
   - `category` — array di stringhe, usato anche per i filtri in `/progetti` (mantieni la
     coerenza con le categorie già usate: "Full Stack", "AI", "Machine Learning", "SaaS",
     "Automation", oppure aggiungine di nuove: i filtri si aggiornano da soli);
   - `featured: true` se vuoi che compaia anche in homepage tra i progetti in evidenza;
   - `problem`, `solution`, `myRole`, `keyFeatures`, `businessValue`, `architecture`,
     `challenges`, `results`, `technologies`, `skills` — compongono il case study completo;
   - `githubUrl`, `liveUrl`, `demoVideoUrl` — opzionali, lascia stringa vuota `''` se non
     applicabili;
   - `seoTitle`, `seoDescription` — usati per il tag `<title>`, la meta description e le
     anteprime social di quella pagina progetto.

2. **Aggiungi le immagini** in `public/projects/<slug>/` (es. `public/projects/nome-progetto/cover.webp`).
   Usa preferibilmente WebP/AVIF. La `coverImage` nel file dati deve puntare a
   `/projects/<slug>/nome-file.webp`.

3. **Registra il progetto** in `src/data/projects/index.js`: aggiungi l'import in cima al file
   e il nome nell'array `projects`. Questo è l'unico altro file da modificare — router,
   homepage, pagina progetti e componenti leggono tutti da qui automaticamente.

4. **Verifica in locale** con `npm run dev`, controllando sia la card nella pagina Progetti
   sia la pagina di dettaglio `/progetti/<slug>`.

5. **Build e deploy**:

   ```bash
   npm run build
   firebase deploy
   ```

   In fase di build, `vite-react-ssg` legge automaticamente tutti i progetti presenti in
   `src/data/projects/index.js` (tramite `getStaticPaths` nella rotta `/progetti/:slug` in
   `src/App.jsx`) e genera una pagina HTML statica dedicata per ciascuno, coi meta tag Open
   Graph corretti già nell'HTML.

In modalità sviluppo (`npm run dev`), se un progetto ha campi obbligatori mancanti o vuoti,
o uno slug duplicato, viene stampato un avviso in console (vedi il controllo in
`src/data/projects/index.js`) — non blocca la build, ma segnala l'errore prima del deploy.

## Contenuti da sostituire prima della pubblicazione

Questa prima versione contiene placeholder chiaramente identificabili, da sostituire con i
tuoi dati reali prima di pubblicare il sito:

- **`src/data/site.js`** — email, URL LinkedIn/GitHub/WhatsApp: sono tutti valori di esempio.
- **3 progetti in `src/data/projects/`** — Oracle Tennis è basato su un progetto reale
  (da arricchire con contenuti/immagini vere); StudioFlow e DocPilot sono progetti
  d'esempio pensati per mostrare la struttura dati e possono essere sostituiti con case study
  reali o rimossi dall'array in `index.js`.
- **Immagini progetto** (`public/projects/**/*.svg`) — sono placeholder grafici generati,
  segnalati con la scritta "Anteprima da sostituire"; vanno sostituiti con screenshot reali
  (WebP/AVIF consigliati).
- **`public/profile-placeholder.svg`** — sostituire con una foto reale in `src/pages/About.jsx`.
- **`.firebaserc`** — inserire il project id Firebase reale.
- **`src/data/site.js` → `url`** e i riferimenti hardcoded in `src/components/Seo.jsx`,
  `public/robots.txt`, `scripts/generate-sitemap.js` — se il dominio finale sarà diverso da
  `globetrotta.com`, aggiorna il valore `url` in `src/data/site.js` (usato per canonical/OG)
  e il dominio dentro `public/robots.txt`.
- **Immagini Open Graph (`og-default.svg`, le cover progetto)** — sono in formato SVG per
  semplicità. Alcuni crawler (LinkedIn compreso, in certi casi) preferiscono o richiedono
  JPG/PNG per le anteprime social: se noti anteprime mancanti su LinkedIn, converti le cover
  in `.jpg`/`.png`/`.webp` e aggiorna i riferimenti (`coverImage` nei progetti, `DEFAULT_IMAGE`
  in `src/components/Seo.jsx`).

## Pannello admin (`/admin`)

Il sito pubblico resta 100% statico e non dipende da Firebase a runtime: legge sempre
`src/data/*.js`, come prima. Il pannello `/admin` è uno strumento privato, separato dal
bundle pubblico (caricato con `React.lazy`), che permette di gestire **tutti** i
contenuti — progetti e testi di ogni sezione — da browser, senza toccare il codice.

I contenuti modificati dal pannello vivono in **Firestore** (e le immagini in **Firebase
Storage**) finché non li "pubblichi": solo allora vengono scritti nei file statici che il
sito realmente serve.

```
/admin (login) → modifichi progetti/testi → salvataggio istantaneo su Firestore/Storage
              → tu esegui: npm run publish
```

`npm run publish` esegue in sequenza: `npm run sync-content` (rigenera `src/data/*.js` e
`src/data/projects/*.js` leggendo Firestore) → `npm run build` → `firebase deploy`.

### Setup iniziale (una tantum)

1. Crea/usa un progetto su [Firebase Console](https://console.firebase.google.com/) e
   inserisci il project id reale in `.firebaserc` (al posto del placeholder).
2. Nella console del progetto, abilita:
   - **Authentication** → Sign-in method → **Email/Password**;
   - **Firestore Database** (modalità produzione, la region non è critica);
   - **Storage**.
3. In **Authentication → Users**, crea manualmente il tuo utente admin (email +
   password) — non esiste una UI di registrazione nel pannello, per design.
4. In **Project settings → General → Your apps**, crea una Web App e copia la sua
   configurazione in un file `.env.local` (parti da `.env.example`, entrambi già in
   `.gitignore`).
5. In **Project settings → Service accounts**, genera una nuova chiave privata e salvala
   come `serviceAccountKey.json` nella root del progetto (già in `.gitignore` — **non va
   mai committata**). Serve solo agli script `sync-content`/`seed-content`, eseguiti da
   terminale, e bypassa le security rules.
6. Deploya le security rules (restringono lettura/scrittura Firestore/Storage al solo
   account admin, identificato via email):
   ```bash
   firebase deploy --only firestore:rules,storage:rules
   ```
7. Popola Firestore con i contenuti attualmente nel codice, così il pannello si apre già
   compilato invece che vuoto:
   ```bash
   npm run seed-content
   ```
8. `npm run dev`, vai su `http://localhost:5173/admin`, accedi con le credenziali create
   al punto 3.

### Testare in locale con gli emulatori Firebase

Per provare il pannello admin (login, Firestore, upload immagini) **senza un progetto
Firebase reale**, si può usare il [Firebase Local Emulator Suite](https://firebase.google.com/docs/emulator-suite):
Auth/Firestore/Storage girano completamente in locale, con una dashboard (Emulator UI) per
ispezionare dati e utenti — utile anche solo per curiosare prima di configurare Firebase
sul serio.

1. Se non l'hai già fatto: `npm install -g firebase-tools`, poi `firebase login`.
2. In `.env.local` (basato su `.env.example`) imposta:
   ```
   VITE_USE_FIREBASE_EMULATORS=true
   VITE_FIREBASE_PROJECT_ID=demo-globetrotta
   ```
   (un project id con prefisso `demo-` non richiede un progetto Firebase reale: gli
   emulatori funzionano completamente offline.)
3. **Solo la prima volta**, popola gli emulatori con i contenuti attuali (avvia gli
   emulatori, esegue `seed-content`, salva i dati su disco in `.emulator-data/` e li
   spegne):
   ```bash
   npm run emulators:seed
   ```
4. Ogni sessione di lavoro, in due terminali separati:
   ```bash
   npm run emulators   # terminale A — riparte dai dati salvati in .emulator-data/
   npm run dev          # terminale B — sito su http://localhost:5173
   ```
5. Apri **http://localhost:4000** (Emulator UI): nella scheda **Authentication**, crea
   manualmente un utente di test (Add user) con la stessa email usata in
   `firestore.rules`/`storage.rules` (`trottarosario@gmail.com`, o cambiala nelle regole
   se preferisci un'altra email di test) — è un utente solo locale, non tocca Firebase
   Auth reale.
6. Vai su `http://localhost:5173/admin` e accedi con quell'utente: modifiche a progetti e
   testi si salvano nell'emulatore, visibili anche nella scheda **Firestore**/**Storage**
   della Emulator UI.

Per passare dal test locale al progetto Firebase reale basta rimettere
`VITE_USE_FIREBASE_EMULATORS=false` e compilare le altre variabili `VITE_FIREBASE_*` in
`.env.local` come descritto nel setup qui sopra.

### Sicurezza

- Nessun accesso pubblico a Firestore/Storage: le regole (`firestore.rules`,
  `storage.rules`) consentono lettura/scrittura solo all'utente autenticato con la tua
  email (lo Storage resta in lettura pubblica solo per servire le immagini caricate dal
  pannello, mai in scrittura).
- `/admin` è escluso da sitemap e da indicizzazione (`Disallow: /admin` in
  `public/robots.txt`, meta `noindex` sulle sue pagine).
- `serviceAccountKey.json` e `.env.local` non vanno mai committati (già in `.gitignore`):
  contengono credenziali con accesso admin al progetto Firebase.

## Note tecniche

- **Nessun form di contatto funzionante** in questa V1: la pagina Contatti usa link diretti
  (email, LinkedIn, WhatsApp) per evitare di introdurre un backend o un servizio esterno solo
  per gestire l'invio. Se in futuro vorrai un form funzionante, integra un servizio pensato per
  siti statici (es. Formspree, Web3Forms) senza aggiungere infrastruttura server-side propria.
- **Route predisposte ma non implementate**: l'architettura data-driven usata per i progetti
  può essere replicata per `/soluzioni/:slug` o per un futuro `/blog`, senza refactor.
- **CMS**: il pannello `/admin` copre questo bisogno (vedi sopra). `src/data` resta comunque
  isolato dai componenti, quindi in futuro potrebbe essere sostituito anche con un CMS
  headless diverso senza riscrivere la UI.
- **Pubblicazione non automatica**: salvare dal pannello scrive su Firestore, non sul sito
  pubblico. Serve eseguire `npm run publish` da terminale per rendere le modifiche visibili
  (nessuna Cloud Function o CI/CD in questa fase, per restare senza backend custom).
