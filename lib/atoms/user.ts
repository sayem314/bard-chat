import { atom } from "jotai";

export interface UserState {
  host: string;
  accessJwt: string;
  did: string;
  handle: string;
  refreshJwt: string;
  active?: boolean;
  didDoc?: Record<string, unknown>;
  email?: string;
  emailAuthFactor?: boolean;
  emailConfirmed?: boolean;
  status?: string;
}

// Store multiple accounts
export interface AccountsState {
  accounts: UserState[];
  currentAccount: number; // Index of the currently active account
}

export const accountsAtom = atom<AccountsState>({
  accounts: [],
  currentAccount: -1,
});
