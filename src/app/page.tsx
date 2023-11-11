export default function Home() {
  return (
    <div className={"flex flex-col"}>
      <h3>index 페이지</h3>
      <a href={"/new-story"}>new-story 페이지로 이동</a>
      <a href={"/richtext"}>richText 페이지로 이동</a>
      <a href={"/read-only"}>read-only 페이지로 이동</a>
    </div>
  );
}
