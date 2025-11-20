**Keeping Firebase & other keys confidential**

- **Do not commit** credentials or service account files to git. Add them to `.gitignore` (this repo includes a `.gitignore` entry for `firebase-config.js`).
- If you're using a hosting provider (Vercel, Netlify, Render), set the Firebase config and service account values as environment variables and inject them at build or via a serverless function. Do NOT hard-code them into tracked files.
- Reminder: the Firebase *web config* (apiKey, authDomain, projectId, etc.) is used by client-side SDKs and is not a secret in the same sense as a service-account JSON. Still, treat it carefully and avoid publishing it in public repos if you prefer privacy.
- For operations requiring elevated privileges (writes that must be protected), use a server-side proxy that uses the Firebase Admin SDK with a service account. Store the service account JSON as a secret on your server/hosting provider, not in the repo.
- If you accidentally committed secrets, rotate them immediately and remove them from git history using tools like `git filter-repo` or the BFG Repo-Cleaner. Example (local steps):

  - Rotate the credential in the Firebase Console.
  - Remove the secret from history with `git filter-repo --path firebase-config.js --invert-paths` or BFG.
  - Force-push the cleaned history: `git push --force --all` (coordinate with collaborators).

- Quick deployment tips:
  - Vercel: add env vars under Project Settings → Environment Variables. Use a build step or serverless function to write them into an untracked `firebase-config.js` if you must serve them at runtime.
  - Netlify: add site-wide env vars and use a function to serve secure endpoints.
  - Render: add env vars and use a private service to interact with Firestore via Admin SDK.

- If you want, I can help: (A) add a local-only `firebase-config.js` loader and example, (B) implement a server-side proxy using Firebase Admin SDK, or (C) generate step-by-step deployment instructions for Vercel/Netlify/Render.
