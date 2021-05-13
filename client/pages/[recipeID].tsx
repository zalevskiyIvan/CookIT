import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "../common/hooks";
import FullRecipe from "../Components/FullRecipe";
import { getRecipeT } from "../redux/reducers/recipesReducer";

export default function Recipe() {
  const router = useRouter();
  const recipeID: any = router.query.recipeID;
  const state = useSelector((state) => state.dishesReducer.actuallRecipe);
  const dispatch = useDispatch();

  useEffect(() => {
    recipeID && dispatch(getRecipeT(recipeID));
  }, [recipeID]);
  return <FullRecipe state={state} />;
}
