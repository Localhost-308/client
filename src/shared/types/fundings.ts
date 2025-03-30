interface FundingDetail {
  percent: number;
  total: number;
}

interface FundingSources {
  empresas: FundingDetail;
  governo: FundingDetail;
  investidores_privados: FundingDetail;
  ong: FundingDetail;
}

interface FundingData {
  funding_sources: FundingSources;
  total: number;
  uf: string;
  year: number;
}