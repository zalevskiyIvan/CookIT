import style from "../styles/App.module.css";
import HeaderLayout from "./HeaderLayout";
import LeftNavbarLayout from "../Components/LeftNavbarLayout";
import RightNavbarLayout from "../Components/RightNavbarLayout";
import { useRouter } from "next/router";
import { useSelector } from "../common/hooks";

export default function MainLayout({
  children,
  isSolo,
}: {
  children: any;
  isSolo?: boolean;
}) {
  return (
    <div>
      <div className={isSolo ? style.soloApp : style.App}>
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
    </div>
  );
}
