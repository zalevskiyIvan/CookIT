import RecipesRenderer from "../Components/RecipesRenderer";
import MainLayout from "../Layout/MainLayout";

export default function Subscriptions() {
  return (
    <MainLayout>
      <RecipesRenderer params="subscriptions" />
    </MainLayout>
  );
}
