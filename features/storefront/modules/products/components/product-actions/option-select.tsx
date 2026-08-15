"use client"

import { Check } from 'lucide-react'
import { onlyUnique } from "../../../../lib/util/only-unique";
import React from "react";

const SIZE_ORDER = {
  "XXS": 1, "XS": 2, "S": 3, "M": 4, "L": 5, "XL": 6, "XXL": 7, "XXXL": 8
};

const COLOR_MAP: Record<string, string> = {
  black: '#0f172a',
  white: '#ffffff',
  red: '#ef4444',
  blue: '#3b82f6',
  green: '#22c55e',
  navy: '#1e3a8a',
  gray: '#6b7280',
  grey: '#6b7280',
  beige: '#d4b996',
  brown: '#78350f',
  yellow: '#eab308',
  orange: '#f97316',
  purple: '#a855f7',
  pink: '#ec4899',
  gold: '#eab308',
  silver: '#94a3b8',
  olive: '#556b2f',
  charcoal: '#374151',
  sand: '#e2d4b7',
  cream: '#fdfbf7',
  indigo: '#4f46e5',
  teal: '#0d9488',
};

type OptionSelectProps = {
  option: any;
  current: string | undefined;
  updateOption: (update: any) => void;
  title: string;
  disabled?: boolean;
  "data-testid"?: string;
};

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
}) => {
  const isColor = title.toLowerCase().includes("color") || title.toLowerCase().includes("colour");

  const filteredOptions = option.productOptionValues
    .map((v: any) => v.value)
    .filter(onlyUnique)
    .sort((a: string, b: string) => {
      if (title.toLowerCase() === "size") {
        return (SIZE_ORDER[a as keyof typeof SIZE_ORDER] || 999) - (SIZE_ORDER[b as keyof typeof SIZE_ORDER] || 999);
      }
      return a.localeCompare(b);
    });

  return (
    <div className="flex flex-col gap-y-2.5">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-foreground">
          {title}: <span className="font-normal text-muted-foreground">{current || 'Select one'}</span>
        </span>
        {title.toLowerCase() === 'size' && (
          <span className="text-[11px] text-blue-600 dark:text-blue-400 font-medium underline cursor-pointer hover:opacity-80">
            Size Guide
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2.5" data-testid={dataTestId}>
        {filteredOptions.map((v: any) => {
          const isSelected = current === v;
          const colorHex = COLOR_MAP[v.toLowerCase().trim()];

          // Visual Color Swatch
          if (isColor) {
            return (
              <button
                key={v}
                type="button"
                onClick={() => updateOption({ [option.id]: v })}
                disabled={disabled}
                title={v}
                className={`
                  group relative flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 border
                  ${
                    isSelected
                      ? 'border-foreground bg-slate-100 dark:bg-slate-800 text-foreground ring-1 ring-foreground'
                      : 'border-border bg-background text-muted-foreground hover:border-foreground/60'
                  }
                `}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0 shadow-inner"
                  style={{ backgroundColor: colorHex || '#94a3b8' }}
                />
                <span>{v}</span>
                {isSelected && <Check className="w-3 h-3 text-foreground ml-0.5" />}
              </button>
            );
          }

          // Size / Variant Pill
          return (
            <button
              key={v}
              type="button"
              onClick={() => updateOption({ [option.id]: v })}
              disabled={disabled}
              className={`
                min-w-[44px] h-10 px-3.5 rounded-xl text-xs font-semibold transition-all duration-150 border flex items-center justify-center
                ${
                  isSelected
                    ? 'border-foreground bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                    : 'border-border bg-background text-foreground hover:border-foreground/60'
                }
              `}
              data-testid="option-button"
            >
              <span>{v}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default OptionSelect;
