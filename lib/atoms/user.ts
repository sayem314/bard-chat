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
  currentAccount: UserState | null; // Store full user state instead of index
}

export const accountsAtom = atom<AccountsState>({
  accounts: [],
  currentAccount: null,
});
