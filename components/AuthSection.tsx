"use client";

import {
  SignInButton,
  UserButton,
  useAuth,
  useUser,
} from "@clerk/nextjs";
import { LogIn } from "lucide-react";
import { useTranslation } from "react-i18next";

export type AuthState = {
  isSignedIn: boolean;
  isAdmin: boolean;
  isMember: boolean;
  memberLanguages: string[];
};

export function useAuthState(): AuthState {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === "admin";
  const isMember = user?.publicMetadata?.role === "member";
  const memberLanguages = (user?.publicMetadata?.languages as string[] | undefined) ?? [];
  return {
    isSignedIn: !!isSignedIn,
    isAdmin: !!isAdmin,
    isMember: !!isMember,
    memberLanguages,
  };
}

export default function AuthSection() {
  const { isSignedIn } = useAuth();
  const { t } = useTranslation("header");

  if (isSignedIn) {
    return (
      <UserButton
        appearance={{
          elements: {
            avatarBox: "h-8 w-8",
          },
        }}
      />
    );
  }

  return (
    <SignInButton mode="modal">
      <button className="text-white hover:text-accent transition-colors">
        <span className="hidden md:inline">{t("other.signIn")}</span>
        <LogIn className="h-5 w-5 md:hidden" />
      </button>
    </SignInButton>
  );
}
