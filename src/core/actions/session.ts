"use server";

import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { SessionData, sessionOptions } from "../lib/session";

export const getSession = async () => {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );

  return session;
};

export const logoutSession = async () => {
  const session = await getSession();
  session.destroy();
};
