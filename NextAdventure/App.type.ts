import { Profile } from './src/utils/Type'

export type MatchStackParamList = {
  Match: undefined
}

export type ProfileStackParamList = {
  Profile: undefined
}

export type SocialStackParamList = {
  Inbox: undefined
  Chat: { profile: Profile }
}

export type StackParamList = {
  Auth: undefined
  Signup: undefined
}

export type TabParamList = {
  SocialStack: undefined
  MatchStack: undefined
  ProfileStack: undefined
}
