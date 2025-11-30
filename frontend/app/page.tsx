import Link from "next/link";
export default function Home() {
  return (
    <>
      <h1>Hello world from NextJS</h1>
      <Link href="/notes">Go to notes!</Link>
    </>
  );
}
