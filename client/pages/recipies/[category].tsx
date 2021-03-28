import MainLayout from "../../Layout/MainLayout";
import { useRouter } from "next/router";
import RecipiesRenderer from "../../Components/RecipiesRenderer";

export default function Recipies() {
  const router = useRouter();
  const params: any = router.query.category;
  return (
    <MainLayout>
      <RecipiesRenderer params={params} />
    </MainLayout>
  );
}
