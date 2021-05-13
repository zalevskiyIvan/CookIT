import MainLayout from "../../Layout/MainLayout";
import { useRouter } from "next/router";
import FullRecipe from "../../Components/FullRecipe";
import RecipesRenderer from "../../Components/RecipesRenderer";

export default function Recipes() {
  const router = useRouter();
  const params: any = router.query.category;

  return (
    <MainLayout>
      <RecipesRenderer params={params} />
    </MainLayout>
  );
}
