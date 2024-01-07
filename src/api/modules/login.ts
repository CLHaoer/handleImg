import { ResPage, Login } from "@/api/interface/index";
import http from "@/api/idnex";
// 接口模块名称
const PORT1 = "/api";

/**
 * @name 用户管理模块
 */
// 获取用户信息
export const loginApi = () => {
  return http.post<Login.ReqLoginForm>(PORT1 + `/user/login`);
};
