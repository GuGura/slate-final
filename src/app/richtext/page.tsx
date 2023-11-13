import DefaultPageContainer from "@/components/layout/default-page-container";
import RichTextExample from "@/components/RichTextExample/RichTextExample";

export default async function page() {
  return (
    <DefaultPageContainer size={"max"} className={"items-center"}>
      <div className={"text-[30px]"}>richText</div>
      <RichTextExample />
    </DefaultPageContainer>
  );
}
