"use client";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import { FiMail, FiLock } from "react-icons/fi";
import { AtpAgent } from "@atproto/api";
import { useRouter } from "next/navigation";

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

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
      general: "",
    };
    let isValid = true;

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
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
      const agent = new AtpAgent({ service: "https://bsky.social" });
      await agent.login({
        identifier: formData.email,
        password: formData.password,
      });

      // Redirect to home page after successful login
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
              <label className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
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
    </div>
  );
}
