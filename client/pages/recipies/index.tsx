import MainLayout from "../../Layout/MainLayout";
import RecipiesRenderer from "../../Components/RecipiesRenderer";

export default function Recipies() {
  const params = "all";
  return (
    <MainLayout>
      <RecipiesRenderer params={params} />
    </MainLayout>
  );
}
