export enum Attitude {
  Okay = 0,
  Like = 1,
  Love = 2
}

export enum SkillLevel {
  Beginner = 0,
  Intermediate = 1,
  Advanced = 2
}

export type Activity = {
  attitude: Attitude
  preferences: string[]
  skillLevel: SkillLevel
  type: string
}

export const getEnumKeys = (e: { [s: number]: string }) => {
  const keys = []
  for (const k in e) {
      if (isNaN(Number(k))) {
        keys.push(k);
    }    
  }
  return keys
}