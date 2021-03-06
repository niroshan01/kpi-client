import { Injectable, Inject } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '../../app.config';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DispatchNoteService extends MasterService {

  constructor(private anHttp: HttpClient, @Inject(APP_CONFIG) private aConfig: IAppConfig, private anAuthService: AuthService) {
    super(anHttp, aConfig, anAuthService);
    this.setApiUrl('dispatchNotes/');
  }

  saveRelease(object: Object): Observable<any> {
    return this.http
      .post(this.apiUrl + 'release', JSON.stringify(object), { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }

  getByCustomer(id: number): Observable<any> {
    return this.http.get(this.apiUrl + "customer/" + id, {headers: this.getJsonHeaders()})
      .catch(err => this.handleError(err));
  }

  getByCustomerAndInvoiceIsNull(id: number): Observable<any> {
    return this.http.get(this.apiUrl + "customerAndInvoiceIsNull/" + id, {headers: this.getJsonHeaders()})
      .catch(err => this.handleError(err));
  }

  getOne(id: any): Observable<any> {
    return this.http.get(this.apiUrl + id, { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }

  getDispatchNotePage(customer, startDate, endDate, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'dispatchNote?customer=' + customer+  '&startDate=' + startDate + '&endDate=' + endDate + '&page=' + page + '&size=' + size, { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }

  getDispatchNoteReleasePage(customer, startDate, endDate, location, page, size): Observable<any> {
    return this.http.get(this.apiUrl + 'dispatchNoteRelease?customer=' + customer + '&startDate=' + startDate + '&endDate=' + endDate + '&location=' + location + '&page=' + page + '&size=' + size, { headers: this.getJsonHeaders() })
      .catch(err => this.handleError(err));
  }
}
