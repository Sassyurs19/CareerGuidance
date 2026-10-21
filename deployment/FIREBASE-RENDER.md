# Career Guidance production deployment

Firebase project: `careerguidaance` · Web app: Career Guidance · Hosting site: `https://careerguidaance.web.app` · GitHub: `https://github.com/Sassyurs19/CareerGuidance` · Render project: CareerGuidance.

The Firebase web app is registered. Its public app settings are stored in the ignored `.env.production.local`. Do not commit that local file. Firebase client API keys identify an app; Firestore security rules and Auth protect user data. Firebase Admin credentials must stay only in Render Secret Files.

## Current status

- Source is pushed to GitHub `main`.
- Firebase Hosting site exists.
- Firestore default database is created; default deny rules have been deployed.
- Render project exists, but a Render Web Service still needs to be created.
- Email/Password provider must be enabled in Firebase Authentication (email verification can stay disabled).
- The production frontend build needs the Render service URL first.

## Create the Render API service

In the Render `CareerGuidance` project, choose **New Web Service**, connect `Sassyurs19/CareerGuidance`, and set:

- Runtime: Node
- Root directory: `/`
- Build: `npm ci --include=dev && npm run build:api`
- Start: `npm run start:api`
- Health check: `/health`
- Plan: Free
- `FIREBASE_PROJECT_ID=careerguidaance`
- `ALLOWED_ORIGINS=https://careerguidaance.web.app,https://careerguidaance.firebaseapp.com`
- `GOOGLE_APPLICATION_CREDENTIALS=/etc/secrets/firebase-service-account.json`

Create a Firebase service account credential with only the Firebase Auth and Firestore permissions this API needs. Add it as Render Secret File named `firebase-service-account.json`; do not put its JSON in GitHub, chat or local config files. `render.yaml` contains the service definition for review.

## Finish Firebase Hosting

Once Render shows the API URL, put it in `.env.production.local` as `VITE_API_URL=https://...onrender.com`. Then run `npm run build:hosting`, followed by `firebase deploy --only hosting --project careerguidaance`. Add `careerguidaance.web.app` to Firebase Auth authorized domains if needed.

## Firestore and account behavior

The browser uses Firebase Auth email/password without requiring verification. Render verifies ID tokens and owns plan validation, saved progress, optional route completion and resets. Firestore client rules deny all direct reads and writes; only the authenticated API accesses student records. Existing local accounts are not copied automatically; students register on the hosted site. WhatsApp automation remains coming soon.

The project is currently on Firebase Spark (no-cost) plan. No billing plan change was made. The Render API uses its free plan setting.
