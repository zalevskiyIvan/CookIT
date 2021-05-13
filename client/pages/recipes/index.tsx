import RecipesRenderer from "../../Components/RecipesRenderer";
import MainLayout from "../../Layout/MainLayout";

export default function recipes() {
  const params = "all";
  return (
    <MainLayout>
      <RecipesRenderer params={params} />
    </MainLayout>
  );
}
