Clean up and standardize the documentation of the VANGUARD project so that it accurately reflects the current application architecture and data model.

Do not redesign UI components or change application logic. This task is strictly about documentation clarity and consistency.

PROJECT ARCHITECTURE DOCUMENTATION

Update all project documentation so it clearly describes the current structure of the application.

The project should be documented as:

FrontendReact + TypeScript application providing the VANGUARD command interface.

BackendNode + Express server that serves JSON content and media files.

Data storageContent is stored as JSON files on disk rather than in a database.

Media storageImages are stored in media folders and referenced by records.

DATA STRUCTURE DOCUMENTATION

Document the core content types used in the system.

PilotsImported primarily from Comp/Con JSON exports.Stored as individual JSON records.

DeploymentsMission records containing operational information and player signup data.

GlossaryReference entries for lore and terminology.

LocationsStrategic locations referenced by deployments.

DEPLOYMENT DATA MODEL

Ensure documentation reflects the current deployment structure including fields such as:

id

title

system

status

classification

rulesOfEngagement

unionSupport

threatAssessment

mainImage

additionalImages

description

objectives

playerSignups

PLAYER SIGNUP MODEL

Document the structure of a deployment signup record.

Each signup contains:

pilot_id

player_name

note

signup_timestamp

signup_status

Explain that player accounts are not required. Signups are stored directly on the deployment record.

DEPLOYMENT STATUS STATES

Document the deployment lifecycle states used by the application.

Supported states:

PLANNEDACTIVELOCKEDCOMPLETEDARCHIVEDCLASSIFIEDAWAITING_DEBRIEF

Explain that mission outcomes remain classified and the system only exposes status changes.

FILE STRUCTURE

Document the expected backend folder structure.

Example:

data/pilots/deployments/glossary/locations/

media/pilots/deployments/locations/

Each record is stored as its own JSON file.

REMOVE OUTDATED INFORMATION

Remove or update any documentation that still refers to:

single combined JSON files such as pilots.json

legacy mock data systems

outdated deployment schemas

earlier prototype architecture

All documentation should reflect the current modular JSON file approach.

GOAL

The documentation should allow a developer unfamiliar with the project to quickly understand:

how the application is structured

how content is stored

how deployments and signups work

how Comp/Con pilot imports fit into the system