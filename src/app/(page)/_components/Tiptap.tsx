"use client";

import { Placeholder } from "@tiptap/extensions";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
type TiptapType = {
  content: string;
  onChange: (content: string) => void;
  setProgress: (length: number) => void;
  isSetDefaultContent?: boolean;
  className?: string;
};
const Tiptap = ({
  content = "<p></p>",
  onChange,
  setProgress,
  isSetDefaultContent = false,
  className,
}: TiptapType) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "What's happening",
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class: className ?? "",
      },
    },
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      console.log("Tip", editor.getText().length);
      const textValue = editor.getText();
      setProgress(textValue.length);
      if (textValue.startsWith(" ")) {
        // nếu bắt đầu bằng dấu cahcs thì set nội dung vè ban đầu
        editor.commands.setContent("");
      } else if (textValue.length > 255) {
        editor.commands.undo();
        return;
      } else {
        onChange(editor.getHTML());
      }
    },
  });
  //   console.log(editor?.getHTML());
  useEffect(() => {
    editor?.commands.setContent("");
  }, [isSetDefaultContent]);

  return <EditorContent editor={editor} />;
};

export default Tiptap;
