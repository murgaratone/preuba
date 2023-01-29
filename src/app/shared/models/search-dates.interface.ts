export interface SearchDatesList {
    startDate: string;
    endDate: string;
    id?: string;
  }
  
  export interface SearchDatesListResult {
    data: SearchDatesList[];
  }
    
  export interface SearchDates extends SearchDatesList {
  }