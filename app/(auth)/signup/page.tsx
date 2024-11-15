"use client";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import { FiCheck, FiX, FiMail, FiLock, FiCalendar, FiUser } from "react-icons/fi";
import { AtpAgent } from "@atproto/api";

export default function Signup() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    birthDate: "",
    handle: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    birthDate: "",
    handle: "",
  });

  const validateStep1 = () => {
    const newErrors = {
      email: "",
      password: "",
      birthDate: "",
      handle: "",
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
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    if (!formData.birthDate) {
      newErrors.birthDate = "Birth date is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const validateStep2 = () => {
    const newErrors = {
      email: "",
      password: "",
      birthDate: "",
      handle: "",
    };
    let isValid = true;

    if (!formData.handle) {
      newErrors.handle = "Username is required";
      isValid = false;
    } else if (formData.handle.length < 3) {
      newErrors.handle = "Username must be at least 3 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleContinue = async () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      try {
        const agent = new AtpAgent({ service: "https://bsky.social" });

        await agent.createAccount({
          email: formData.email,
          password: formData.password,
          handle: formData.handle + ".bsky.social",
        });

        // Handle successful signup
        setStep(3);
      } catch (err) {
        // Handle signup error
        setErrors((prev) => ({
          ...prev,
          handle: (err as Error).message ?? "Failed to create account. Please try again.",
        }));
      }
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
              Create Account
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Join the decentralized social network</p>
          </div>

          {/* Step Progress */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === step ? "w-8 bg-blue-500" : i < step ? "w-4 bg-blue-400/50" : "w-4 bg-gray-200 dark:bg-gray-700"
                }`}
              />
            ))}
          </div>

          {/* Form Fields */}
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {step === 1 ? (
              <>
                {/* Step 1 Fields */}
                <div className="space-y-2">
                  <label className="text-gray-600 dark:text-gray-400 text-sm font-medium">Hosting provider</label>
                  <input
                    readOnly
                    value="Bluesky Social"
                    className="w-full px-3 py-2 rounded-lg bg-white/80 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700"
                  />
                </div>

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

                <div className="space-y-2">
                  <label className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                    Birth date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-lg bg-white dark:bg-gray-800/50 border ${
                        errors.birthDate ? "border-red-500" : "border-gray-200 dark:border-gray-700"
                      } text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-500/40 focus:border-blue-500 transition-all`}
                    />
                  </div>
                  {errors.birthDate && <p className="text-red-500 text-sm">{errors.birthDate}</p>}
                </div>
              </>
            ) : step === 2 ? (
              <div className="space-y-2">
                <label className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                  Username <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={formData.handle}
                    onChange={(e) => {
                      const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "");
                      setFormData({ ...formData, handle: value });
                    }}
                    placeholder="username"
                    className={`w-full pl-10 pr-24 py-2.5 rounded-lg bg-white dark:bg-gray-800/50 border ${
                      errors.handle ? "border-red-500" : "border-gray-200 dark:border-gray-700"
                    } text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-500/40 focus:border-blue-500 transition-all`}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">.bsky.social</span>
                </div>
                {errors.handle && <p className="text-red-500 text-sm">{errors.handle}</p>}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center ${
                        (formData.handle.match(/[a-z]/g) || []).length >= 3 ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {(formData.handle.match(/[a-z]/g) || []).length >= 3 ? (
                        <FiCheck className="w-2.5 h-2.5 text-white" />
                      ) : (
                        <FiX className="w-2.5 h-2.5 text-white" />
                      )}
                    </div>
                    <span
                      className={`text-sm ${
                        (formData.handle.match(/[a-z]/g) || []).length >= 3 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      At least 3 letters
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center ${
                        formData.handle.length > 0 && /^[a-z0-9-]*$/.test(formData.handle)
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {formData.handle.length > 0 && /^[a-z0-9-]*$/.test(formData.handle) ? (
                        <FiCheck className="w-2.5 h-2.5 text-white" />
                      ) : (
                        <FiX className="w-2.5 h-2.5 text-white" />
                      )}
                    </div>
                    <span
                      className={`text-sm ${
                        formData.handle.length > 0 && /^[a-z0-9-]*$/.test(formData.handle)
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      Only lowercase letters, numbers, and hyphens
                    </span>
                  </div>
                </div>
              </div>
            ) : null}

            {/* Navigation Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                as={Link}
                href={step === 1 ? "/" : "#"}
                variant="bordered"
                fullWidth
                className={step !== 1 ? "opacity-50" : ""}
                onClick={(e) => {
                  if (step !== 1) {
                    e.preventDefault();
                    setStep(step - 1);
                  }
                }}
              >
                Back
              </Button>
              <Button color="primary" fullWidth onClick={handleContinue}>
                Continue
              </Button>
            </div>

            {/* Terms and Support */}
            <div className="text-center space-y-4 pt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                By continuing, you agree to our{" "}
                <Link
                  href="https://blueskyweb.xyz/support/tos"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Terms
                </Link>{" "}
                &{" "}
                <Link
                  href="https://blueskyweb.xyz/support/privacy-policy"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Privacy
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
