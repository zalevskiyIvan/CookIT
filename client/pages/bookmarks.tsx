import RecipesRenderer from "../Components/RecipesRenderer";
import MainLayout from "../Layout/MainLayout";

export default function bookmarks() {
  return (
    <MainLayout>
      <RecipesRenderer params="bookmarks" />
    </MainLayout>
  );
}
