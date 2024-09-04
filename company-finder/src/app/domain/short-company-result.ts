/**
 * short informations about a company
 * -> used for display 
 */
export class ShortCompanyResult {
    /**
     * the ID of the company-entry
     */
    public id: string;
    /**
     * the name of the company
     */
    public name: string;
    /**
     * the street-name
     */
    public street: string;
    /**
     * string, because an house can be number "1a"
     */
    public streetNumber: string;
    /**
     * the zip-code of the city
     */
    public postcode: string | null;
    /**
     * the name of the city, where the HQ of the company lies
     */
    public city: string;
    /**
     * the name of the subdivision inside the country
     */
    public state: string | null;
    /**
     * the name of the country the company lies in
     */
    public country: string;
    /**
     * create a new object from the json-response
     * -> allows for later changes
     * @param obj 
     */
    constructor(obj: any) {
        
        this.id = obj.id;
        this.name = obj.company;
        this.street = obj.street;
        this.streetNumber = obj.street_number;
        this.postcode = obj.postcode;
        this.city = obj.city;
        this.state = obj.state;
        this.country = obj.country;
    }
}
/**
 * an object containing one page of company-results
 */
export class ShortCompanyResultPage {
    /**
     * whether the page-count starts at 0 or 1
     */
    public static readonly FIRST_PAGE_NUMBER = 1;
    /**
     * the list of results
     */
    public results: ShortCompanyResult[];
    /**
     * the current page number
     */
    public page: number;
    /**
     * the highest possible page number
     */
    public lastPage: number;
    /**
     * the lowest possible page-number
     * (always returns same value)
     */
    public get firstPage(): number {
        return ShortCompanyResultPage.FIRST_PAGE_NUMBER;
    }
    /**
     * if there is a result-page after this page
     */
    public get hasNext(): boolean {
        return this.page < this.lastPage;
    }
    /**
     * if this is not the first page of the search
     */
    public get hasPrevious(): boolean {
        return this.page > ShortCompanyResultPage.FIRST_PAGE_NUMBER;
    }
    /**
     * takes the server-response parsed as json and turns it into this internal page-format
     * @param obj 
     */
    constructor(obj: any) {
        console.log(obj);
        var list = new Array<ShortCompanyResult>();
        for(var entry of obj.content) {
            list.push(new ShortCompanyResult(entry));
        }
        this.results = list;
        this.page = obj.pageable.pageNumber;
        this.lastPage = obj.totalPages;
    }
}