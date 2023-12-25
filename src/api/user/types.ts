export interface LoginRequestData {
  /** 用户名 */
  account: string;
  /** 密码 */
  password: string;
  /** 手机 */
  phone?: string;
  /** 验证码 */
  verifyCode?: string;
}

interface BodyData {
  [key: string]: any;
}

/** 所有 api 接口的响应数据都应该准守该格式 */
interface ApiResponseData<T> {
  errorCode: number;
  body: T;
  errorMessage: string;
  responseTime: any;
  sign: string;
  tranStatus: string;
}

export type LoginCodeResponseData = ApiResponseData<BodyData>;

export type LoginResponseData = ApiResponseData<BodyData>;

export type LogoutReaponseData = ApiResponseData<BodyData>;
