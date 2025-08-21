import React from "react";

export function StepProgress({ step, total = 3 }: { step: number; total?: number }) {
  const pct = Math.max(0, Math.min(100, Math.round((step / total) * 100)));

  return (
    <div className="w-full mx-auto mb-4 sm:mb-6">
      <div className="bg-black/30 backdrop-blur-sm rounded-2xl sm:rounded-3xl lg:rounded-[32px] px-4 sm:px-6 md:px-8 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center border border-white/10 transition-all duration-500">
        {/* Progress Line Container - responsive width */}
        <div className="relative w-full sm:w-24 md:w-28 lg:w-32 h-2 bg-white/20 rounded-full overflow-hidden mb-2 sm:mb-0">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-500 ease-out"
            style={{ width: `${pct}%` }}
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
        {/* Step Labels - responsive text size and spacing */}
        <div className="text-center sm:text-left sm:ml-4 text-sm sm:text-base text-white/70 font-medium">
          {step === total ? "Complete" : `Step ${step} of ${total}`}
        </div>
      </div>
    </div>
  );
}