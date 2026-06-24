import { ResponseFormat } from "../../utils/response.format.js";

export const AUTH_RESPONSE : Record<
'TOKEN_NOT_FOUND' | 
'INVALID_TOKEN' |
'NOT_AUTHORIZED' |
'USER_REGISTERED' | 
'USER_NOT_REGISTERED' |
'INVALID_CREDENTIALS' | 
'LOGIN_SUCCESS'
, ResponseFormat> = {
  TOKEN_NOT_FOUND: new ResponseFormat(404, 'TOKEN NOT FOUND'),
  INVALID_TOKEN: new ResponseFormat(400, 'INVALID TOKEN'),
  NOT_AUTHORIZED: new ResponseFormat(400, 'NOT AUTHORIZED'),
  USER_REGISTERED: new ResponseFormat(201, 'USER REGISTERED'),
  USER_NOT_REGISTERED: new ResponseFormat(400, 'USER NOT REGISTERED'),
  INVALID_CREDENTIALS: new ResponseFormat(400, 'INVALID CREDENTIALS'),
  LOGIN_SUCCESS: new ResponseFormat(200, 'LOGIN SUCCESS')
}