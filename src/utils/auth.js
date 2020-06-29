import Cookies from 'js-cookie'

const TokenKey = 'admin_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

const userinfo = 'user_info'

export function getUserInfo() {
  return Cookies.get(userinfo)
}

export function setUserInfo(user) {
  return Cookies.set(userinfo, user)
}

export function removeUserInfo() {
  return Cookies.remove(userinfo)
}