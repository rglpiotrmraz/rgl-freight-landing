"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Building2, User, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import {
  subscriptionSchema,
  SubscriptionFormData,
} from "@/app/lib/schemas";
import { subscribeToNewsletter } from "@/app/actions/subscribe";

export function SubscriptionForm() {
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SubscriptionFormData>({
    resolver: zodResolver(subscriptionSchema),
  });

  const onSubmit = async (data: SubscriptionFormData) => {
    setStatus({ type: null, message: "" });
    const result = await subscribeToNewsletter(data);

    if (result.success) {
      setStatus({ type: "success", message: result.message });
      reset();
    } else {
      setStatus({ type: "error", message: result.message });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 sm:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
                aria-hidden="true"
              />
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                className={`w-full pl-10 pr-3 py-2.5 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                }`}
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Company name Field */}
          <div>
            <label htmlFor="nazwaFirmy" className="block text-sm font-medium text-gray-700 mb-1">
              Company name
            </label>
            <div className="relative">
              <Building2
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
                aria-hidden="true"
              />
              <input
                id="nazwaFirmy"
                type="text"
                autoComplete="organization"
                placeholder="Your company name"
                className={`w-full pl-10 pr-3 py-2.5 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors ${
                  errors.nazwaFirmy
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                }`}
                {...register("nazwaFirmy")}
              />
            </div>
            {errors.nazwaFirmy && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {errors.nazwaFirmy.message}
              </p>
            )}
          </div>

          {/* Last name Field */}
          <div>
            <label htmlFor="nazwisko" className="block text-sm font-medium text-gray-700 mb-1">
              Last name
            </label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
                aria-hidden="true"
              />
              <input
                id="nazwisko"
                type="text"
                autoComplete="family-name"
                placeholder="Your last name"
                className={`w-full pl-10 pr-3 py-2.5 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors ${
                  errors.nazwisko
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                }`}
                {...register("nazwisko")}
              />
            </div>
            {errors.nazwisko && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {errors.nazwisko.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white font-medium py-2.5 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                <span>Subscribing...</span>
              </>
            ) : (
              <span>Subscribe</span>
            )}
          </button>
        </form>

        {/* Status Messages */}
        {status.type === "success" && (
          <div
            className="mt-5 flex items-start gap-3 rounded-md bg-green-50 p-4 text-green-800"
            role="status"
            aria-live="polite"
          >
            <CheckCircle size={20} className="mt-0.5 shrink-0" aria-hidden="true" />
            <p className="text-sm font-medium">{status.message}</p>
          </div>
        )}
        {status.type === "error" && (
          <div
            className="mt-5 flex items-start gap-3 rounded-md bg-red-50 p-4 text-red-800"
            role="alert"
            aria-live="assertive"
          >
            <AlertCircle size={20} className="mt-0.5 shrink-0" aria-hidden="true" />
            <p className="text-sm font-medium">{status.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
