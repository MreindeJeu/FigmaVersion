/**
 * V.A.N.G.U.A.R.D. API Service Layer
 * 
 * Centralized data access for all backend API calls.
 * All components should use these functions instead of direct imports.
 */

import type { CompconPilot, Deployment, Location } from "../data/mockData";
import type { GlossaryEntry } from "../data/glossaryData";

// API base URL - automatically uses proxy in dev, or environment variable in production
const API_URL = import.meta.env.VITE_API_URL || '/api';

/**
 * Generic fetch wrapper with error handling
 */
async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// ============================================================================
// PILOTS
// ============================================================================

/**
 * Fetch all pilots from the backend
 */
export async function fetchPilots(): Promise<CompconPilot[]> {
  return apiFetch<CompconPilot[]>('/pilots');
}

/**
 * Create a new pilot
 */
export async function createPilot(pilot: CompconPilot): Promise<CompconPilot> {
  return apiFetch<CompconPilot>('/pilots', {
    method: 'POST',
    body: JSON.stringify(pilot),
  });
}

/**
 * Update an existing pilot
 */
export async function updatePilot(id: string, pilot: Partial<CompconPilot>): Promise<CompconPilot> {
  return apiFetch<CompconPilot>(`/pilots/${id}`, {
    method: 'PUT',
    body: JSON.stringify(pilot),
  });
}

/**
 * Delete a pilot
 */
export async function deletePilot(id: string): Promise<void> {
  return apiFetch<void>(`/pilots/${id}`, {
    method: 'DELETE',
  });
}

/**
 * Import a COMP/CON pilot JSON file
 */
export async function importPilot(pilotData: CompconPilot): Promise<CompconPilot> {
  return apiFetch<CompconPilot>('/pilots/import', {
    method: 'POST',
    body: JSON.stringify(pilotData),
  });
}

// ============================================================================
// DEPLOYMENTS
// ============================================================================

/**
 * Fetch all deployments from the backend
 */
export async function fetchDeployments(): Promise<Deployment[]> {
  return apiFetch<Deployment[]>('/deployments');
}

/**
 * Create a new deployment
 */
export async function createDeployment(deployment: Deployment): Promise<Deployment> {
  return apiFetch<Deployment>('/deployments', {
    method: 'POST',
    body: JSON.stringify(deployment),
  });
}

/**
 * Update an existing deployment
 */
export async function updateDeployment(id: string, deployment: Partial<Deployment>): Promise<Deployment> {
  return apiFetch<Deployment>(`/deployments/${id}`, {
    method: 'PUT',
    body: JSON.stringify(deployment),
  });
}

/**
 * Delete a deployment
 */
export async function deleteDeployment(id: string): Promise<void> {
  return apiFetch<void>(`/deployments/${id}`, {
    method: 'DELETE',
  });
}

/**
 * Sign up a player for a deployment
 */
export async function signupForDeployment(
  deploymentId: string,
  signup: {
    pilot_id: string;
    player_name: string;
    note?: string;
    signup_status: 'CONFIRMED' | 'STANDBY' | 'WITHDRAWN';
  }
): Promise<Deployment> {
  return apiFetch<Deployment>(`/deployments/${deploymentId}/signup`, {
    method: 'POST',
    body: JSON.stringify(signup),
  });
}

/**
 * Remove a player signup from a deployment
 */
export async function removeSignup(
  deploymentId: string,
  pilotId: string
): Promise<Deployment> {
  return apiFetch<Deployment>(`/deployments/${deploymentId}/signup/${pilotId}`, {
    method: 'DELETE',
  });
}

// ============================================================================
// GLOSSARY
// ============================================================================

/**
 * Fetch all glossary entries from the backend
 */
export async function fetchGlossary(): Promise<GlossaryEntry[]> {
  return apiFetch<GlossaryEntry[]>('/glossary');
}

/**
 * Create a new glossary entry
 */
export async function createGlossaryEntry(entry: GlossaryEntry): Promise<GlossaryEntry> {
  return apiFetch<GlossaryEntry>('/glossary', {
    method: 'POST',
    body: JSON.stringify(entry),
  });
}

/**
 * Update an existing glossary entry
 */
export async function updateGlossaryEntry(id: string, entry: Partial<GlossaryEntry>): Promise<GlossaryEntry> {
  return apiFetch<GlossaryEntry>(`/glossary/${id}`, {
    method: 'PUT',
    body: JSON.stringify(entry),
  });
}

/**
 * Delete a glossary entry
 */
export async function deleteGlossaryEntry(id: string): Promise<void> {
  return apiFetch<void>(`/glossary/${id}`, {
    method: 'DELETE',
  });
}

// ============================================================================
// LOCATIONS
// ============================================================================

/**
 * Fetch all locations from the backend
 */
export async function fetchLocations(): Promise<Location[]> {
  return apiFetch<Location[]>('/locations');
}

/**
 * Create a new location
 */
export async function createLocation(location: Location): Promise<Location> {
  return apiFetch<Location>('/locations', {
    method: 'POST',
    body: JSON.stringify(location),
  });
}

/**
 * Update an existing location
 */
export async function updateLocation(id: string, location: Partial<Location>): Promise<Location> {
  return apiFetch<Location>(`/locations/${id}`, {
    method: 'PUT',
    body: JSON.stringify(location),
  });
}

/**
 * Delete a location
 */
export async function deleteLocation(id: string): Promise<void> {
  return apiFetch<void>(`/locations/${id}`, {
    method: 'DELETE',
  });
}
