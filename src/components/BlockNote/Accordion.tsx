import React, { useState } from "react";

import {
  BlockFromConfig,
  BlockNoteEditor,
  BlockSchema,
  BlockSchemaWithBlock,
  BlockSpecs,
  CustomBlockConfig,
  defaultBlockSchema,
  defaultBlockSpecs,
  defaultProps,
  InlineContentSchema,
  PropSchema,
  StyleSchema,
} from "@blocknote/core";
import { createReactBlockSpec, ReactSlashMenuItem } from "@blocknote/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

import GoogleIcons from "../GoogleIcons";
import Editor from "./editor";
import { cn } from "@/lib/utils";

export const accordionPropSchema = {
  textAlignment: defaultProps.textAlignment,
  textColor: defaultProps.textColor,
  title: {
    default: "Accordion Titel" as const,
  },
  textQuill: {
    default: "" as const,
  },
} satisfies PropSchema;

export const accordionConfig = {
  type: "accordion",
  propSchema: {
    textAlignment: defaultProps.textAlignment,
    textColor: defaultProps.textColor,
    title: {
      default: "Accordion Titel" as const,
    },
    textQuill: {
      default: "" as const,
    },
  } as const,
  content: "inline",
} as const satisfies CustomBlockConfig;

// Component for the AccordionBlock block
export const AccordionBlock = (props: {
  block: BlockFromConfig<
    typeof accordionConfig,
    InlineContentSchema,
    StyleSchema
  >;
  editor: BlockNoteEditor<
    BlockSchemaWithBlock<"accordion", typeof accordionConfig>,
    InlineContentSchema,
    StyleSchema
  >;
  contentRef: (node: HTMLElement | null) => void;
}) => {
  const title = props.block.props.title;
  const textEditor = props.block.props.textQuill;
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div contentEditable={false} className="h-auto accordion pb-4">
      {isEditing && (
        <div className=" w-full  flex flex-row items-center justify-center ">
          <button
            onClick={() => setIsEditing(false)}
            className=" h-full p-1 rounded-xl   courser-pointer"
          >
            <GoogleIcons icon="done_all" className="text-primary" />
          </button>
          <input
            value={title}
            className="pl-2 focus-visible:outline-none w-full rounded-xl  border-2 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            onChange={(e) => {
              props.editor.updateBlock(props.block, {
                props: {
                  title: e.target.value,
                },
              });
            }}
          />
          <GoogleIcons
            icon="keyboard_arrow_down"
            className="text-primary opacity-80 cursor-not-allowed"
          />
        </div>
      )}
      {!isEditing && (
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" className="relative">
            <AccordionTrigger
              iconOnOnOff={true}
              locked={false}
              active={true}
              className={cn(props.editor.isEditable && "ml-12", " py-0 w-auto")}
            >
              {props.editor.isEditable && (
                <div
                  className={cn("absolute", "left-5", "top-0")}
                  onClick={() => setIsEditing(true)}
                >
                  <GoogleIcons icon="Edit" className="mr-2" />
                </div>
              )}

              <span>{title}</span>
            </AccordionTrigger>
            <AccordionContent className="h-auto ml-3">
              <Editor
                pageId={undefined}
                onChange={(value) => {
                  props.editor.updateBlock(props.block, {
                    props: {
                      textQuill: value,
                    },
                  });
                }}
                innerBlock={true}
                initialContent={textEditor as any}
                editable={props.editor.isEditable ? true : false}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
      <div ref={props.contentRef} className="hidden" />
    </div>
  );
};

export const createAccordionBlockBlock = (theme: "light" | "dark") =>
  createReactBlockSpec(accordionConfig, {
    render: (props) => <AccordionBlock {...props} />,
  });

export const getBlockSpecs = (theme: "light" | "dark") =>
  ({
    ...defaultBlockSpecs,
    accordion: createAccordionBlockBlock(theme),
  } satisfies BlockSpecs);
export const blockSchema = {
  ...defaultBlockSchema,
  accordion: accordionConfig,
} satisfies BlockSchema;

export const getInsertAccordionBlock = (editor: BlockNoteEditor) =>
  ({
    title: "Accordion",
    onItemClick: () => {
      editor.insertBlocks(
        [
          {
            type: "accordion",
          },
        ],
        editor.getTextCursorPosition().block,
        "after"
      );
    },
    aliases: ["accordion"],
    group: "Others",
    icon: <GoogleIcons icon="filter_list" className="text-foreground" />,
    subtext: "Create a new accordion.",
  } satisfies ReactSlashMenuItem<typeof blockSchema>);
const inlineContentStyles = {
  flexGrow: "1",
};
