import style from "../styles/App.module.css";
import HeaderLayout from "../Components/HeaderLayout";
import LeftNavbarLayout from "../Components/LeftNavbarLayout";
import RightNavbarLayout from "../Components/RightNavbarLayout";

export default function MainLayout({ children }) {
  return (
    <div className={style.App}>
      <HeaderLayout />
      <div className={style.content}>
        <div className={style.leftNavbar}>
          <LeftNavbarLayout />
        </div>
        <div className={style.tape}>{children}</div>
        <div className={style.rightNavbar}>
          <RightNavbarLayout />
        </div>
      </div>
    </div>
  );
}
