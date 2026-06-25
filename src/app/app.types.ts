export interface Payload {
  userId: string;
  role: string;
}

export type ROLES = 'patient'| 'clinician' |'front-desk co-ordinator' | 'super-admin';

export type ATTACHMENT_TYPE = 'identification' | 'insurance card' | 'prior reports';

const createRoleManager = (roles : string[]) => {
  return {
    all : () => roles,
    pick : (...someRoles : string[]) => roles.filter((currRole) => someRoles.includes(currRole)),
    omit : (...someRoles : string[]) => roles.filter((currRole) => !someRoles.includes(currRole))
  }
}

export const MANAGE_ROLE = createRoleManager([
  'patient',
  'clinician',
  'front-desk co-ordinator',
  'super-admin'
]);