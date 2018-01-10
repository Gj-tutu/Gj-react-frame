/**
 * 接口统一配置信息
 * 可配置请求类型,是否需要验证,支持path参数
 */
export const POST = 'post'
export const GET = 'get'
export const PUT = 'put'
export const DELETE = 'delete'
export const UPLOAD = 'upload'
export const FORM = 'form'
const ApiSetting = {}
export default ApiSetting
export const ApiPath = __API_PATH__
