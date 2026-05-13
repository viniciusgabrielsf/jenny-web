import { apiClient } from '@/api/client';
import type { IListOptions } from '@/api/interfaces';

export type TeamsFilter = {
  search?: string;
};

export type TeamMember = {
  id: string;
  fullName: string;
  avatar?: string;
};

export type Team = {
  id: string;
  name: string;
  createdByUserId: string;
  createdAt: string;
  updatedAt: string;
  members: TeamMember[];
};

export type TeamsListResponse = {
  total: number;
  items: Team[];
};

export type CreateTeamRequest = {
  name: string;
  members: string[];
};

export type EditTeamRequest = CreateTeamRequest & {
  teamId: string;
};

export const teamsEndpoints = {
  GET_TEAMS: '/teams/me',
  CREATE_TEAM: '/teams',
  EDIT_TEAM: (teamId: string) => `/teams/${teamId}`,
  DELETE_TEAM: (teamId: string) => `/teams/${teamId}`,
};

export const teamsClient = {
  getMyTeams: async (request: IListOptions<TeamsFilter>): Promise<TeamsListResponse> =>
    apiClient.get<TeamsListResponse>(teamsEndpoints.GET_TEAMS, { params: request }).then(response => response.data),
  createTeam: async (request: CreateTeamRequest): Promise<Team> =>
    apiClient.post<Team>(teamsEndpoints.CREATE_TEAM, request).then(response => response.data),
  editTeam: async (request: EditTeamRequest): Promise<Team> =>
    apiClient.patch<Team>(teamsEndpoints.EDIT_TEAM(request.teamId), request).then(response => response.data),
  deleteTeam: async (teamId: string): Promise<void> =>
    apiClient.delete(teamsEndpoints.DELETE_TEAM(teamId)).then(() => {}),
};
