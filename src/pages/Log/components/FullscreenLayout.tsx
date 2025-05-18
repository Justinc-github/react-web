// components/FullScreenLayout.tsx
import { Outlet } from "react-router-dom";
import Comments from "./Comments";

export default function FullScreenLayout() {
  return (
    <div>
      <Outlet />
      <Comments/>
    </div>
  );
}
