

const AUTHORIZE_URL = 'https://api.instagram.com/oauth/authorize'
const TOKEN_URL = 'https://api.instagram.com/oauth/access_token'
const GRAPH_URL = 'https://graph.instagram.com/me'

const CLIENT_ID = '405700611623409'
const CLIENT_SECRET = '8ee07b630a0d72ac51b7557af3425522'
const REDIRECT_URI = 'https://www.nextadventure.com/'

export const getAuthURL = () => {
  let uri = AUTHORIZE_URL
  uri += `?client_id=${CLIENT_ID}`
  uri += `&redirect_uri=${REDIRECT_URI}`
  uri += '&scope=user_profile'
  uri += '&response_type=code'
  return uri
}

export const getToken = async (code: string) => {
  const body = new FormData()
  body.append('client_id', CLIENT_ID)
  body.append('client_secret', CLIENT_SECRET)
  body.append('code', code)
  body.append('redirect_uri', REDIRECT_URI)
  body.append('grant_type', 'authorization_code')

  try {
    const res = await fetch(TOKEN_URL, { 
      method: 'POST', 
      headers: {
        Accept: 'application/json',
      },
      body
    })
    return await res.json()
  } catch (e) {
    console.log({ e })
  }
}

export const getMe = async (accessToken: string) => {
  const res = await fetch(`${GRAPH_URL}?fields=username&access_token=${accessToken}`)
  return await res.json()
}