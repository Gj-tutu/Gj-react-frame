import ApiSetting from './ApiSetting'
const Mock = (url) => {
  if (MockData[url]) {
    return {
      ok: true,
      body: JSON.stringify({
        'code': 200,
        'message': 'success',
        'data': MockData[url]
      })
    }
  } else {
    return {
      ok: true,
      body: JSON.stringify({
        'code': 404,
        'message': 'mock data not ready',
        'data': {}
      })
    }
  }
}
const MockData = { }
module.exports = Mock
