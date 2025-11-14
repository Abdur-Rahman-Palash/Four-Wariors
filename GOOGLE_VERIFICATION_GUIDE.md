# Google Search Console Verification Guide

## Step 1: Get Your Verification Code

1. Go to: https://search.google.com/search-console
2. Sign in with your Google account
3. Add property: `https://four-wariors.vercel.app`
4. Choose **"HTML tag"** verification method
5. Copy the verification code from the meta tag

Example:
```html
<meta name="google-site-verification" content="abcXYZ123abc_verification_code_here">
```

## Step 2: Add Code to Your Website

The verification code should be added to `index.html` in the `<head>` section:

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- YOUR GOOGLE VERIFICATION CODE HERE -->
    <meta name="google-site-verification" content="YOUR_CODE_HERE">
    ...rest of your head tags
</head>
```

## Step 3: Deploy & Verify

1. Add the meta tag to index.html
2. Deploy to Vercel (git push)
3. Go back to Google Search Console
4. Click "Verify"
5. Wait for confirmation (usually instant)

## What You'll Get After Verification

✅ Access to Search Performance data
✅ See which keywords bring traffic
✅ Track impressions, clicks, and average position
✅ Fix indexing issues
✅ Request re-indexing of pages
✅ Submit new sitemaps
✅ Monitor crawl errors
✅ Manage search appearance

## Troubleshooting

**Issue**: "Meta tag not found" or "Verification file not found"

**Solution**:
1. Make sure meta tag is in the `<head>` section (not body)
2. Deploy to Vercel: `git push`
3. Wait 5-10 minutes
4. Clear browser cache (Ctrl+Shift+Delete)
5. Try verification again

## Alternative Methods

If HTML tag verification fails:
1. **DNS Record** - Add CNAME record (requires domain registrar access)
2. **HTML File** - Upload verification file to root
3. **Google Analytics** - If you have Google Analytics on site
4. **Google Tag Manager** - If you use GTM

---

## Need Help?

Contact Google Support: https://support.google.com/webmasters

For this website, use:
- **Property URL**: https://four-wariors.vercel.app
- **Verification Method**: HTML tag (in index.html head)
