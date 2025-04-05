# AWS Amplify Deployment Guide for SRE Copilot Demo

This guide will walk you through deploying the SRE Copilot Demo with the fixed multi-modal analysis functionality using GitHub and AWS Amplify.

## Prerequisites

1. GitHub account
2. AWS account with access to AWS Amplify
3. The SRE Copilot Demo code (already prepared in this repository)

## Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in to your account
2. Click on the "+" icon in the top-right corner and select "New repository"
3. Enter a repository name (e.g., "sre-copilot-demo")
4. Add a description (optional): "SRE Copilot Demo with Multi-Modal Analysis functionality"
5. Choose "Public" or "Private" visibility based on your preference
6. Click "Create repository"

## Step 2: Push Code to GitHub

After creating the repository, you'll see instructions for pushing an existing repository. Follow these commands:

```bash
# Add the remote repository URL (replace with your actual repository URL)
git remote add origin https://github.com/yourusername/sre-copilot-demo.git

# Push the code to GitHub
git push -u origin master
```

## Step 3: Deploy with AWS Amplify

1. Sign in to the [AWS Management Console](https://aws.amazon.com/console/)
2. Search for "Amplify" in the services search bar and select it
3. Click "New app" and select "Host web app"
4. Choose "GitHub" as your repository provider
5. Click "Continue"
6. If prompted, authorize AWS Amplify to access your GitHub account
7. Select the "sre-copilot-demo" repository from the list
8. Select the branch you want to deploy (usually "master" or "main")
9. Click "Next"

## Step 4: Configure Build Settings

1. The build settings should be automatically detected from the amplify.yml file in your repository
2. Review the settings to ensure they look correct:
   - App name: "sre-copilot-demo" (or your preferred name)
   - Branch name: "master" (or your selected branch)
   - Build settings: Should show the contents of your amplify.yml file
3. Click "Next"

## Step 5: Review and Deploy

1. Review all settings on the final page
2. Click "Save and deploy"

AWS Amplify will now deploy your application. This process typically takes a few minutes.

## Step 6: Access Your Deployed Website

1. Once deployment is complete, you'll see a "Domain" section in the Amplify console
2. Click on the URL provided (e.g., https://master.uniqueid.amplifyapp.com) to access your deployed website
3. Verify that the multi-modal analysis functionality works correctly with proper visual feedback

## Additional Configuration (Optional)

### Custom Domain

If you want to use a custom domain:

1. In the Amplify console, go to "Domain management"
2. Click "Add domain"
3. Follow the instructions to configure your custom domain

### Continuous Deployment

AWS Amplify automatically sets up continuous deployment. Any changes pushed to your GitHub repository will trigger a new deployment.

## Troubleshooting

If you encounter any issues during deployment:

1. Check the build logs in the Amplify console for error messages
2. Ensure all file paths in your HTML files are correct
3. Verify that the amplify.yml file is properly formatted
4. Check that all required files are included in your repository

## Support

If you need further assistance, refer to the [AWS Amplify documentation](https://docs.aws.amazon.com/amplify/) or contact AWS Support.
