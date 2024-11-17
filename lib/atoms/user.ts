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
  currentAccount: UserState | null;
}

const atomWithLocalStorage = <T>(key: string, initialValue: T) => {
  const getInitialValue = (): T => {
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem(key);
      if (storedValue !== null) {
        return JSON.parse(storedValue);
      }
      return initialValue;
    }
    return initialValue;
  };

  const baseAtom = atom<T>(getInitialValue());

  const derivedAtom = atom(
    (get) => get(baseAtom),
    (get, set, newValue: T) => {
      if (newValue === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
      set(baseAtom, newValue);
    },
  );

  return derivedAtom;
};

export const accountsAtom = atomWithLocalStorage<AccountsState>("accounts", {
  accounts: [],
  currentAccount: null,
});
