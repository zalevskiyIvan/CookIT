import React from "react";
import Auth from "../Components/Auth";
import MainLayout from "../Layout/MainLayout";

export default function index() {
  return (
    <div>
      <MainLayout isSolo={true}>
        <Auth />
      </MainLayout>
    </div>
  );
}
