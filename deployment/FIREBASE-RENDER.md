# Career Guidance production setup

Project: Firebase `careerguidaance` · GitHub `Sassyurs19/CareerGuidance` · Render workspace project `CareerGuidance`.

The Firebase web app is registered. Its public app settings live in the ignored local `.env.production.local`; use the provided example only as a template. The Firebase web API key is designed to be public in client apps. Service account credentials must never go in the repository or this file.

## Required account-console steps

1. In Firebase Authentication, enable Email/Password sign-in. Leave email verification off as requested.
2. Create the default Firestore database in the Firebase console. Firestore is not enabled yet for this project. Choose a nearby region carefully; its database region cannot be changed later. The backend uses the default database. The Firebase project is on Spark (no-cost) plan; don't upgrade without deciding about billing.
3. Create a Render secret file named `firebase-service-account.json` from a service account in this Firebase project with least-privilege Firestore and Firebase Auth access. Add it under Render service Secret Files. Never commit it or paste it in chat.
4. Create a Render Web Service from `Sassyurs19/CareerGuidance` (connect GitHub if prompted), root directory `/`, build command `npm ci --include=dev && npm run build:api`, start command `npm run start:api`, health path `/health`. Set the variables shown in `render.yaml`; set the secret file path `/etc/secrets/firebase-service-account.json`. Use the free plan for now.
5. Copy the assigned Render URL into `VITE_API_URL` in `.env.production.local`, then run `npm run build:hosting` and deploy the static output with `firebase deploy --only hosting --project careerguidaance`.
6. Add `https://careerguidaance.web.app` to Firebase Auth authorized domains if it is not already present.

## Build and deploy

`npm run build:api` bundles the Render API. `npm run build:hosting` builds the Firebase static website and requires the HTTPS Render URL in `.env.production.local`. Firebase Hosting rewrites browser routes to the SPA entry; the API remains at Render. GitHub Actions is set to deploy the API through Render's connected repository; deploy static Hosting from the local Firebase CLI after creating the API URL.

The app uses Firebase Auth for sign-in and a Render API for plan storage, validation and account actions. Firestore rules deny direct browser access; the trusted API verifies Firebase ID tokens. The existing local Cloudflare/D1 workflow stays available for the local demo. Old local accounts and plans are not automatically copied to Firebase; students create accounts on the hosted version.

## Current status

Firebase web app registered; Render workspace project exists; repository exists and is empty. Render service has not been created. Firestore API/database and Email/Password provider are not enabled. Publication waits for those console steps and the Render service URL/secret file. The default-deny rules file is included and can be deployed once Firestore is enabled.
