export interface Payload {
  userId: string;
  role: string;
}

export type ROLES = 'paitent'| 'clinician' |'front-desk co-ordinator';

const createRoleManager = (roles : string[]) => {
  return {
    all : () => roles,
    pick : (...someRoles : string[]) => roles.filter((currRole) => someRoles.includes(currRole)),
    omit : (...someRoles : string[]) => roles.filter((currRole) => !someRoles.includes(currRole))
  }
}

export const MANAGE_ROLE = createRoleManager([
  'paitent',
  'clinician',
  'front-desk co-ordinator'
]);