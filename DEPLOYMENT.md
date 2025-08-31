# GitHub Pages Deployment Instructions

## What's been configured:

✅ **Next.js Static Export**: Configured `next.config.ts` with `output: 'export'`  
✅ **GitHub Actions Workflow**: Created `.github/workflows/deploy.yml`  
✅ **Base Path Configuration**: Set up for `/portfolio` repository  
✅ **Build Process**: Fixed linting issues and build errors  
✅ **Static Assets**: Configured for GitHub Pages hosting  

## Deployment Steps:

### 1. Repository Setup
1. Create a new GitHub repository named `portfolio`
2. Push your code to the `main` branch:
   ```bash
   git add .
   git commit -m "Initial commit - portfolio ready for deployment"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git push -u origin main
   ```

### 2. Enable GitHub Pages
1. Go to your repository on GitHub
2. Navigate to **Settings** > **Pages**
3. Under "Source", select **GitHub Actions**
4. The workflow will automatically deploy when you push to `main`

### 3. Your site will be available at:
```
https://YOUR_USERNAME.github.io/portfolio/
```

## Important Notes:

- **Repository Name**: Make sure your repository is named `portfolio` to match the `basePath` configuration
- **Branch**: The workflow is set to trigger on pushes to the `main` branch
- **Build Time**: First deployment may take 2-3 minutes
- **Custom Domain**: You can add a custom domain in Settings > Pages if desired

## Local Development:
```bash
npm run dev    # Development server
npm run build  # Production build
```

The build generates static files in the `out/` directory which GitHub Pages will serve.

## Troubleshooting:
- If images don't load, check that they're in the `public/` directory
- If styles are broken, the `basePath` configuration handles asset paths
- Check GitHub Actions tab for deployment logs if there are issues

Your portfolio is ready to showcase your work! 🌟
