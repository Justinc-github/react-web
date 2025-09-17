import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import styles from "./NumberSign.module.css";
import { getAuthInfo } from "../../../Auth/utils/auth";

interface TeamMember {
  id: number;
  xueHao: string;
  xingMing: string;
  banJi: string;
  shouJiHao: string;
  xingbie: string;
  jiGuan: string;
  Chinese: number;
  math: number;
  English: number;
  xiaoKe: number;
  grade: number;
  create_time: string;
}

interface AdminUser {
  id: number;
  email: string;
}

export default function NumberSign() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasExportPermission, setHasExportPermission] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [membersResponse, adminResponse] = await Promise.all([
        fetch("https://api.zhongzhi.site/information/team/member/sign", {
          headers: {
            Accept: "application/json; charset=utf-8",
          },
        }),
        fetch("https://api.zhongzhi.site/information/team/member/admin", {
          headers: {
            Accept: "application/json; charset=utf-8",
          },
        }),
      ]);

      if (!membersResponse.ok) {
        throw new Error(`获取成员信息失败: ${membersResponse.status}`);
      }

      if (!adminResponse.ok) {
        throw new Error(`获取管理员列表失败: ${adminResponse.status}`);
      }

      const membersData = await membersResponse.json();
      const adminData = await adminResponse.json();

      setMembers(membersData);
      setAdminUsers(adminData);

      const authInfo = getAuthInfo();
      if (authInfo && authInfo.email) {
        const isAdmin = adminData.some(
          (admin: AdminUser) => admin.email === authInfo.email
        );
        setHasExportPermission(isAdmin);
      }

      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "获取数据失败");
      console.error("获取数据错误:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatPhoneNumber = (phone: string) => {
    if (phone.length <= 4) return phone;
    return `****${phone.slice(-4)}`;
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("zh-CN"),
      time: date.toLocaleTimeString("zh-CN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const exportToExcel = () => {
    const authInfo = getAuthInfo();
    const isAdmin =
      authInfo &&
      authInfo.email &&
      adminUsers.some((admin) => admin.email === authInfo.email);

    if (!isAdmin) {
      alert("您没有导出数据的权限");
      return;
    }

    const exportData = members.map((member) => {
      const { date, time } = formatDateTime(member.create_time);
      return {
        ID: member.id,
        学号: member.xueHao,
        姓名: member.xingMing,
        班级: member.banJi,
        手机号: member.shouJiHao,
        性别: member.xingbie,
        籍贯: member.jiGuan,
        语文成绩: member.Chinese,
        数学成绩: member.math,
        英语成绩: member.English,
        小科成绩: member.xiaoKe,
        总分: member.grade,
        报名日期: date,
        报名时间: time,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "众智创新成员报名信息");

    const colWidths = [
      { wch: 8 },
      { wch: 15 },
      { wch: 10 },
      { wch: 20 },
      { wch: 15 },
      { wch: 8 },
      { wch: 20 },
      { wch: 10 },
      { wch: 10 },
      { wch: 10 },
      { wch: 10 },
      { wch: 10 },
      { wch: 12 },
      { wch: 10 },
    ];
    worksheet["!cols"] = colWidths;

    const fileName = `众智创新成员报名信息_${
      new Date().toISOString().split("T")[0]
    }.xlsx`;
    XLSX.writeFile(workbook, fileName, { compression: true });
  };

  const openDeleteModal = (member: TeamMember) => {
    const authInfo = getAuthInfo();
    const isAdmin =
      authInfo &&
      authInfo.email &&
      adminUsers.some((admin) => admin.email === authInfo.email);

    if (!isAdmin) {
      alert("您没有删除数据的权限");
      return;
    }

    setSelectedMember(member);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedMember(null);
  };

  const confirmDelete = async () => {
    if (!selectedMember) return;

    try {
      const response = await fetch(
        `https://api.zhongzhi.site/information/team/member/sign/${selectedMember.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`删除失败: ${response.status}`);
      }

      setMembers(members.filter((member) => member.id !== selectedMember.id));
      alert("删除成功");
    } catch (err) {
      alert(err instanceof Error ? err.message : "删除数据失败");
      console.error("删除数据错误:", err);
    } finally {
      closeDeleteModal();
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>加载中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <p>加载失败: {error}</p>
          <button onClick={fetchData} className={styles.retryBtn}>
            重试
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {showDeleteModal && selectedMember && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>确认删除</h3>
            <p>
              确定要删除 {selectedMember.xingMing} ({selectedMember.xueHao})
              的报名信息吗？
            </p>
            <p className={styles.warningText}>此操作不可撤销！</p>
            <div className={styles.modalButtons}>
              <button
                onClick={closeDeleteModal}
                className={styles.cancelButton}
              >
                取消
              </button>
              <button
                onClick={confirmDelete}
                className={styles.confirm极简风格Button}
              >
                确认删除
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.header}>
        <h1 className={styles.title}>众智创新成员报名信息</h1>
        {hasExportPermission && (
          <button onClick={exportToExcel} className={styles.exportBtn}>
            导出Excel报表
          </button>
        )}
      </div>

      <div className={styles.count}>
        已报名成员总数: <span>{members.length}</span>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.membersTable}>
          <thead>
            <tr>
              <th>学号</th>
              <th>姓名</th>
              <th className={styles.desktopOnly}>班级</th>
              <th className={styles.desktopOnly}>手机号</th>
              <th className={styles.desktopOnly}>性别</th>
              <th>籍贯</th>
              <th>报名日期</th>
              <th className={styles.desktopOnly}>报名时间</th>
              {hasExportPermission && (
                <th className={styles.desktopOnly}>操作</th>
              )}
            </tr>
          </thead>
          <tbody>
            {members.map((member) => {
              const { date, time } = formatDateTime(member.create_time);
              return (
                <tr key={member.id}>
                  <td>{member.xueHao}</td>
                  <td>{member.xingMing}</td>
                  <td className={styles.desktopOnly}>{member.banJi}</td>
                  <td className={styles.desktopOnly}>
                    {formatPhoneNumber(member.shouJiHao)}
                  </td>
                  <td className={styles.desktopOnly}>{member.xingbie}</td>
                  <td className={styles.jiGuanCell} title={member.jiGuan}>
                    {member.jiGuan}
                  </td>
                  <td>{date}</td>
                  <td className={styles.desktopOnly}>{time}</td>
                  {hasExportPermission && (
                    <td className={styles.desktopOnly}>
                      <button
                        onClick={() => openDeleteModal(member)}
                        className={styles.deleteBtn}
                      >
                        删除
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
