import { login, logout, getInfo } from '@/api/user'
import { wxlogin } from '@/api/wx'
import { getToken, setToken, removeToken, getUserInfo, setUserInfo, removeUserInfo } from '@/utils/auth'
import { resetRouter } from '@/router'
import axios from 'axios'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

let user = {}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ name: username.trim(), pwd: password }).then(response => {
        commit('SET_TOKEN', response.data.token)
        setToken(response.data.token)
        setUserInfo(response.data.user)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      /*getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })*/
      const data = JSON.parse(getUserInfo())
      if (!data) {
        reject('Verification failed, please Login again.')
      }
      console.log(data)
      const { nickName, wxImg } = data

      console.log(nickName)
      commit('SET_NAME', nickName)
      commit('SET_AVATAR', wxImg)
      resolve(data)
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      removeUserInfo()
      resetRouter()
      commit('RESET_STATE')
      resolve()
      /*logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })*/
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },

  wxlogin({ commit }, wxInfo) {
    const { code, state } = wxInfo
    console.log(code)
    console.log(state)
    return new Promise((resolve, reject) => {
      axios.get('http://47.107.137.16:8090/system/login/callBack?code=' + code + '&state=' + state)
        .then(function (response) {
          // handle success
          console.log(response)
          response = response.data
          commit('SET_TOKEN', response.data.token)
          setToken(response.data.token)
          setUserInfo(response.data.user)
          resolve()
        })
        .catch(function (error) {
          // handle error
          console.log(error)
          reject(error)
        })
        .then(function () {
          // always executed
        })
      /*wxlogin({ code: code, state: state }).then(response => {
        console.log(response)
        commit('SET_TOKEN', response.data.token)
        setToken(response.data.token)
        setUserInfo(response.data.user)
        resolve()
      }).catch(error => {
        reject(error)
      })*/
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

