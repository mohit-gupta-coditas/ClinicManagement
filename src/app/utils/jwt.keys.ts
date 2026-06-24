import fs from "fs";

export const publicKey = fs.readFileSync('./private.key', {encoding: 'utf-8'});
export const privateKey = fs.readFileSync('./public.key', {encoding: 'utf-8'});