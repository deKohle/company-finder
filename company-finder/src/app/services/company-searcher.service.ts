import { Injectable } from '@angular/core';
import { ShortCompanyResultPage } from '../domain/short-company-result';
import { SearchFields } from '../domain/search-fields';

/**
 * helps at accessing the API
 */
@Injectable({
  providedIn: 'root'
})
export class CompanySearcherService {
  /**
   * the base-URL of the API
   */
  private static readonly API_URL: string = "https://exercises.batix.help/api/v2/";
  constructor() { }
  /**
   * get a list of possible results for the given search
   * @param pageSize the maximum length of the result-array
   * @param search the different fields of the search
   * @param page to ask for a specific page of the result
   */
  public async getCompanies(pageSize: number, search: SearchFields, page: undefined | number = undefined): Promise<ShortCompanyResultPage> {
    var response = await(fetch(search.toUrl(CompanySearcherService.API_URL+"/company",pageSize, page)));
    var result = new ShortCompanyResultPage(await response.json());
    search.updateResult(result);
    return result;
  }
}
