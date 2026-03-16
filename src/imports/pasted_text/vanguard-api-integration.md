Prepare the VANGUARD frontend so it can connect cleanly to a file-based backend API that serves JSON records. The goal is to make backend integration almost plug-and-play.

Do not redesign UI components. Focus only on data loading, API structure, and data adapters.

---

DATA SOURCE LAYER

Create a centralized data access layer.

Add a service module such as:

services/api.ts

This module should contain functions responsible for loading application data from the backend.

Example functions:

fetchPilots()
fetchDeployments()
fetchGlossary()
fetchLocations()

These functions should call REST endpoints such as:

/api/pilots
/api/deployments
/api/glossary
/api/locations

All frontend components should retrieve data through this service layer rather than directly importing JSON files.

---

REMOVE STATIC DATA IMPORTS

Replace any direct imports of static JSON or mock data used during development.

For example remove patterns like:

import pilots from "./data/pilots.json"

Instead use:

fetchPilots()

The UI should behave the same, but the data should now come from the API layer.

---

DATA CONTEXT UPDATE

Update DataContext (or equivalent global state system) so that:

On application load it calls:

fetchPilots()
fetchDeployments()
fetchGlossary()
fetchLocations()

Store the results in global state.

All components should read data from this context instead of local mock files.

---

DEPLOYMENT SIGNUPS

Ensure the signup system is compatible with backend persistence.

Create API calls such as:

POST /api/deployments/{id}/signup
DELETE /api/deployments/{id}/signup/{pilot_id}

The frontend should update the local state after the request succeeds.

---

PILOT IMPORT

Prepare the pilot import interface so that it uploads a Comp/Con JSON file to:

POST /api/pilots/import

The backend will validate and store the file.

The frontend should show:

uploading state
validation errors
success confirmation

After a successful import, refresh the pilot list.

---

IMAGE AND MEDIA REFERENCES

Images should not be embedded in records.

Instead records should reference images using relative media paths such as:

/media/pilots/pilot-001.png
/media/deployments/deploy-004.jpg

The frontend should load these images directly from the backend static media server.

---

ERROR HANDLING

Add basic error handling for API requests:

* loading states
* network errors
* empty responses

Display user-friendly messages in the UI without breaking the interface.

---

GOAL

After these changes the frontend should behave exactly as it does now, but all content should be loaded from backend API endpoints instead of static development data.

This will allow a Node/Express backend to connect with minimal changes.
