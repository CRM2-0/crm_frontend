export const ROLES = Object.freeze({
  SUPER_ADMIN: "SUPER_ADMIN",
  COMPANY_ADMIN: "COMPANY_ADMIN",
  STAFF: "STAFF",
});

export const PERMISSIONS = Object.freeze({
  VIEW_DASHBOARD: "dashboard:read",
  READ_CRM: "crm:read",
  MANAGE_CRM: "crm:manage",
  MANAGE_COMPANY: "company:manage",
  VIEW_ALL_COMPANIES: "company:read-all",
});

export const ROLE_PERMISSIONS = Object.freeze({
  [ROLES.SUPER_ADMIN]: Object.values(PERMISSIONS),
  [ROLES.COMPANY_ADMIN]: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.READ_CRM,
    PERMISSIONS.MANAGE_CRM,
    PERMISSIONS.MANAGE_COMPANY,
  ],
  [ROLES.STAFF]: [PERMISSIONS.VIEW_DASHBOARD, PERMISSIONS.READ_CRM],
});
