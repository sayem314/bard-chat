"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Spacer } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import { FiLock, FiGlobe } from "react-icons/fi";
import { RiAtLine } from "react-icons/ri";
import { AtpAgent } from "@atproto/api";
import { useAtom } from "jotai";
import { accountsAtom, type UserState, type AccountsState } from "@/lib/atoms/user";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hosting, setHosting] = useState("https://bsky.social");
  const [customHosting, setCustomHosting] = useState("");
  const [accounts, setAccounts] = useAtom(accountsAtom);

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
      general: "",
    };
    let isValid = true;

    if (!formData.email) {
      newErrors.email = "Email or username is required";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const agent = new AtpAgent({ service: hosting });
      const response = await agent.login({
        identifier: formData.email,
        password: formData.password,
      });

      const newAccount: UserState = {
        host: hosting,
        accessJwt: response.data.accessJwt,
        did: response.data.did,
        handle: response.data.handle,
        refreshJwt: response.data.refreshJwt,
        active: response.data.active,
        didDoc: response.data.didDoc,
        email: response.data.email,
        emailAuthFactor: response.data.emailAuthFactor,
        emailConfirmed: response.data.emailConfirmed,
        status: response.data.status,
      };

      const existingAccountIndex = accounts.accounts.findIndex((account) => account.did === newAccount.did);

      const newState: AccountsState =
        existingAccountIndex !== -1
          ? {
              accounts: accounts.accounts.map((account, index) =>
                index === existingAccountIndex ? newAccount : account,
              ),
              currentAccount: newAccount,
            }
          : {
              accounts: [newAccount, ...accounts.accounts],
              currentAccount: newAccount,
            };

      setAccounts(newState);
      router.push("/");
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        general: (err as Error).message ?? "Failed to login. Please check your credentials.",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleHostingSubmit = () => {
    if (customHosting) {
      let formattedHosting = customHosting;
      if (!customHosting.startsWith("http")) {
        formattedHosting = `https://${customHosting}`;
      }
      setHosting(formattedHosting);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-800">
      <div className="w-full max-w-lg mx-auto p-6 flex flex-col justify-center">
        {/* Logo Section */}
        <div className="flex justify-center mb-8">
          <Image
            src="/images/Bluesky_Logo.svg"
            alt="Bluesky Logo"
            width={48}
            height={48}
            className="text-blue-500 dark:text-blue-400"
          />
        </div>

        <div className="bg-white dark:bg-gray-700/50 backdrop-blur-sm rounded-2xl p-8 space-y-6 shadow-xl border border-gray-200 dark:border-gray-600/50">
          {/* Header */}
          <div className="text-center mb-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Sign in to your Bluesky account</p>
          </div>

          {/* Form Fields */}
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {errors.general && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <p className="text-sm text-red-600 dark:text-red-400">{errors.general}</p>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-gray-600 dark:text-gray-400 text-sm font-medium">Hosting Provider</label>
              <div className="flex gap-2 items-center">
                <div className="relative flex-1">
                  <FiGlobe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={hosting}
                    readOnly
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-200"
                  />
                </div>
                <Button color="primary" variant="flat" onPress={() => setIsModalOpen(true)} className="px-4">
                  Change
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                Account <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <RiAtLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Email or username"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-lg bg-white dark:bg-gray-800/50 border ${
                    errors.email ? "border-red-500" : "border-gray-200 dark:border-gray-700"
                  } text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-500/40 focus:border-blue-500 transition-all`}
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-lg bg-white dark:bg-gray-800/50 border ${
                    errors.password ? "border-red-500" : "border-gray-200 dark:border-gray-700"
                  } text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-500/40 focus:border-blue-500 transition-all`}
                />
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            {/* Login Button */}
            <Button color="primary" fullWidth onClick={handleLogin} isLoading={isLoading} className="mt-4">
              Sign In
            </Button>

            {/* Links */}
            <div className="text-center space-y-4 pt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-blue-600 dark:text-blue-400 hover:underline">
                  Sign up
                </Link>
              </p>
              <Link
                href="https://blueskyweb.zendesk.com/hc/en-us/requests/new"
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                Need help? <span className="text-blue-600 dark:text-blue-400">Contact support</span>
              </Link>
            </div>
          </form>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        size="xl"
        placement="center"
        scrollBehavior="inside"
        classNames={{
          base: "border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800",
          backdrop: "bg-gray-900/50 backdrop-opacity-40",
          header: "border-b border-gray-200 dark:border-gray-700",
          footer: "border-t border-gray-200 dark:border-gray-700",
          closeButton: "hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600",
          body: "py-6",
          wrapper: "bg-gray-100/50 dark:bg-gray-900/50 backdrop-blur-sm",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-gray-900 dark:text-gray-100">
                Change Hosting Provider
              </ModalHeader>
              <ModalBody>
                <div className="space-y-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400">Enter custom hosting URL</label>
                  <div className="relative">
                    <FiGlobe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={customHosting}
                      onChange={(e) => setCustomHosting(e.target.value)}
                      placeholder="https://your-custom-server.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-500/40 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Bluesky is an open network where you can choose your hosting provider. If you&apos;re a developer,
                    you can host your own server.{" "}
                    <Link
                      href="https://atproto.com/guides/self-hosting"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Learn more
                    </Link>
                    .
                  </p>
                  <Spacer y={4} />
                  <div
                    onClick={() => {
                      setHosting("https://bsky.social");
                      setIsModalOpen(false);
                    }}
                    className="flex items-center gap-2 mt-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <FiGlobe className="text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Default Provider</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">https://bsky.social</p>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose} className="dark:hover:bg-gray-700">
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    handleHostingSubmit();
                    onClose();
                  }}
                  className="bg-blue-600 dark:bg-blue-500"
                >
                  Save Changes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
