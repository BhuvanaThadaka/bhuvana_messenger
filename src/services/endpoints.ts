
// Use environment variable for BASE_URL with a fallback
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export const ENDPOINTS = {
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
    SIGNUP: `${BASE_URL}/auth/signup`,
    LOGOUT: `${BASE_URL}/auth/logout`,
  },
  USER: {
    PROFILE: `${BASE_URL}/users/profile`,
    UPDATE_PROFILE: `${BASE_URL}/users/profile/update`,
  },
  ORGANIZATION: {
    COMPANY_PROFILE: `${BASE_URL}/organizations/profile`,
    UPDATE_COMPANY_PROFILE: `${BASE_URL}/organizations/profile/update`,
  },
  DASHBOARD: {
    SUPER_ADMIN: `${BASE_URL}/dashboard/super-admin`,
    ORGANIZATION: `${BASE_URL}/dashboard/organization`,
    INDIVIDUAL: `${BASE_URL}/dashboard/individual`,
    LAW_FIRM_METRICS: `${BASE_URL}/dashboard/law-firm-metrics`,
  },
  CASE: {
    LIST: `${BASE_URL}/cases`,
    CREATE: `${BASE_URL}/cases/create`,
    UPDATE: `${BASE_URL}/cases/update`,
    DELETE: `${BASE_URL}/cases/delete`,
    DETAILS: (id: string) => `${BASE_URL}/cases/${id}`,
  },
  INVOICE: {
    LIST: `${BASE_URL}/invoices`,
    CREATE: `${BASE_URL}/invoices/create`,
    DETAILS: (id: string) => `${BASE_URL}/invoices/${id}`,
  },
  DOCUMENT: {
    LIST: `${BASE_URL}/documents`,
    UPLOAD: `${BASE_URL}/documents/upload`,
  },
  MASTER_DATA: {
    // Courts
    COURTS: {
      LIST: `${BASE_URL}/master-data/courts`,
      CREATE: `${BASE_URL}/master-data/courts/create`,
      UPDATE: (id: string) => `${BASE_URL}/master-data/courts/${id}`,
      DELETE: (id: string) => `${BASE_URL}/master-data/courts/${id}`,
      DETAILS: (id: string) => `${BASE_URL}/master-data/courts/${id}`,
    },
    // Law Types
    LAW_TYPES: {
      LIST: `${BASE_URL}/master-data/law-types`,
      CREATE: `${BASE_URL}/master-data/law-types/create`,
      UPDATE: (id: string) => `${BASE_URL}/master-data/law-types/${id}`,
      DELETE: (id: string) => `${BASE_URL}/master-data/law-types/${id}`,
      DETAILS: (id: string) => `${BASE_URL}/master-data/law-types/${id}`,
    },
    // Clients
    CLIENTS: {
      LIST: `${BASE_URL}/master-data/clients`,
      CREATE: `${BASE_URL}/master-data/clients/create`,
      UPDATE: (id: string) => `${BASE_URL}/master-data/clients/${id}`,
      DELETE: (id: string) => `${BASE_URL}/master-data/clients/${id}`,
      DETAILS: (id: string) => `${BASE_URL}/master-data/clients/${id}`,
    },
    LIST: `${BASE_URL}/master-data`,
    UPDATE: `${BASE_URL}/master-data/update`,
    COUNTRIES: `${BASE_URL}/master-data/countries`,
    COUNTRY: {
      CREATE: `${BASE_URL}/master-data/countries/create`,
      UPDATE: (id: string) => `${BASE_URL}/master-data/countries/${id}`,
      DELETE: (id: string) => `${BASE_URL}/master-data/countries/${id}`,
      DETAILS: (id: string) => `${BASE_URL}/master-data/countries/${id}`,
    },
    STATES: {
      LIST: (countryId: string) => `${BASE_URL}/master-data/countries/${countryId}/states`,
      CREATE: `${BASE_URL}/master-data/states/create`,
      UPDATE: (id: string) => `${BASE_URL}/master-data/states/${id}`,
      DELETE: (id: string) => `${BASE_URL}/master-data/states/${id}`,
      DETAILS: (id: string) => `${BASE_URL}/master-data/states/${id}`,
    },
    CITIES: {
      LIST: (stateId: string) => `${BASE_URL}/master-data/states/${stateId}/cities`,
      CREATE: `${BASE_URL}/master-data/cities/create`,
      UPDATE: (id: string) => `${BASE_URL}/master-data/cities/${id}`,
      DELETE: (id: string) => `${BASE_URL}/master-data/cities/${id}`,
      DETAILS: (id: string) => `${BASE_URL}/master-data/cities/${id}`,
    },
  },
  LAW_FIRM: {
    LIST: `${BASE_URL}/law-firms`,
    CREATE: `${BASE_URL}/law-firms/create`,
    UPDATE: (id: string) => `${BASE_URL}/law-firms/${id}`,
    DELETE: (id: string) => `${BASE_URL}/law-firms/${id}`,
    DETAILS: (id: string) => `${BASE_URL}/law-firms/${id}`,
    TOGGLE_STATUS: (id: string) => `${BASE_URL}/law-firms/${id}/toggle-status`,
    COUNTRIES: `${BASE_URL}/law-firms/countries`,
    STATES: (countryId: string) => `${BASE_URL}/law-firms/states/${countryId}`,
    CITIES: (stateId: string) => `${BASE_URL}/law-firms/cities/${stateId}`,
    PLANS: `${BASE_URL}/law-firms/plans`,
  },
  PLAN: {
    LIST: `${BASE_URL}/plans`,
    CREATE: `${BASE_URL}/plans/create`,
    UPDATE: (id: string) => `${BASE_URL}/plans/${id}`,
    DELETE: (id: string) => `${BASE_URL}/plans/${id}`,
    DETAILS: (id: string) => `${BASE_URL}/plans/${id}`,
    TOGGLE_STATUS: (id: string) => `${BASE_URL}/plans/${id}/toggle-status`,
  },
  SETTINGS: {
    GET: `${BASE_URL}/settings`,
    UPDATE: `${BASE_URL}/settings/update`,
    UPLOAD_LOGO: `${BASE_URL}/settings/upload-logo`,
    UPLOAD_FAVICON: `${BASE_URL}/settings/upload-favicon`,
  },
  STAFF: {
    LIST: `${BASE_URL}/staff`,
    CREATE: `${BASE_URL}/staff/create`,
    UPDATE: (id: string) => `${BASE_URL}/staff/${id}`,
    DELETE: (id: string) => `${BASE_URL}/staff/${id}`,
    DETAILS: (id: string) => `${BASE_URL}/staff/${id}`,
    TOGGLE_STATUS: (id: string) => `${BASE_URL}/staff/${id}/toggle-status`,
  }
};
