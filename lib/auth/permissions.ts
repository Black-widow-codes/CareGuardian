export type UserRole =
  | "ADMIN"
  | "DISCHARGE_COORDINATOR"
  | "NURSE"
  | "PATIENT_SAFETY_OFFICER";

export type Permission =
  | "VIEW_PATIENTS"
  | "CREATE_PATIENT"
  | "EDIT_PATIENT"
  | "DELETE_PATIENT"
  | "VIEW_USERS"
  | "MANAGE_USERS"
  | "VIEW_AUDIT_LOGS";

const rolePermissions: Record<UserRole, Permission[]> = {
  ADMIN: [
    "VIEW_PATIENTS",
    "CREATE_PATIENT",
    "EDIT_PATIENT",
    "DELETE_PATIENT",
    "VIEW_USERS",
    "MANAGE_USERS",
    "VIEW_AUDIT_LOGS",
  ],

  DISCHARGE_COORDINATOR: [
    "VIEW_PATIENTS",
    "CREATE_PATIENT",
    "EDIT_PATIENT",
  ],

  NURSE: [
    "VIEW_PATIENTS",
    "EDIT_PATIENT",
  ],

  PATIENT_SAFETY_OFFICER: [
    "VIEW_PATIENTS",
    "VIEW_AUDIT_LOGS",
  ],
};

export function hasPermission(
  role: string | undefined,
  permission: Permission
): boolean {
  if (!role) return false;

  const typedRole = role as UserRole;
  const permissions = rolePermissions[typedRole];

  return permissions?.includes(permission) ?? false;
}