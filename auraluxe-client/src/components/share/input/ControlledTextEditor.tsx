// components/share/editor/ControlledTextEditor.tsx
"use client";

import { Label } from "@/components/ui/label";
import dynamic from "next/dynamic";
import { Controller, useFormContext } from "react-hook-form";

interface ControlledTextEditorProps {
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
  editorClassName?: string;
  isRequired?: boolean;
  height?: string;
  showToolbar?: boolean;
}

// Dynamically import Tiptap editor to avoid SSR
const TiptapEditor = dynamic(() => import("./editor/TiptapEditor"), {
  ssr: false,
  loading: () => (
    <div
      className="border border-gray-300 rounded-md overflow-hidden bg-gray-50 animate-pulse"
      style={{ height: "22rem" }}
    >
      <div className="h-full flex items-center justify-center">
        <div className="text-gray-400">Loading editor...</div>
      </div>
    </div>
  ),
});

export default function ControlledTextEditor({
  name,
  label,
  placeholder = "Type your content here...",
  className = "",
  editorClassName = "",
  isRequired = false,
  height = "22rem",
  showToolbar = true,
}: ControlledTextEditorProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className={`space-y-2 ${className}`}>
          {label && (
            <Label className="text-sm font-medium">
              {label}
              {isRequired && <span className="ml-1 text-red-500">*</span>}
            </Label>
          )}

          <div className="relative">
            <TiptapEditor
              value={field.value || ""}
              onChange={field.onChange}
              onBlur={field.onBlur}
              placeholder={placeholder}
              height={height}
              showToolbar={showToolbar}
              className={editorClassName}
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 mt-1">{error.message}</p>
          )}
        </div>
      )}
    />
  );
}
