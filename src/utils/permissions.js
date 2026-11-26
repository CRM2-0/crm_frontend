import { PERMISSIONS, ROLE_PERMISSIONS, ROLES } from '@/constants/roles';

export const isSuperAdmin = (user) => user?.globalRole === ROLES.SUPER_ADMIN;

export function hasPermission(user, permission) {
  if (!user) return false;
  if (isSuperAdmin(user)) return true;
  return user.memberships?.some((membership) => ROLE_PERMISSIONS[membership.role]?.includes(permission)) ?? false;
}

export const canViewAllCompanies = (user) => hasPermission(user, PERMISSIONS.VIEW_ALL_COMPANIES);
