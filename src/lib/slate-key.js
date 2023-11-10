import { CustomEditor } from "@/lib/slate-plugins";


export function KeySet( editor, event ) {
  console.log(event.key);
  if (!event?.ctrlKey) {
    return;
  }
  event.preventDefault();
  switch (event.key) {
    case "`": {
      CustomEditor.toggleCodeBlock(editor);
      break;
    }
    case "b": {
      CustomEditor.toggleBoldMark(editor);
      break;
    }
  }
}
