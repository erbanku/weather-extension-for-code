# VS Code Marketplace Auto-Publishing Setup

This guide explains how to set up automatic publishing to the VS Code Marketplace using GitHub Actions.

## Prerequisites

1. **VS Code Marketplace Publisher Account**
   - Create a publisher account at https://marketplace.visualstudio.com/manage
   - Note your publisher name (should match the `publisher` field in `package.json`)

2. **Personal Access Token (PAT)**
   - Go to https://dev.azure.com/
   - Click on "User Settings" → "Personal Access Tokens"
   - Create a new token with:
     - **Name**: VS Code Marketplace Publishing
     - **Organization**: All accessible organizations
     - **Scopes**: Select "Marketplace" → "Manage" (full marketplace access)
     - **Expiration**: Set as needed (recommend 1 year, then renew)
   - **IMPORTANT**: Copy the token immediately - you won't see it again!

## Setup Steps

### 1. Add Secret to GitHub Repository

1. Go to your GitHub repository: https://github.com/erbanku/weather-extension-for-code
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the following secret:
   - **Name**: `VSCE_PAT`
   - **Value**: Your Personal Access Token from Azure DevOps

### 2. Publishing Methods

#### Method A: Using Git Tags (Recommended)

This is the most common approach for versioned releases:

```bash
# Update version in package.json first (if needed)
# Then create and push a tag
git tag v1.2.2
git push origin v1.2.2
```

**Important**: The tag version (e.g., `v1.2.2`) must match the version in `package.json` (e.g., `1.2.2`).

#### Method B: Manual Trigger

1. Go to **Actions** tab in your GitHub repository
2. Select **Publish to VS Code Marketplace** workflow
3. Click **Run workflow**
4. Select the branch and click **Run workflow**

### 3. Workflow Process

When triggered, the workflow will:

1. ✅ Checkout your code
2. ✅ Set up Node.js environment
3. ✅ Install dependencies
4. ✅ Verify version (for tag-based triggers)
5. ✅ Package the extension (`.vsix` file)
6. ✅ Publish to VS Code Marketplace
7. ✅ Upload the `.vsix` as an artifact (available in GitHub Actions)

## Version Management

### Updating Version for New Release

1. **Edit `package.json`**:
   ```json
   {
     "version": "1.2.2"
   }
   ```

2. **Commit the change**:
   ```bash
   git add package.json
   git commit -m "Bump version to 1.2.2"
   git push
   ```

3. **Create and push tag**:
   ```bash
   git tag v1.2.2
   git push origin v1.2.2
   ```

4. The GitHub Action will automatically:
   - Build and package your extension
   - Publish it to the marketplace
   - Users will see the update in VS Code

## Troubleshooting

### Common Issues

1. **"Error: Access denied" or "401 Unauthorized"**
   - Check that `VSCE_PAT` secret is set correctly
   - Verify your PAT hasn't expired
   - Ensure PAT has "Marketplace: Manage" permissions

2. **"Version mismatch" error**
   - Make sure tag version matches `package.json` version
   - Example: Tag `v1.2.2` should match package version `1.2.2`

3. **"Publisher not found"**
   - Verify `publisher` field in `package.json` matches your marketplace publisher name
   - Currently set to: `erbanku`

4. **Build failures**
   - Check the Actions tab for detailed error logs
   - Ensure all dependencies are properly listed in `package.json`
   - Test locally with `npm install && vsce package`

### Testing Locally

Before pushing, test the packaging locally:

```bash
# Install vsce globally
npm install -g @vscode/vsce

# Package the extension
vsce package

# This creates a .vsix file you can test
# Install it in VS Code: Extensions → ... → Install from VSIX
```

## Workflow File

The workflow is located at: `.github/workflows/publish.yml`

Key configuration:
- **Trigger**: On tags starting with `v` (e.g., `v1.2.2`)
- **Manual trigger**: Available via workflow_dispatch
- **Node version**: 18 (LTS)
- **Secret required**: `VSCE_PAT`

## Best Practices

1. **Always test locally** before creating a release tag
2. **Update CHANGELOG.md** with release notes
3. **Use semantic versioning**: MAJOR.MINOR.PATCH
   - MAJOR: Breaking changes
   - MINOR: New features (backward compatible)
   - PATCH: Bug fixes
4. **Keep your PAT secure** - never commit it to the repository
5. **Renew PAT before expiration** to avoid publishing interruptions

## Quick Release Checklist

- [ ] Test extension locally
- [ ] Update version in `package.json`
- [ ] Update `CHANGELOG.md`
- [ ] Commit and push changes
- [ ] Create and push version tag
- [ ] Monitor GitHub Actions for successful publish
- [ ] Verify extension appears in marketplace

## Resources

- [VS Code Publishing Guide](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [Azure DevOps PAT Documentation](https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
