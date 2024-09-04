import { Component } from '@angular/core';
import { CompanySearcherService } from '../services/company-searcher.service';
import { SearchFields } from '../domain/search-fields';
import {FormsModule, NgForm} from '@angular/forms';
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
  public searchFields: SearchFields = new SearchFields();
  constructor(private searcher: CompanySearcherService) {}
  /**
   * searches for companies with the currently entered filters
   */
  public search() {
    console.log(this.searcher);
    this.searcher.getCompanies(HomeComponent.PAGE_SIZE,this.searchFields);
  }
}