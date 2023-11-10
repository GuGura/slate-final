import DefaultPageContainer from "@/components/layout/default-page-container";
import Header from "@/components/new-stroy/header";
import Editor from "@/components/slate/editor";

export default async function page() {
  return (
    <DefaultPageContainer size={"max"} className={"items-center"}>
      <Header />
      <Editor />
    </DefaultPageContainer>
  );
}
