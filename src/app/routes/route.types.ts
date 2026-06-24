import type { Router } from "express";

export class Route {
  private static registeredRoutes : string[] = [];

  constructor(
    public path: string,
    public router: Router
  ) {
    if(!path.startsWith('/')) throw `${path} must start with '/'.`;
    if(Route.registeredRoutes.find(p => p === path)) throw `${path} is already registered.`
    Route.registeredRoutes.push(path);
  }
}

export type Routes = Route[];