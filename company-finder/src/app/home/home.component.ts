import { Component } from '@angular/core';
import { CompanySearcherService } from '../services/company-searcher.service';
import { SearchFields, SortFields } from '../domain/search-fields';
import { FormsModule, NgForm} from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe
  ],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  /**
   * the amount of entries per page
   */
  private static readonly PAGE_SIZE: number = 25;
  /**
   * used inside the template to access the enum
   */
  public readonly sortObj = SortFields;
  public searchFields: SearchFields = new SearchFields();
  constructor(private searcher: CompanySearcherService) {}
  /**
   * searches for companies with the currently entered filters
   * @param page to ask for a specific page of the result
   */
  public search(page: undefined | number = undefined) {
    this.searcher.getCompanies(HomeComponent.PAGE_SIZE,this.searchFields, page);
  }
  /**
   * changes the field by which the results get sorted or its order
   * ->does not change both at once
   * @param sort 
   */
  public changeSort(sort: SortFields): void {
    if(sort == this.searchFields.sortBy) {
      this.searchFields.sortDescending = !this.searchFields.sortDescending;
      this.search();
      return;
    }
    this.searchFields.sortBy = sort;
    this.search();
  }
  /**
   * changes the page of the result to the given page-number
   * @param page 
   */
  public changePage(page: number) {
    this.search(page);
  }
}