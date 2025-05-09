
// Auth routes
const authRoutes = {
  login: "/auth/login",
  logout: "/auth/logout",
  register: "/auth/register",
  resetPassword: "/auth/reset-password",
  forgotPassword: "/auth/forgot-password",
  refreshToken: "/auth/refresh-token"
};

// User routes
const userRoutes = {
  profile: "/user/profile",
  updateProfile: "/user/profile/update",
  changePassword: "/user/change-password"
};

// Organization routes
const organizationRoutes = {
  profile: "/organizations/profile",
  update: "/organizations/profile/update",
  staff: "/organizations/staff",
  departments: "/organizations/departments"
};

// Case management routes
const caseRoutes = {
  list: "/cases",
  create: "/cases/create",
  details: (id: string) => `/cases/${id}`,
  update: (id: string) => `/cases/${id}/update`,
  delete: (id: string) => `/cases/${id}/delete`,
  journey: (id: string) => `/cases/${id}/journey`,
  documents: (id: string) => `/cases/${id}/documents`
};

// Journey routes
const journeyRoutes = {
  list: (caseId: string) => `/cases/${caseId}/journey`,
  details: (id: string) => `/journey/${id}`,
  create: "/journey",
  update: (id: string) => `/journey/${id}`,
  delete: (id: string) => `/journey/${id}`,
  history: (id: string) => `/journey/${id}/history`
};

// Master data routes
const masterDataRoutes = {
  courts: {
    list: "/master-data/courts",
    create: "/master-data/courts/create",
    details: (id: string) => `/master-data/courts/${id}`,
    update: (id: string) => `/master-data/courts/${id}`,
    delete: (id: string) => `/master-data/courts/${id}`
  },
  lawTypes: {
    list: "/master-data/law-types",
    create: "/master-data/law-types/create",
    details: (id: string) => `/master-data/law-types/${id}`,
    update: (id: string) => `/master-data/law-types/${id}`,
    delete: (id: string) => `/master-data/law-types/${id}`
  },
  clients: {
    list: "/master-data/clients",
    create: "/master-data/clients/create",
    details: (id: string) => `/master-data/clients/${id}`,
    update: (id: string) => `/master-data/clients/${id}`,
    delete: (id: string) => `/master-data/clients/${id}`
  }
};

// Law firm routes
const lawFirmRoutes = {
  list: "/law-firms",
  create: "/law-firms/create",
  details: (id: string) => `/law-firms/${id}`,
  update: (id: string) => `/law-firms/${id}`,
  delete: (id: string) => `/law-firms/${id}`,
  toggleStatus: (id: string) => `/law-firms/${id}/toggle-status`,
  countries: "/law-firms/countries",
  states: (countryId: string) => `/law-firms/states/${countryId}`,
  cities: (stateId: string) => `/law-firms/cities/${stateId}`,
  plans: "/law-firms/plans"
};

// Plan routes
const planRoutes = {
  list: "/plans",
  create: "/plans/create",
  details: (id: string) => `/plans/${id}`,
  update: (id: string) => `/plans/${id}`,
  delete: (id: string) => `/plans/${id}`,
  toggleStatus: (id: string) => `/plans/${id}/toggle-status`
};

// Settings routes
const settingsRoutes = {
  get: "/settings",
  update: "/settings/update",
  uploadLogo: "/settings/upload-logo",
  uploadFavicon: "/settings/upload-favicon"
};

// Invoice routes
const invoiceRoutes = {
  list: "/invoices",
  create: "/invoices/create",
  details: (id: string) => `/invoices/${id}`,
  update: (id: string) => `/invoices/${id}`,
  delete: (id: string) => `/invoices/${id}`,
  generatePdf: (id: string) => `/invoices/${id}/generate-pdf`
};

const apiRoutes = {
  auth: authRoutes,
  user: userRoutes,
  organization: organizationRoutes,
  case: caseRoutes,
  journey: journeyRoutes,
  masterData: masterDataRoutes,
  lawFirm: lawFirmRoutes,
  plan: planRoutes,
  settings: settingsRoutes,
  invoice: invoiceRoutes
};

export default apiRoutes;
