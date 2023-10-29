import { Injectable } from '@angular/core';
import { InventoryBrand, InventoryCategory, InventoryPagination, InventoryProduct, InventoryTag, InventoryVendor } from './inventory.types';
import { BehaviorSubject, Observable, filter, map, of, switchMap, take, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService  {
    private _brands: BehaviorSubject<InventoryBrand[] | null> = new BehaviorSubject(null);
    private _categories: BehaviorSubject<InventoryCategory[] | null> = new BehaviorSubject(null);
    private _pagination: BehaviorSubject<InventoryPagination | null> = new BehaviorSubject(null);
    private _product: BehaviorSubject<InventoryProduct | null> = new BehaviorSubject(null);
    private _products: BehaviorSubject<InventoryProduct[] | null> = new BehaviorSubject(null);
    private _tags: BehaviorSubject<InventoryTag[] | null> = new BehaviorSubject(null);
    private _vendors: BehaviorSubject<InventoryVendor[] | null> = new BehaviorSubject(null);

  localUrl: string ='http://localhost:8080/api/v1/auth'
    products: any;

  //private _httpClient: any;
  constructor(private http: HttpClient) { }

   /**
     * Create product
     */
   ajoutArticle(): Observable<InventoryProduct>
   {
       return this.products$.pipe(
           take(1),
           switchMap(products => this.http.post<InventoryProduct>(`${this.localUrl}/create`, {}).pipe(
            map((newProduct) => {
                // Update the products with the new product
                this._products.next([newProduct, ...this.products]);

                // Return the new product
                return newProduct;
            }),
           )),
       );
   }

   /**
     * Update product
     *
     * @param id
     * @param product
     */
   updateArticle(id: string, product: InventoryProduct): Observable<InventoryProduct>
   {
       return this.products$.pipe(
           take(1),
           switchMap(products => this.http.patch<InventoryProduct>(`${this.localUrl}/update`, {
               id,
               product,
           }).pipe(
               map((updatedProduct) =>
               {
                   // Find the index of the updated product
                   const index = products.findIndex(item => item.id === id);

                   // Update the product
                   products[index] = updatedProduct;

                   // Update the products
                   this._products.next(products);

                   // Return the updated product
                   return updatedProduct;
               }),
               switchMap(updatedProduct => this.product$.pipe(
                   take(1),
                   filter(item => item && item.id === id),
                   tap(() =>
                   {
                       // Update the product if it's selected
                       this._product.next(updatedProduct);

                       // Return the updated product
                       return updatedProduct;
                   }),
               )),
           )),
       );
   }


  /**
     * Get products
     *
     *
     * @param page
     * @param size
     * @param sort
     * @param order
     * @param search
     */
    listArticles(page: number = 0, size: number = 10,
        sort: string = 'name', order: 'asc' | 'desc' | '' = 'asc', search: string = ''):
  Observable<{ pagination: InventoryPagination; products: InventoryProduct[] }>
{
        return this.http.get<{
            pagination: InventoryPagination;
            products: InventoryProduct[]
        }>(`${this.localUrl}/findAll`, {
      params: {
          page: '' + page,
          size: '' + size,
          sort,
          order,
          search,
      },
  }).pipe(
      tap((response) =>
      {
          this._pagination.next(response.pagination);
          this._products.next(response.products);
      }),
  );
}

  /**
     * Delete the product
     *
     * @param id
     */
  deleteArticle(id: string): Observable<boolean>
  {
      return this.products$.pipe(
          take(1),
          switchMap(products => this.http.delete(`${this.localUrl}/delete`, {params: {id}}).pipe(
              map((isDeleted: boolean) =>
              {
                  // Find the index of the deleted product
                  const index = products.findIndex(item => item.id === id);

                  // Delete the product
                  products.splice(index, 1);

                  // Update the products
                  this._products.next(products);

                  // Return the deleted status
                  return isDeleted;
              }),
          )),
      );
  }


   /**
     * Get product by id
     */
   getArticleById(id: string): Observable<InventoryProduct>
   {
       return this._products.pipe(
           take(1),
           map((products) =>
           {
               // Find the product
               const product = products.find(item => item.id === id) || null;

               // Update the product
               this._product.next(product);

               // Return the product
               return product;
           }),
           switchMap((product) =>
           {
               if ( !product )
               {
                   return throwError('Could not found product with id of ' + id + '!');
               }

               return of(product);
           }),
       );
   }

  /**
     * Getter for brands
     */
  get brands$(): Observable<InventoryBrand[]>
  {
      return this._brands.asObservable();
  }
 /**
     * Getter for pagination
     */
 get pagination$(): Observable<InventoryPagination>
 {
     return this._pagination.asObservable();
 }
/**
     * Getter for categories
     */
get categories$(): Observable<InventoryCategory[]>
{
    return this._categories.asObservable();
}
 /**
     * Getter for product
     */
 get product$(): Observable<InventoryProduct>
 {
     return this._product.asObservable();
 }

 /**
  * Getter for products
  */
 get products$(): Observable<InventoryProduct[]>
 {
     return this._products.asObservable();
 }

 /**
  * Getter for tags
  */
 get tags$(): Observable<InventoryTag[]>
 {
     return this._tags.asObservable();
 }

    /**
     * Getter for vendors
     */
    get vendors$(): Observable<InventoryVendor[]>
    {
        return this._vendors.asObservable();
    }
    /**
     * Get brands
     */
    getBrands(): Observable<InventoryBrand[]>
    {
        return this.http.get<InventoryBrand[]>('api/apps/articles/inventory/brands').pipe(
            tap((brands) =>
            {
                this._brands.next(brands);
            }),
        );
    }
     /**
     * Create tag
     *
     * @param tag
     */
     createTag(tag: InventoryTag): Observable<InventoryTag>
     {
         return this.tags$.pipe(
             take(1),
             switchMap(tags => this.http.post<InventoryTag>('api/apps/articles/inventory/tag', {tag}).pipe(
                 map((newTag) =>
                 {
                     // Update the tags with the new tag
                     this._tags.next([...tags, newTag]);

                     // Return new tag from observable
                     return newTag;
                 }),
             )),
         );
     }

    /**
     * Update the tag
     *
     * @param id
     * @param tag
     */
    updateTag(id: string, tag: InventoryTag): Observable<InventoryTag>
    {
        return this.tags$.pipe(
            take(1),
            switchMap(tags => this.http.patch<InventoryTag>('api/apps/article/inventory/tag', {
                id,
                tag,
            }).pipe(
                map((updatedTag) =>
                {
                    // Find the index of the updated tag
                    const index = tags.findIndex(item => item.id === id);

                    // Update the tag
                    tags[index] = updatedTag;

                    // Update the tags
                    this._tags.next(tags);

                    // Return the updated tag
                    return updatedTag;
                }),
            )),
        );
    }


}
