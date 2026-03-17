Make a final polish pass on the VANGUARD frontend to improve system reliability and UX before backend integration.

Do not redesign the interface. Keep the current layout and visual style.

Focus only on improving data state handling, import feedback, naming consistency, and documentation clarity.

---

DATA STATE HANDLING

Ensure every screen that loads data from the API properly handles four states:

1. Loading
2. Backend unavailable
3. Empty data
4. Data loaded

Loading state:
Show subtle loading indicators when pilots, deployments, glossary, or locations are being fetched.

Backend unavailable:
If the API cannot be reached, display a clear message such as:
"Backend connection unavailable. Running in local data mode."

Empty state:
If a list returns no records, show a purposeful message such as:
"No pilots registered in the system."

Loaded state:
Display content normally.

These states should be handled consistently across:

* Pilots
* Deployments
* Locations
* Glossary

---

PILOT IMPORT UX

Improve the pilot import interface.

The import workflow should clearly show these stages:

1. File uploading
2. JSON validation
3. Import success
4. Import failure

Success state:
Display confirmation and refresh the pilot list.

Failure state:
Show validation errors clearly (invalid JSON, duplicate ID, missing required fields).

---

NAMING CONSISTENCY

Perform a naming consistency pass across UI labels and data fields.

Ensure the following remain consistent everywhere:

Deployment status names:
PLANNED
ACTIVE
LOCKED
COMPLETED
ARCHIVED
CLASSIFIED
AWAITING_DEBRIEF

Signup fields:
pilot_id
player_name
note
signup_timestamp
signup_status

Admin labels and frontend labels should use the same terminology.

---

EMPTY LIST UX

Improve empty list presentation for:

Pilots
Deployments
Locations
Glossary

Instead of blank areas, show subtle informative placeholders.

Example:
"No deployments available at this time."

---

DOCUMENTATION CLEANUP

Perform a final documentation cleanup.

Ensure the documentation consistently describes the project as:

* React frontend
* Node/Express backend
* JSON file storage
* Comp/Con pilot import

Remove leftover references to legacy mock data systems where possible.

---

GOAL

The goal is to ensure the frontend behaves predictably in all data states and that the project documentation and naming are fully consistent before backend integration begins.
