export interface MovieProvider {
  logo_path: string;
  provider_id: number;
  provider_name: string;
}

export interface MovieProvidersResponse {
  results: MovieProvider[];
}
