import {
  BLOCK_FONT_BUTTON,
  EMOJI_SMAIL,
  LINE_HEIGHT,
  LIST_TYPES,
  MARK_BUTTONS,
  TEXT_ALIGN_BUTTON,
  VIEW_TYPE_BUTTON,
} from "@/components/slate/custom-slate-plugins";
import React from "react";
import {
  BlockButton,
  MarkButton,
} from "@/components/RichTextExample/RichTextExample";

type RenderElementProps = {
  mode?: "modify" | "view";
  readOnly?: boolean;
};

export function ToolbarHeaderButtons({
  mode = "modify",
  readOnly = false,
}: RenderElementProps) {
  return (
    <>
      <div className={"flex gap-1"}>
        {!readOnly && (
          <>
            {MARK_BUTTONS.map((value, index) => (
              <MarkButton
                format={value}
                icon={value}
                key={"mark_button" + index}
              />
            ))}
            {/*<DropDownButton>*/}
            {BLOCK_FONT_BUTTON.map((value, index) => (
              <BlockButton
                format={value}
                icon={value}
                key={"block_font_button" + index}
              />
            ))}
            {/*</DropDownButton>*/}
            {LIST_TYPES.map((value, index) => (
              <BlockButton
                format={value}
                icon={value}
                key={"list_type" + index}
              />
            ))}
            <BlockButton format={LINE_HEIGHT} icon={LINE_HEIGHT} />
            {TEXT_ALIGN_BUTTON.map((value, index) => (
              <BlockButton
                format={value}
                icon={value}
                key={"text_align" + index}
              />
            ))}
            <BlockButton format={EMOJI_SMAIL} icon={EMOJI_SMAIL} />
          </>
        )}
      </div>
      <div className={"flex"}>
        {mode === "modify" &&
          VIEW_TYPE_BUTTON.map((value, index) => (
            <BlockButton
              format={value}
              icon={value}
              key={"view_type" + index}
            />
          ))}
      </div>
    </>
  );
}
