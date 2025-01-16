"use server";

import * as bcrypt from "bcrypt";

const saltOrRounds = 10;

export async function encrypt(password: string) {
  const hash = await bcrypt.hash(password, saltOrRounds);
  return hash;
}

export async function compare(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}
