// components/share/editor/TiptapEditor.tsx
"use client";

import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
  Underline,
} from "lucide-react";
import { useEffect } from "react";

export interface TiptapEditorProps {
  value: string;
  onChange: (content: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  height?: string;
  showToolbar?: boolean;
  className?: string;
}

export default function TiptapEditor({
  value,
  onChange,
  onBlur,
  placeholder = "Type here...",
  height = "22rem",
  showToolbar = true,
  className = "",
}: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    onBlur: () => {
      onBlur?.();
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm focus:outline-none min-h-[120px] p-4 max-w-none",
      },
    },
    immediatelyRender: false, // This is the key fix
  });

  // Update editor content when value changes externally
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) {
    return (
      <div
        className={`border border-gray-300 rounded-md overflow-hidden bg-gray-50 animate-pulse ${className}`}
        style={{ height }}
      >
        <div className="h-full flex items-center justify-center">
          <div className="text-gray-400">Loading editor...</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`border border-gray-300 rounded-md overflow-hidden bg-white ${className}`}
      style={{ height }}
    >
      {showToolbar && (
        <div className="border-b p-2 flex flex-wrap gap-1 bg-gray-50">
          {/* Headings */}
          {[
            { level: 1, icon: <Heading1 size={18} />, label: "Heading 1" },
            { level: 2, icon: <Heading2 size={18} />, label: "Heading 2" },
            { level: 3, icon: <Heading3 size={18} />, label: "Heading 3" },
            { level: 4, icon: <Heading4 size={18} />, label: "Heading 4" },
          ].map((heading) => (
            <button
              key={heading.level}
              type="button"
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .toggleHeading({ level: heading.level })
                  .run()
              }
              className={`p-2 rounded hover:bg-gray-200 ${
                editor.isActive("heading", { level: heading.level })
                  ? "bg-gray-200 text-gray-900"
                  : "text-gray-600"
              }`}
              title={heading.label}
            >
              {heading.icon}
            </button>
          ))}

          <div className="w-px h-6 bg-gray-300 mx-1" />

          {/* Text Styles */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded hover:bg-gray-200 ${
              editor.isActive("bold")
                ? "bg-gray-200 text-gray-900"
                : "text-gray-600"
            }`}
            title="Bold"
          >
            <Bold size={18} />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded hover:bg-gray-200 ${
              editor.isActive("italic")
                ? "bg-gray-200 text-gray-900"
                : "text-gray-600"
            }`}
            title="Italic"
          >
            <Italic size={18} />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-2 rounded hover:bg-gray-200 ${
              editor.isActive("underline")
                ? "bg-gray-200 text-gray-900"
                : "text-gray-600"
            }`}
            title="Underline"
          >
            <Underline size={18} />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`p-2 rounded hover:bg-gray-200 ${
              editor.isActive("strike")
                ? "bg-gray-200 text-gray-900"
                : "text-gray-600"
            }`}
            title="Strikethrough"
          >
            <Strikethrough size={18} />
          </button>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          {/* Lists */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded hover:bg-gray-200 ${
              editor.isActive("bulletList")
                ? "bg-gray-200 text-gray-900"
                : "text-gray-600"
            }`}
            title="Bullet List"
          >
            <List size={18} />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded hover:bg-gray-200 ${
              editor.isActive("orderedList")
                ? "bg-gray-200 text-gray-900"
                : "text-gray-600"
            }`}
            title="Ordered List"
          >
            <ListOrdered size={18} />
          </button>
        </div>
      )}

      {/* Editor Content */}
      <div
        className="overflow-auto"
        style={{ height: `calc(${height} - ${showToolbar ? "48px" : "0px"})` }}
      >
        <EditorContent editor={editor} className="h-full" />
      </div>
    </div>
  );
}
