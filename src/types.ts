export enum EntityGender {
  male = "male",
  female = "female",
  both = "both",
}

export interface Measurement {
  id: number
  measured_at: Date
  value: number
  warning: string
  max: number
  min: number
  unit: string
  description: string
  gender: EntityGender
  entity_title: string
  entity_code: string
  group_title: string
  group_code: string
  group_precedence: number
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

// Measurements by date page
export interface IMeasurementInList {
  id: number
  measured_at: Date
  value: number
  warning: string
  max: number
  min: number
  unit: string
  description: string
  entity_title: string
  entity_code: string
}
