# PowerShell script to prepare the repository for GitHub Pages deployment

# Remove all files except .git and dist
Get-ChildItem -Path . -Exclude .git,dist,deploy.ps1 | Remove-Item -Recurse -Force

# Copy all files from dist to the root
Copy-Item -Path dist/* -Destination . -Recurse

# Remove the dist folder
Remove-Item -Path dist -Recurse -Force

Write-Host "Repository prepared for GitHub Pages deployment"
