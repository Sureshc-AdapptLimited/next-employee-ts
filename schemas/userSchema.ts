"use server";
import { Role, User } from "@prisma/client";

export type FormData = {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: Role;
  primaryOrganisationId: string | null;
  enabled: boolean;
};
