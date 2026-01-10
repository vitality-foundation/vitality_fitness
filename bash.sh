#!/bin/bash

set -e

commit_with_date() {
    DATE=$1
    MESSAGE=$2

    GIT_AUTHOR_DATE="$DATE" \
    GIT_COMMITTER_DATE="$DATE" \
    git commit -m "$MESSAGE"
}

echo "Creating develop branch..."
git checkout -b develop


# ==========================
# Month 1 - Authentication
# ==========================

git checkout -b feature/auth-system

echo "auth module" > auth.txt
git add .
commit_with_date "2026-01-10T10:15:00" "Add authentication module"

echo "auth validation" >> auth.txt
git add .
commit_with_date "2026-01-22T14:30:00" "Add authentication validation"

echo "token handling" >> auth.txt
git add .
commit_with_date "2026-02-05T09:45:00" "Implement token handling"


git checkout develop
git merge --no-ff feature/auth-system \
-m "Merge authentication feature"


# ==========================
# Month 2 - Dashboard UI
# ==========================

git checkout -b feature/dashboard-ui

echo "dashboard layout" > dashboard.txt
git add .
commit_with_date "2026-02-18T11:00:00" "Create dashboard layout"

echo "dashboard components" >> dashboard.txt
git add .
commit_with_date "2026-03-03T15:20:00" "Add dashboard components"

echo "responsive design" >> dashboard.txt
git add .
commit_with_date "2026-03-20T13:10:00" "Improve dashboard responsiveness"


git checkout develop
git merge --no-ff feature/dashboard-ui \
-m "Merge dashboard UI feature"


# ==========================
# Month 3 - API Layer
# ==========================

git checkout -b feature/api-layer

echo "API service" > api.txt
git add .
commit_with_date "2026-04-02T10:30:00" "Create API service layer"

echo "API middleware" >> api.txt
git add .
commit_with_date "2026-04-15T16:00:00" "Add API middleware"

echo "API optimization" >> api.txt
git add .
commit_with_date "2026-04-28T09:20:00" "Optimize API handling"


git checkout develop
git merge --no-ff feature/api-layer \
-m "Merge API layer feature"


# ==========================
# Month 4 - Release
# ==========================

git checkout -b release/v1.0

echo "release notes" > CHANGELOG.md
git add .
commit_with_date "2026-05-10T12:00:00" "Prepare release documentation"

echo "final fixes" >> CHANGELOG.md
git add .
commit_with_date "2026-05-22T14:45:00" "Apply final release fixes"


git checkout main
git merge --no-ff release/v1.0 \
-m "Release version 1.0"

git tag -a v1.0.0 \
-m "Version 1.0.0" \
$(git rev-parse HEAD)


echo "Finished creating 4-month development history"