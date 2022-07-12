import { Profile } from './src/utils/Type'

export type SocialStackParamList = {
  Inbox: undefined
  Chat: { profile: Profile }
}

export type StackParamList = {
  Auth: undefined
  Signup: undefined
}

export type TabParamList = {
  Social: undefined
  Match: undefined
  Profile: undefined
}
