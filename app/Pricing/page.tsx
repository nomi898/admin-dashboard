"use client";

import React from "react";
import { pricingPlans } from "@/data/pricing";
import { Check } from "lucide-react";

const PricingPage = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Pricing</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {pricingPlans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-white rounded-lg shadow-lg overflow-hidden relative ${
              plan.isPopular ? "ring-2 ring-blue-500" : ""
            }`}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
            </div>

            {/* Content */}
            <div className="relative p-8">
              {/* Plan Name */}
              <h2 className="text-2xl font-bold mb-4">{plan.name}</h2>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold text-blue-600">${plan.price.toFixed(2)}</span>
                <span className="text-gray-600 ml-2">/month</span>
              </div>

              {/* Features List */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li
                    key={index}
                    className={`flex items-start gap-2 ${
                      feature.included ? "text-gray-900" : "text-gray-400"
                    }`}
                  >
                    {feature.included ? (
                      <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <div className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    )}
                    <span className={feature.included ? "" : "line-through"}>{feature.name}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <div className="space-y-3">
                <button
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                    plan.isPopular
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50"
                  }`}
                >
                  Get Started
                </button>
                <a
                  href="#"
                  className="block text-center text-gray-900 hover:text-blue-600 transition-colors text-sm font-medium"
                >
                  Start Your 30 Day Free Trial
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;

