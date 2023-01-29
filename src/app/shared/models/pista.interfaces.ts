export interface WashingTracks {
  name: string;
  id?: string;
  title?: string;
  select?: boolean;
  notSelect?: boolean;
}

export interface WashingTracksResult {
  data:WashingTracks[];
  pages: number
}
