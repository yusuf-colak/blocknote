"use client";
import {
  Block,
  BlockNoteEditor,
  BlockNoteSchema,
  defaultBlockSpecs,
  filterSuggestionItems,
} from "@blocknote/core";
import {
  DefaultReactSuggestionItem,
  getDefaultReactSlashMenuItems,
  SuggestionMenuController,
} from "@blocknote/react";

import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";

import "@blocknote/react/style.css";
import "@blocknote/mantine/style.css";

import {
  createAccordionBlockBlock,
  getInsertAccordionBlock,
} from "../BlockNote/Accordion";
import { cn } from "@/lib/utils";

interface EditorProps {
  initialContent?: Block[];
  editable?: boolean;
  className?: string;
  innerBlock?: boolean;
}

export default function Editor({
  initialContent,
  editable = true,
  className,
}: EditorProps) {
  const schema = BlockNoteSchema.create({
    blockSpecs: {
      ...defaultBlockSpecs,
      accordion: createAccordionBlockBlock("light"),
    },
  });

  const getCustomSlashMenuItems = (
    editor: BlockNoteEditor
  ): DefaultReactSuggestionItem[] => [
    ...getDefaultReactSlashMenuItems(editor),
    getInsertAccordionBlock(editor),
  ];

  // Creates a new editor instance.
  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent:
      initialContent && initialContent.length > 0 ? initialContent : undefined,
    schema,
  });

  const changePage = async () => {
    console.log("editor", editor.topLevelBlocks);
  };

  return (
    <BlockNoteView
      formattingToolbar={false}
      editable={editable}
      className={cn(className, "w-full")}
      editor={editor}
      onChange={changePage}
      slashMenu={false}
    >
      <SuggestionMenuController
        triggerCharacter={"/"}
        getItems={async (query) =>
          filterSuggestionItems(getCustomSlashMenuItems(editor), query)
        }
      />
    </BlockNoteView>
  );
}
