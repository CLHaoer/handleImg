import { ResPage, User } from "@/api/interface/index";
import http from "@/api/idnex";
// 接口模块名称
const PORT1 = "/api";

/**
 * @name 用户管理模块
 */
// // 获取用户信息
// export const getUserList = () => {
//   return http.post<ResPage<User.ResUserList>>(PORT1 + `/user/list`);
// };
// 注册用户
export const registerApi = (data: User.registerForm) => {
  return http.post<User.ResRegister>(PORT1 + `/user/register`, data);
};
