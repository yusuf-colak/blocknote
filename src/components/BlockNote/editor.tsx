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
  onChange?: any;
}

export default function Editor({
  initialContent,
  editable = true,
  className,
  onChange = null,
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

  console.log(editor);

  const changePage = async () => {
    const updatedBlocks = editor.topLevelBlocks;

    editor.topLevelBlocks.forEach((block, index) => {
      if (block.type === "heading") {
        const blockContent = block.content[0] ?? null;
        const id = blockContent?.text ? slugify(blockContent?.text) : block.id;

        const existingIds = updatedBlocks.map((block) => block.id);

        updatedBlocks[index].id =
          id !== block.id && existingIds.includes(id) ? `${id}-${index}` : id;
      }
    });
    onChange && onChange(updatedBlocks);
  };

  return (
    <BlockNoteView
      formattingToolbar={false}
      editable={editable}
      className={cn(className)}
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
