export interface PricesColaborators{
      id?: string,
      name?: string,
      lastName?: string,
      idProfilesStatus?: number,
      yearPay?: number,
      monthPay?: number,
      firstPeriod?: boolean | string,
      secondPeriod?: boolean | string,
      amount?: number,
      payDate?: string,
      serviceRelatedNotes?: string,
      idPricesColaborators?: string,
      secondLastName? : string,
      title?: string;
      select?: boolean;
      notSelect?: boolean;
}

export interface PricesColaboratorsResult {
data: PricesColaborators[];
pages: number
}
