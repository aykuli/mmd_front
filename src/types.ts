export enum EntityGender {
  male = "male",
  female = "female",
  both = "both",
}

export interface IMeasurement {
  id: number
  user_id: number
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

export interface IUser {
  id: number
  first_name: string
  member: string
  parent_id: null | number
  gender: string
  isAdmin: boolean
}

export enum WarningEnum {
  HIGH = "HIGH",
  LOW = "LOW",
}

// Measurements by date page
export interface IMeasurementInList {
  id: number
  user_id: number
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

export interface IGroupedMeasurement {
  [key: string]: IMeasurementInList[]
}

export interface IEntity {
  id: number
  code: string
  title: string
  alias: string
  max: number
  min: number
  unit: string
  description: string
  gender: string
  group_id: number | string
}

export interface IEntityGroup {
  id: number
  code: string
  title: string
}
