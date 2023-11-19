export enum EntityGender {
  male = "male",
  female = "female",
  both = "both",
}

export interface Measurement {
  id: number
  measured_at: Date
  value: number
  code: string
  title: string
  warning: string
  max: number
  min: number
  unit: string
  description: string
  gender: EntityGender
}

export interface Entity {
  id: number
  code: string
  title: string
}

export interface FamilyMember {
  id: number
  first_name: string
  member: string
}

export enum WarningEnum {
  HIGH = "HIGH",
  LOW = "LOW",
}
