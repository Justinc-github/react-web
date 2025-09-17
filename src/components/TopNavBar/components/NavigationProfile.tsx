import { Image, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { clearAuthInfo } from "../../../pages/Auth/utils/auth";

// 导航栏头像
export default function NavigationProfile() {
  const navigate = useNavigate();

   const handleLogout = () => {
     clearAuthInfo(); // ✅ 正确移除 authInfo 和 token

     // 可选：清除额外记住的用户名密码
     localStorage.removeItem("rememberedUsername");
     localStorage.removeItem("rememberedPassword");

     // 延迟跳转并刷新页面
     setTimeout(() => {
       navigate("/login", { replace: true });
       window.location.reload();
     }, 100);
   };

  return (
    <Dropdown className="justify-content-center" align="end">
      <Dropdown.Toggle
        variant="link"
        id="avatar-dropdown"
        className="no-arrow-toggle p-0 border-0 bg-transparent"
      >
        <Image
          src="https://image.baidu.com/search/down?url=https://e3f49eaa46b57.cdn.sohucs.com/2025/6/30/10/23/MTAwMTIyXzE3NTEyNTAyMzk0NTA=.png"
          roundedCircle
          height="30em"
          width="30em"
        ></Image>
      </Dropdown.Toggle>
      <Dropdown.Menu className="shadow-sm border-0">
        <Dropdown.Item as={Link} to="/home/number/sign">
          报名成员
        </Dropdown.Item>
        <Dropdown.Item
          as="a"
          href="https://openlist.zhongzhi.site"
          target="_blank"
        >
          团队资源
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={handleLogout} className="text-danger">
          退出
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
