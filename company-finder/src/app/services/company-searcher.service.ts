import { Injectable } from '@angular/core';
import { AdditionalInfo, ShortCompanyResult, ShortCompanyResultPage } from '../domain/short-company-result';
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
  /**
   * gets additional informations about an company
   * @param resultObj the object containing the id of the wanted object
   */
  public async getCompany(resultObj: ShortCompanyResult): Promise<AdditionalInfo> {
    var response = await(fetch(CompanySearcherService.API_URL+"/company/"+resultObj.id));
    return new AdditionalInfo(await response.json());
  }
}
