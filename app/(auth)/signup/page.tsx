"use client";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";

export default function Signup() {
  const [step, setStep] = useState(1);

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
          <form className="space-y-4">
            <div className="space-y-2">
              <label className="text-gray-600 dark:text-gray-400 text-sm font-medium">Hosting provider</label>
              <input
                readOnly
                value="Bluesky Social"
                className="w-full px-3 py-2 rounded-lg bg-white/80 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-gray-600 dark:text-gray-400 text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="name@example.com"
                className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-500/40 focus:border-blue-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-gray-600 dark:text-gray-400 text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-500/40 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Birth Date Field */}
            <div className="space-y-2">
              <label className="text-gray-600 dark:text-gray-400 text-sm font-medium">Your birth date</label>
              <input
                type="date"
                className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-500/40 focus:border-blue-500 transition-all"
              />
            </div>
          </form>

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
            <Button color="primary" fullWidth onClick={() => setStep(step + 1)}>
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
        </div>
      </div>
    </div>
  );
}
