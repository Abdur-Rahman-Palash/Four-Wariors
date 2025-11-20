/*
  Example: create a file named `firebase-config.js` in your local workspace (NOT committed to git)
  and add the real config there. This example shows the structure without real keys.

  Do NOT commit the real `firebase-config.js` to source control. Add it to `.gitignore`.

  Usage (in your page, loaded before admin scripts):
    <script src="/firebase-config.js"></script>

  Content example (replace placeholders with your actual values):
*/

window.FIREBASE_CONFIG = {
  apiKey: 'REPLACE_WITH_YOUR_API_KEY',
  authDomain: 'REPLACE_WITH_YOUR_PROJECT.firebaseapp.com',
  projectId: 'REPLACE_WITH_YOUR_PROJECT_ID',
  storageBucket: 'REPLACE_WITH_YOUR_PROJECT.appspot.com',
  messagingSenderId: 'REPLACE_WITH_SENDER_ID',
  appId: 'REPLACE_WITH_APP_ID'
};

/*
  Important notes:
  - Firebase "web config" (apiKey, authDomain, etc.) is intended to be public in client apps.
    However, if you prefer to keep it out of the repo, use a local file as described or inject
    the values from your hosting platform at build/runtime (Vercel, Render, Netlify env vars).
  - For true secrets (service account keys), NEVER put them client-side; use a server-side
    proxy or Cloud Function with Firebase Admin SDK instead.
*/
