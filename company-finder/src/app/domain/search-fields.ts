import { ShortCompanyResult, ShortCompanyResultPage } from "./short-company-result";

/**
 * the fields available during a search
 * and some settings regarding the display of the results
 */
export class SearchFields {
    public company_name: string;
    public page: ShortCompanyResultPage | undefined;
    public results: ShortCompanyResult[];
    public sortDescending: boolean;
    public sortBy: SortFields;
    constructor() {
      this.company_name = "";
      this.results = new Array<ShortCompanyResult>();
      this.page = undefined;
      this.sortDescending = false;
      this.sortBy = SortFields.COMPANY;
    }
    public get company(): string {
      return this.company_name;
    }
    public set company(name: string) {
      this.company_name = name;
    }
    /**
     * if there is a result-page to show
     */
    public get showResults(): boolean {
        return this.page != undefined;
    }
    /**
     * update the internal results displayed to the new results
     * @param result 
     */
    public updateResult(result: ShortCompanyResultPage) {
        this.page = result;
        this.results = result.results;
    }
    /*public get results(): ShortCompanyResult[] {
      if(this.page) {
        return this.page.results;
      }
      return new Array<ShortCompanyResult>();
    }*/
    /**
     * turns the search into an URL
     * @param baseUrl 
     * @param pageSize 
     * @returns 
     */
    public toUrl(baseUrl: string, pageSize: number): URL {
      var result = new URL(baseUrl);
      result.searchParams.append("size",pageSize.toString());
      result.searchParams.append("sort",this.sortBy);
      result.searchParams.append("desc",this.sortDescending.toString());
      if(this.page != undefined) {
        result.searchParams.append("page",this.page.page.toString());
      }
      else {
        result.searchParams.append("page",ShortCompanyResultPage.FIRST_PAGE_NUMBER.toString());
      }
      if(this.company_name.length >= 1) {
        result.searchParams.append("search_company",this.company_name);
      }
      return result;
    }
}
/**
 * all possible fields by which the results can get sorted
 */
export enum SortFields {
    COMPANY = "company",
    STREET = "street",
    STREET_NUMBER = "street_number",
    POSTCODE = "postcode",
    CITY = "city",
    STATE = "state",
    COUNTRY = "country"
}