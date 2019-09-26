import axios from "../config/axios";
import axios2 from "../config/axios2";
import { baseUrl, baseUrl2 } from "../config/env";

/**
 **************************微信*****************************/
/**
 * 获取微信签名的接口
 * @param {string} url 当前页面的url
 */
export const getSignature = (data) => axios2("/Home/Token", data);

/* 获取企业微信签名的接口
* @param {string} url 当前页面的url
*/
export const getQYSignature = (data) => axios2("/Home/QyToken", data);

export const getUserInfo = (data) => axios(baseUrl + "/ERPForWeixinServer.asmx/GetPersonalInfo", data);

/**
 *  我的餐券
 * @param {string} FWeixinOpenID  微信openId
 */
export const JDGetQRCode = (data) => axios(baseUrl + "/ERPForWeixinServer.asmx/GetQRCode", data, "UrlDecode");

/**
 *
 * 餐券的时间
 */
export const JDGetQRCodeTime = (data) => axios(baseUrl + "/ERPForWeixinServer.asmx/GetQRCodeTime", data);

/**
 * 我的工资
 * @param {string} FWeixinOpenID  微信openId
 *
 */
export const JDGetSalaryInfo = (data) => axios(baseUrl + "/ERPForWeixinServer.asmx/GetSalaryInfo", data);

/**
 * 我的餐券 明细
 * @param {string} FWeixinOpenID  微信openId
 * @param {string} FType  1：有效卡券 2：已使用卡券 3：失效卡券
 *
 */
export const JDGetQRCodeView = (data) => axios(baseUrl + "/ERPForWeixinServer.asmx/GetQRCodeView", data, "UrlDecode");

/**
 * 我的财产
 * @param {string} FWeixinOpenID  微信openId
 *
 */
export const JDGetWeixinFACardInfo = (data) => axios(baseUrl + "/ERPForWeixinServer.asmx/GetWeixinFACardInfo", data);

/**
 * 获取微信中个人的移交待批财产信息
 * @param {string} FWeixinOpenID  微信openId
 *
 */
export const JDGetWeixinFARemoveCardInfo = (data) => axios(baseUrl + "/ERPForWeixinServer.asmx/GetWeixinFARemoveCardInfo", data);

/**
 * 获取微信中个人的监管财产信息
 * @param {string} FWeixinOpenID  微信openId
 *
 */
export const JDGetWeixinManagerFACardInfo = (data) => axios(baseUrl + "/ERPForWeixinServer.asmx/GetWeixinManagerFACardInfo", data);

/**
 * 获取微信中盘点信息
 * @param {string} FWeixinOpenID  微信openId
 *
 */
export const JDGetWeixinInventory = (data) => axios(baseUrl + "/ERPForWeixinServer.asmx/GetWeixinInventory", data);

/**
 * 财产详情
 * @param {string} FWeixinOpenID  微信openId
 * @param {string} FInterID   FInterID
 *
 */
export const JDGetAssestByFInterID = (data) => axios(baseUrl + "/ErpForAppServer.asmx/GetAssestByFInterID", data, "UrlDecode");

/**
 * 财产移交
 * @param {string} CardIDList   逗号隔开
 *
 */
export const JDGetWeixinFACardInfoByID = (data) => axios(baseUrl + "/ERPForWeixinServer.asmx/GetWeixinFACardInfoByID", data);

/**
 * 财产移交者信息
 * @param {string} FWeixinOpenID  微信openId
 *
 */
export const JDGetEmployeeInfoByOpenID = (data) => axios(baseUrl + "/ErpForWeixinServer.asmx/GetEmployeeInfoByOpenID", data);

/**
 * 接受者上级信息
 * @param {string} EmpCode  接受者工号/报废者
 *
 */
export const JDGetEmpAndLiableByEmpCode = (data) => axios(baseUrl + "/ErpPublicServer.asmx/GetEmpAndLiableByEmpCode", data);

/**
 * 接受者信息
 * @param {string} EmpCode  接受者工号/报废者
 *
 */
export const JDGetEmployeeInfoByNumber = (data) => axios(baseUrl + "/ErpForWeixinServer.asmx/GetEmployeeInfoByNumber", data);

/**
 * 财产移交数据提交接口
 * @param {string} FARichesMoveJson
 *
 */
export const JDInsertIntoFARichesMove = (data) => axios(baseUrl + "/ErpForWeixinServer.asmx/InsertIntoFARichesMove", data);

/**
 * 根据财产卡片ID串（选中多个财产，ID以逗号隔开）获得财产信息到报废列表清单中
 * @param {string} CardIDList 多个已逗号隔开
 *
 */
export const JDGetScrapList = (data) => axios(baseUrl + "/ERPForWeixinServer.asmx/GetWeixinFACardInfoByID", data);

/**
 * 我的考核
 * @param {string} FWeixinOpenID
 *
 */
export const JDGetAppraisal = (data) => axios(baseUrl + "/ERPForWeixinServer.asmx/GetAppraisal", data);

/** 我要充卡 */
export const JDChargeCard = (data) => axios(baseUrl + "/ErpForWeixinServer.asmx/ChargeCard", data);

/** 我的产量  条件框 */
export const JDGetProcessOutputReport = (data) => axios(baseUrl + "/ErpForAndroidStockServer.asmx/GetProcessOutputReport", data);

/**
 * 我的产量 列表
 * @param {string} FItemID
 * @param {string} BeginDate
 * @param {string} EndDate
 * @param {string} FDeptID
 * @param {string} FWeixinOpenID
 * @param {string} suitID
 *
 */
export const JDGetProcessOutputReportDetail = (data) => axios(baseUrl + "/ErpForAndroidStockServer.asmx/GetProcessOutputReportDetail", data, "UrlDecode");

/**
 * 报废 提交
 * /ErpPublicServer.asmx/InsertIntoFACardRect
 *
 */
export const JDInsertIntoFACardRect = (data) => axios(baseUrl + "/ErpForWeixinServer.asmx/InsertIntoFACardRect", data);

/**
 * 考勤 查询当月打卡记录
 *
 */
export const JDGetAttendanceCard = (data) => axios(baseUrl + "/ErpForWeixinServer.asmx/GetAttendanceCard", data, "UrlDecode");

/**
 * 考勤 打卡
 *
 */
export const JDAttendanceCard = (data) => axios(baseUrl + "/ErpForWeixinServer.asmx/AttendanceCard", data);

/**
 * 获取验证码
 * @param {string} phone
 */
export const JDgetSmsCode = (data) => axios(baseUrl + "/ERPForAppServer.asmx/SendVerificationCode", data);

/**
 * 绑定手机号码
 * @param {string} phone
 */
export const JDWeChatBindingUser = (data) => axios(baseUrl + "/ERPForWeixinServer.asmx/WeChatBindingUser", data);

/**
 * 成型当日产量
 * @param {string} level 3：主表 2：明细表
 * @param {string} FShortName 组别
 * @param {string} FBillNo 单号
 */
export const JDGetProduction = (data) => axios(baseUrl + "/ERPForWeixinServer.asmx/GetProductionOther", data);

/**
 * 我的当日汇报明细
 * @param {string} FWeixinOpenID openid
 * @param {string} FStartTime=2019-03-03 开始时间
 * @param {string} FEndTime=2019-03-03 结束时间
 */
export const JDGetReportedDetails = (data) => axios(baseUrl + "/ERPForWeixinServer.asmx/GetReportedDetails", data);

/**
 * 查询通讯录字母
 */
export const JDGetPeasonalContactLetter = (data) => axios(baseUrl + "/ErpPublicServer.asmx/GetPeasonalContactLetter", data);

/**
 * 企业通讯录
 * @param {string} KeyWord 关键字
 */
export const JDGetPeasonalContactInfo = (data) => axios(baseUrl + "/ErpPublicServer.asmx/GetPeasonalContactInfo", data);

/**
 * 企业通讯录明细
 * @param {string} contact_id 联系人ID
 */
export const JDGetPeasonalDetailInfo = (data) => axios(baseUrl + "/ErpPublicServer.asmx/GetPeasonalDetailInfo", data, "parse");

/**
 * 查询通讯录字母(新)
 */
export const JDGetPeasonalContactLetterNew = (data) => axios(baseUrl + "/ErpPublicServer.asmx/GetPeasonalContactLetterNew", data);

/**
 * 企业通讯录(新)
 * @param {string} KeyWord 关键字
 */
export const JDGetPeasonalContactInfoNew = (data) => axios(baseUrl + "/ErpPublicServer.asmx/GetPeasonalContactInfoNew", data);

/**
 * 企业通讯录明细(新)
 * @param {string} contact_id 联系人ID
 */
export const JDGetPeasonalDetailInfoNew = (data) => axios(baseUrl + "/ErpPublicServer.asmx/GetPeasonalDetailInfoNew", data, "parse");

/**
 * 来宾邀请
 * @param {string} FWeixinOpenID openid
 */
export const JDGuestInvitation = (data) => axios(baseUrl + "/ErpForWeixinServer.asmx/GuestInvitation", data);

/**
 * 来宾邀请提交
 * @param {string} FWeixinOpenID openid
 */
export const JDGuestInvitationSubmission = (data) => axios(baseUrl + "/ErpForWeixinServer.asmx/GuestInvitationSubmission", data);

/**
 * 来宾邀请查看
 * @param {string} FWeixinOpenID openid
 * @param {string} zt
 */
export const JDGuestInvitationView = (data) => axios(baseUrl + "/ErpForWeixinServer.asmx/GuestInvitationView", data, "UrlDecode");

/**
 * 来宾邀请二维码列表查看
 * @param {string} id
 */
export const JDGuestInvitationQRCodeList = (data) => axios(baseUrl + "/ErpForWeixinServer.asmx/GuestInvitationQRCodeList", data, "UrlDecode");

/**
 * 来宾邀请二维码扫描
 * @param {string} id
 */
export const JDGuestInvitationQRCode = (data) => axios(baseUrl + "/ErpForWeixinServer.asmx/GuestInvitationQRCode", data, "UrlDecode");

/**
 * 合理化建议
 * @param {string} id
 */
export const JDProcessOptimization = (data) => axios(baseUrl + "/ErpForWeixinServer.asmx/ProcessOptimization", data);

/**
 * 获取车间
 *
 */
export const JDGetWorkShop = (data) => axios(baseUrl + "/ERPForWeixinServer.asmx/GetWorkShop", data);

/**
 * 车间当日产量
 * @param {string} Exec_TodayDateTime:'2019-03-06' 日期
 * @param {string} Exec_Where:'where t.FWorkShopID=1' 车间ID
 */
export const JDGetPrdShopDayReport = (data) => axios(baseUrl + "/ERPForSupplierServer.asmx/GetPrdShopDayReport", data);

/**
 * 地图逆解析
 */
export const mapApi = (data) => axios2("https://apis.map.qq.com/ws/geocoder/v1", data, "GET");

/**
 * 图片上传接口
 * @param {string} EmpCode
 * @param {string} FCheckInterID
 * @param {string} Pictures
 */
export const upLoadImg = (data) => axios(baseUrl + "/ERPForWeixinServer.asmx/UpdateWeixinInventory", data);

/**
 * 稽查结果提交
 * @param {string} FInterID
 * @param {string} Fnumber
 * @param {string} Pictures
 * @param {string} EmpCode
 * @param {string} InspectionResult
 */
export const JDIncomingInspection = (data) => axios(baseUrl + "/ErpForAndroidSever.asmx/IncomingInspection", data);

/**
 * 稽查申请提交
 * @param {string} Json
 * @param {string} EmpCode
 * @param {string} UserID
 */
export const JDInspectionApplication = (data) => axios(baseUrl + "/ErpForAndroidSever.asmx/InspectionApplication", data);

/**
 * 获取稽查列表
 * @param {string} StartDate
 * @param {string} EndDate
 * @param {string} Supplier
 * @param {string} Type
 */
export const JDGetIncomingList = (data) => axios(baseUrl + "/ErpForAndroidSever.asmx/GetIncomingList", data);

/**
 * 稽查扫码获取信息
 * @param {string} Type
 * @param {string} Zno
 */
export const JDGetInspectionDetail = (data) => axios(baseUrl + "/ErpForAndroidSever.asmx/GetInspectionDetail", data);

/**
 * 根据FInterID获取稽查图片列表
 * @param {string} FInterID
 */
export const JDGetIncomingPictures = (data) => axios(baseUrl + "/ErpForAndroidSever.asmx/GetIncomingPictures", data);

/**
 * 根据FInterID获取稽查单信息
 * @param {string} FInterID
 */
export const JDGetIncomingMessage = (data) => axios(baseUrl + "/ErpForAndroidSever.asmx/GetIncomingMessage", data);

/**
 * 异常上传
 * @param {string} FInterID
 * @param {string} ExceptionInformation
 * @param {string} UserID
 */
export const JDAbnormalUpload = (data) => axios(baseUrl + "/ErpForAndroidSever.asmx/AbnormalUpload", data);

/**
 * 稽查签收
 * @param {string} FInterID
 * @param {string} UserID
 */
export const JDSigning = (data) => axios(baseUrl + "/ErpForAndroidSever.asmx/Signing", data);

/**
 * 稽查结案
 * @param {string} FInterID
 * @param {string} UserID
 */
export const JDClosingCase = (data) => axios(baseUrl + "/ErpForAndroidSever.asmx/ClosingCase", data);

/**
 * 稽查异常处理
 * @param {string} FInterID
 * @param {string} FExceptionHandling
 * @param {string} UserID
 */
export const JDAuditExceptionHandling = (data) => axios(baseUrl + "/ErpForAndroidSever.asmx/AuditExceptionHandling", data);

/**
 * 调用微信二维码
 * @param {string} urlPage
 */
export const JDScanQRCode = (data) => axios(baseUrl + "/ErpForAndroidSever.asmx/ScanQRCode", data);

/**
 * 获取物料
 */
export const JDGetMaterialType = (data) => axios(baseUrl + "/ErpForAndroidSever.asmx/GetMaterialType", data);

/**
 * 实人认证
 */
export const JDH5Verify = (data) => axios(baseUrl2 + "/TransferService.asmx/H5Verify", data);

/**
 * 通用的模板头
 * @param FClassID 12
 * @param FInterID 114812
 * FormID=12&FInterID=114812
 */
export const JDGetWeixinGridFieldHead = (data) => axios(baseUrl + "/ERPForWeixinServer.asmx/GetWeixinGridFieldHeadNew", data);

/**
 * 通用的模板内容
 * @param FClassID 12
 * @param FInterID 114812
 * @param GridDBName Frm_Grid
 * FormID=12&FInterID=114812&Griddbname=Frm_Grid
 */
export const JDGetWeixinGridFieldValue = (data) => axios(baseUrl + "/ERPForWeixinServer.asmx/GetWeixinGridFieldValue", data);

/**
 * 待入住人员名单
 * @param FNumber：工号
 */
export const JDGetWaitForCheckInEmpList = (data) => axios(baseUrl + "/ErpForAppServer.asmx/GetWaitForCheckInEmpList", data);

/**
 * 获取登记详情
 * @param FItemID：员工ID
 */
export const JDGetEmpRegisterInfo = (data) => axios(baseUrl + "/ErpForAppServer.asmx/GetEmpRegisterInfo", data);

/**
 * 获取可住房间信息
 * @param FItemID：员工ID
 */
export const JDGetCheckedRoomBedInfo = (data) => axios(baseUrl + "/ErpForAppServer.asmx/GetCheckedRoomBedInfo", data);

/**
 * 通用的模板内容
 * @param string Json
 * @param string FEmpCode
 */
export const JDSubmitSsDormitory = (data) => axios(baseUrl + "/ErpForAppServer.asmx/SubmitSsDormitory", data);

/**
 * 获取语音识别码
 */
export const JDGetSessioncode = (data) => axios(baseUrl2 + "/TransferService.asmx/GetSessioncode", data);

/**
 * 活体认证
 */
export const JDGetVerify = (data) => axios(baseUrl2 + "/TransferService.asmx/GetVerify", data);

/**
 * 活体认证+人脸对比
 */
export const JDGetMatch = (data) => axios(baseUrl2 + "/TransferService.asmx/GetMatch", data);
