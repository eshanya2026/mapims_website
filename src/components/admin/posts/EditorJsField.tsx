"use client";

import { useEffect, useRef } from "react";
import type EditorJS from "@editorjs/editorjs";
import { contentToEditorJsData } from "@/lib/editorjs-content";
import { cn } from "@/lib/utils";

type EditorJsFieldProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export default function EditorJsField({ value, onChange, className }: EditorJsFieldProps) {
  const holderRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<EditorJS | null>(null);
  const onChangeRef = useRef(onChange);
  const readyRef = useRef(false);

  onChangeRef.current = onChange;

  useEffect(() => {
    let cancelled = false;

    async function initEditor() {
      if (!holderRef.current || editorRef.current) return;

      const [
        { default: Editor },
        { default: Header },
        { default: List },
        { default: ImageTool },
        { default: Quote },
        { default: Delimiter },
      ] = await Promise.all([
        import("@editorjs/editorjs"),
        import("@editorjs/header"),
        import("@editorjs/list"),
        import("@editorjs/image"),
        import("@editorjs/quote"),
        import("@editorjs/delimiter"),
      ]);

      if (cancelled || !holderRef.current) return;

      const editor = new Editor({
        holder: holderRef.current,
        placeholder: "Start writing your article…",
        data: contentToEditorJsData(value),
        tools: {
          header: {
            class: Header,
            inlineToolbar: true,
            config: {
              levels: [2, 3, 4],
              defaultLevel: 2,
            },
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  const formData = new FormData();
                  formData.append("file", file);

                  const response = await fetch("/api/admin/upload", {
                    method: "POST",
                    body: formData,
                  });

                  if (!response.ok) {
                    throw new Error("Image upload failed");
                  }

                  const data = (await response.json()) as { url?: string };
                  if (!data.url) {
                    throw new Error("Image upload failed");
                  }

                  return {
                    success: 1,
                    file: {
                      url: data.url,
                    },
                  };
                },
              },
            },
          },
          quote: {
            class: Quote,
            inlineToolbar: true,
          },
          delimiter: Delimiter,
        },
        async onChange(api) {
          if (!readyRef.current) return;
          const saved = await api.saver.save();
          onChangeRef.current(JSON.stringify(saved));
        },
        onReady() {
          readyRef.current = true;
        },
      });

      editorRef.current = editor;
    }

    void initEditor();

    return () => {
      cancelled = true;
      readyRef.current = false;
      if (editorRef.current) {
        void editorRef.current.isReady
          .then(() => editorRef.current?.destroy())
          .catch(() => editorRef.current?.destroy());
        editorRef.current = null;
      }
    };
  }, []);

  return (
    <div
      className={cn(
        "editorjs-field rounded-md border border-slate-200 bg-white px-3 py-2",
        className
      )}
    >
      <div ref={holderRef} className="min-h-[240px]" />
    </div>
  );
}
