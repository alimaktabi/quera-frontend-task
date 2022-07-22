import { User } from "./User"

export type Repository = {
  id: number
  node_id: string
  name: string
  full_name: string
  owner: User
  private: boolean
  html_url: string
  description: string
  fork: boolean
  url: string
  forks_url: string
  keys_url: string
  collaborators_url: string
  teams_url: string
  hooks_url: string
  created_at: string
  updated_at: string
  pushed_at: string
  homepage: string
}
