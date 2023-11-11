import ReadOnly from "@/components/readOnly/read-only";
import DefaultPageContainer from "@/components/layout/default-page-container";

export default function page() {
  return (
    <DefaultPageContainer size={"max"}>
      <h1 className={"text-[5rem]"}>read-only</h1>
      <div className={"border-2 "}>
        <ReadOnly />
      </div>
    </DefaultPageContainer>
  );
}
