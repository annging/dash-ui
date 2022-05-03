
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://notion-avatar.vercel.app/api/img/eyJmYWNlIjozLCJub3NlIjo4LCJtb3V0aCI6MTUsImV5ZXMiOjgsImV5ZWJyb3dzIjoxMywiZ2xhc3NlcyI6NCwiaGFpciI6MjUsImFjY2Vzc29yaWVzIjowLCJkZXRhaWxzIjowLCJiZWFyZCI6MCwiZmxpcCI6MCwiY29sb3IiOiJyZ2JhKDI1NSwgMCwgMCwgMCkiLCJzaGFwZSI6Im5vbmUifQ==',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://notion-avatar.vercel.app/api/img/eyJmYWNlIjozLCJub3NlIjo4LCJtb3V0aCI6MTUsImV5ZXMiOjgsImV5ZWJyb3dzIjoxMywiZ2xhc3NlcyI6NCwiaGFpciI6MjUsImFjY2Vzc29yaWVzIjowLCJkZXRhaWxzIjowLCJiZWFyZCI6MCwiZmxpcCI6MCwiY29sb3IiOiJyZ2JhKDI1NSwgMCwgMCwgMCkiLCJzaGFwZSI6Im5vbmUifQ==s',
    name: 'Normal Editor'
  }
}

module.exports = [
  // user login
  {
    url: '/system/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]
      console.log(config.body);
      console.log(token);
      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 200,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
