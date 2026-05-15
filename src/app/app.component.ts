--------------------------app.HTML---------------------------

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

<!-- कंपनियाँ -->
<ng-container *ngIf="companies$ | async as companies; else companiesLoading">
  <div *ngIf="companies.length === 0" class="loading">
    No companies found (or API unavailable).
  </div>

  <div class="company-container" *ngIf="companies.length > 0">
    <div
      class="company-card"
      *ngFor="let company of companies; trackBy: trackById"
    >
      <div class="header">
        <img class="logo" [src]="company.logo" [alt]="company.name" />
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
    </div>
  </div>
</ng-container>

<ng-template #companiesLoading>
  <div class="loading">Loading companies...</div>
</ng-template>

<h2>USer Directory</h2>

<!-- यूज़र्स -->
<ng-container *ngIf="users$ | async as usersList; else usersLoading">
  <div *ngIf="usersList.length === 0" class="loading">
    No users found (or API unavailable).
  </div>

  <div class="company-container" *ngIf="usersList.length > 0">
    <div
      class="company-card"
      *ngFor="let user of usersList; trackBy: trackById"
    >
      <div class="header">
        <img class="logo" [src]="user.photo" [alt]="user.name" />
        <div>
          <h3 class="name">{{ user.name }}</h3>
          <div class="sub">{{ user.company }}</div>
          <div class="sub">@{{ user.username }}</div>
        </div>
      </div>

      <div class="row"><span class="label">Email:</span> {{ user.email }}</div>
      <div class="row"><span class="label">Phone:</span> {{ user.phone }}</div>
      <div class="row"><span class="label">Country:</span> {{ user.country }}</div>
      <div class="row"><span class="label">Zip:</span> {{ user.zip }}</div>
      <div class="row"><span class="label">State:</span> {{ user.state }}</div>
      <div class="row"><span class="label">Address:</span> {{ user.address }}</div>
    </div>
  </div>
</ng-container>

<ng-template #usersLoading>
  <div class="loading">Loading users...</div>
</ng-template>


  ---------------------------------app.ts-------------------------------------

  import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { CompaniesService, Company } from './companies.service';
import { UsersService, users } from './users.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  private companiesService = inject(CompaniesService);
  private usersService = inject(UsersService);

  // Streams for template
  companies$: Observable<Company[]> = this.companiesService.getCompanies();
  users$: Observable<users[]> = this.usersService.getusers();

  // ✅ ONE trackBy method used for both arrays
  trackById(_: number, item: { id: number }): number {
    return item.id;
  }
}

----------------------------------companies.service.ts--------------------------------

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

export interface Company {
  id: number;
  name: string;
  logo: string;
  ceoName: string;
  address: string;
  zip: string;
  country: string;
  industry: string;
  employeeCount: number;
  marketCap: string | number;
  domain: string;
}

@Injectable({ providedIn: 'root' })
export class CompaniesService {
  private http = inject(HttpClient);

  // ✅ Make sure this endpoint returns an array of companies
  private readonly url = 'https://fake-json-api.mock.beeceptor.com/companies';

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.url).pipe(
      catchError((err) => {
        console.error('Companies API failed:', err);
        return of([]); // ✅ prevents app crash
      })
    );
  }
}


--------------------------------Users.services.ts----------------------------------

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

export interface users {
  id: number;
  name: string;
  company: string;
  username: string;
  email: string;
  address: number;
  zip: string;
  state: number;
  country: string;
  phone: string;
  photo: string;
}

@Injectable({ providedIn: 'root' })
export class UsersService {
  private http = inject(HttpClient);
  private readonly url = 'https://fake-json-api.mock.beeceptor.com/users';

  getusers(): Observable<users[]> {
    return this.http.get<users[]>(this.url).pipe(
      catchError(() => of([]))
    );
  }
}

