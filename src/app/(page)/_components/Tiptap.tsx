"use client";

import { Placeholder } from "@tiptap/extensions";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import Emoji from "@tiptap/extension-emoji";
import EmojiPicker from "./home/PickEmoij";
type TiptapType = {
  content: string;
  onChange: (content: string) => void;
  setProgress: (length: number) => void;
  isSetDefaultContent?: boolean;
  className?: string;

  setTiptapMethod: (editor: Editor | null) => void;
};
const Tiptap = ({
  content = "<p></p>",
  onChange,
  setProgress,
  isSetDefaultContent = false,
  className,

  setTiptapMethod,
}: TiptapType) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "What's happening",
      }),
      Emoji.configure({
        enableEmoticons: true, // Gõ :) sẽ tự thành 😊
        // enableShortcuts: true, // Gõ :smile: sẽ thành 😄
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
      const textValue = editor.getText();
      setProgress(textValue.length);
      // if (textValue.startsWith(" ")) {
      //   // nếu bắt đầu bằng dấu cahcs thì set nội dung vè ban đầu
      //   // editor.commands.setContent("");
      // } else
      if (textValue.length > 255) {
        editor.commands.undo();
        return;
      } else {
        onChange(editor.getHTML());
      }
    },
  });

  useEffect(() => {
    editor?.commands.setContent("");
  }, [isSetDefaultContent]);
  useEffect(() => {
    setTiptapMethod(editor);
  }, [editor]);

  return (
    <div>
      <EditorContent editor={editor} />
      {/* <EmojiPicker
        onSelect={(emoji: { native: string }) => {
          editor?.commands.insertContent(emoji.native);
        }}
      /> */}
    </div>
  );
};

export default Tiptap;
