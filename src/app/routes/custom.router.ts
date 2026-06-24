import { Router, type RequestHandler } from "express"
import { authMiddleware, permissionMiddleware } from "../features/auth/auth.middlewares.js";
import { Route } from "./route.types.js";

export const customRouter = () => {
  const router = Router();

  const constructMethods = (type: 'get' | 'put' | 'post' | 'patch' | 'delete') => (path: string, auth: {isPublic?: true, isPermitted?: string[]}, ...requestHandlers: RequestHandler[]) => {
    const mids = [];
    if(!auth.isPublic) {
      mids.push(authMiddleware);
      mids.push(permissionMiddleware(auth.isPermitted || []));
    }
    mids.push(...requestHandlers);
    router[type](path, ...mids);
  }

  return {
    get: constructMethods('get'),
    put: constructMethods('put'),
    post: constructMethods('post'),
    patch: constructMethods('patch'),
    delete: constructMethods('delete'),
    setRouter: (path: string) => new Route(path, router)
  }
}