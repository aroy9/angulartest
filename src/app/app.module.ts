-------------------------app.html-------------
  
<style>
  .box{background-color: red; width: 100%; height: 100px;}
  .box2{background-color: green; width: 100px; height: 100px;}
  .company-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.company-card {
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 6px;
  background: #fafafa;
}

.company-card h3 {
  margin-top: 0;
  color: #1976d2;
}

.company-card a {
  text-decoration: none;
  color: #1976d2;
  font-weight: 500;
}
</style>
<h2>Company Directory</h2>

<ng-container *ngIf="companies$ | async as companies; else loading">

  <div *ngIf="companies.length === 0" class="loading">
    No companies found (or API unavailable).
  </div>

  <div class="company-container" *ngIf="companies.length > 0">
    <div class="company-card" *ngFor="let company of companies; trackBy: trackById">

      <div class="header">
        <img class="logo" [src]="company.logo" alt="logo" />
        <div>
          <h3 class="name">{{ company.name }}</h3>
          <div class="sub">CEO: {{ company.ceoName }}</div>
        </div>
      </div>

      <div class="row"><span class="label">Address:</span> {{ company.address }}</div>
      <div class="row"><span class="label">Zip:</span> {{ company.zip }}</div>
      <div class="row"><span class="label">Country:</span> {{ company.country }}</div>
      <div class="row"><span class="label">Industry:</span> {{ company.industry }}</div>
      <div class="row"><span class="label">Employees:</span> {{ company.employeeCount }}</div>
      <div class="row"><span class="label">Market Cap:</span> {{ company.marketCap }}</div>

      <div class="row">
        <span class="label">Domain:</span>
        <a [href]="'https://' + company.domain" target="_blank">{{ company.domain }}</a>
      </div>

    </div>
  </div>

</ng-container>

<ng-template #loading>
  <div class="loading">Loading companies...</div>
</ng-template>

------------------------------app.ts--------------------

  import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompaniesService, Company } from './companies.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  private companiesService = inject(CompaniesService);

  // ✅ HTML uses companies$ so TS must also define companies$
  companies$: Observable<Company[]> = this.companiesService.getCompanies();

  trackById(_: number, item: Company) {
    return item.id;
  }
}

------------------companies.service.ts----------------------------

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

export interface Company {
  id: number;
  name: string;
  address: string;
  zip: string;
  country: string;
  employeeCount: number;
  industry: string;
  marketCap: number;
  domain: string;
  logo: string;
  ceoName: string;
}

@Injectable({ providedIn: 'root' })
export class CompaniesService {
  private http = inject(HttpClient);

  private readonly url = 'https://fake-json-api.mock.beeceptor.com/companies';

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.url).pipe(
      // ✅ prevents app crash if API fails
      catchError(() => of([]))
    );
  }
}


  -------------
