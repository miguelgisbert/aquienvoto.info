# Configuració d'Analytics i Estadístiques

## 🚀 Eines Implementades

### 1. Google Analytics 4 (GA4)

**Què fa:** Tracking complet de visites, comportament d'usuaris, temps en pàgina, etc.

**Configuració:**

1. Crear compte a [Google Analytics](https://analytics.google.com/)
2. Crear una propietat per "aquienvoto.info"
3. Copiar el Measurement ID (format: G-XXXXXXXXXX)
4. Reemplaçar "GA_MEASUREMENT_ID" al fitxer `index.html` pel teu ID real

**Què trackeja automàticament:**

- Visites a la pàgina
- Temps de permanència
- Dispositius i navegadors
- Geolocalització (país/ciutat)

### 2. Plausible Analytics

**Què fa:** Alternativa privacy-friendly a Google Analytics (respecta GDPR)

**Configuració:**

1. Crear compte a [Plausible.io](https://plausible.io/) (gratuït fins 10k visites/mes)
2. Afegir el domini "aquienvoto.info"
3. Ja està configurat! El script ja està al `index.html`

**Avantatges:**

- No necessita cookies
- Respecta la privacitat
- Dashboard simple i net
- Carrega més ràpid que GA4

### 3. Sistema d'Emmagatzematge de Respostes

**Què fa:** Guarda les respostes dels usuaris per anàlisi posterior

**Configuració actual:**

- Guarda a LocalStorage del navegador (només per desenvolupament)
- Tracking d'events personalitzats

**Events que es trackejen:**

- `test_started`: Quan l'usuari comença el test
- `question_answered`: Cada resposta seleccionada
- `question_navigation`: Navegació entre preguntes
- `test_completed`: Test finalitzat

## 📊 Opcions d'Emmagatzematge de Dades

### Opció A: Supabase (Recomanada - Gratuït)

1. Crear compte a [Supabase](https://supabase.com/)
2. Crear nou projecte
3. Crear taula per respostes:

```sql
CREATE TABLE user_responses (
  id SERIAL PRIMARY KEY,
  responses JSONB NOT NULL,
  timestamp TIMESTAMP DEFAULT NOW(),
  user_agent TEXT,
  language TEXT,
  screen_resolution TEXT,
  ip_hash TEXT
);
```

4. Instal·lar client:

```bash
npm install @supabase/supabase-js
```

5. Configurar al fitxer `useAnalytics.ts`:

```typescript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "YOUR_SUPABASE_URL";
const supabaseKey = "YOUR_SUPABASE_ANON_KEY";
const supabase = createClient(supabaseUrl, supabaseKey);
```

### Opció B: Firebase (Google)

1. Crear projecte a [Firebase Console](https://console.firebase.google.com/)
2. Activar Firestore Database
3. Configurar regles de seguretat

### Opció C: Formulari a Google Sheets

1. Crear Google Form
2. Enviar dades via fetch a l'URL del formulari
3. Més simple però menys flexible

## 🔍 Veure Estadístiques

### Estadístiques Locals (Desenvolupament)

- Afegir `?admin=true` a l'URL: `http://localhost:5173/?admin=true`
- Apareixerà un panell amb estadístiques bàsiques

### Estadístiques de Producció

- **Google Analytics:** Dashboard complet a analytics.google.com
- **Plausible:** Dashboard net a plausible.io/aquienvoto.info
- **Dades de respostes:** Si configures Supabase, pots crear dashboards personalitzats

## 🚀 Desplegament

Després de configurar els IDs reals:

```bash
npm run build
npm run deploy
```

## 📈 Mètriques Recomanades

### KPIs Bàsics:

- Visites totals
- Taxa de finalització del test (usuaris que arriben a Resultats)
- Pregunta amb més abandonament
- Respostes més populars per pregunta

### Análisi Avançat:

- Temps mig per completar el test
- Dispositius més utilitzats
- Horaris de més activitat
- Comparació setmanal/mensual

## ⚖️ Privacitat i GDPR

- Plausible és automàticament compatible amb GDPR
- Google Analytics pot necessitar banner de cookies
- Les dades emmagatzemades són anònimes
- No es guarden dades personals identificables

## 📝 Proxims Passos

1. ✅ Configurar Google Analytics amb ID real
2. ✅ Verificar Plausible funciona
3. 🔲 Decidir sistema d'emmagatzematge (Supabase recomanat)
4. 🔲 Crear dashboard personalitzat per respostes
5. 🔲 Configurar alertes per pics de tràfic
6. 🔲 Afegir A/B testing per millorar conversió
