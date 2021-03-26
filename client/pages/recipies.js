import Head from "next/head";
import HeaderLayout from "../Layout/HeaderLayout";
export default function Home() {
  return (
    <HeaderLayout>
      <Head>Cookit</Head>
      <div>Главная</div>
    </HeaderLayout>
  );
}
