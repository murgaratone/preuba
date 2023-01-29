export interface Payroll{
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
      view?:string;
}

export interface PayrollResult {
  data: Payroll[];
  pages: number
}
