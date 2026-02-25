export interface IListOptions<FilterType> {
  orderField?: string;
  orderDirection?: 'ASC' | 'DESC';
  limit?: number;
  offset?: number;
  filter?: Partial<FilterType>;
}
