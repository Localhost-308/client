export interface AreaPoint {
  area_id: number;
  area_name: string;
  city: string;
  company_name: string;
  coordinates: [number, number]; // [latitude, longitude]
  number_of_trees_planted: number | null;
  reflorested_area_hectares: number | null;
  stage_indicator: string | null;
  total_area_hectares: number | null;
  tree_health_status: string |null;
  tree_survival_rate: number | null;
  uf: string;
}