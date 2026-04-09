
<div style="max-width: 520px; margin: 24px auto; font-family: Arial;">
  <h2>Contact Form</h2>

  <form [formGroup]="contactForm" (ngSubmit)="submit()">

    <!-- Full Name -->
    <div style="margin-bottom: 12px;">
      <label>Full Name</label>
      <input type="text" formControlName="fullName" style="width:100%; padding:8px;">
      <small style="color:red" *ngIf="f.fullName.touched && f.fullName.invalid">
        Full name is required (min 3 characters).
      </small>
    </div>

    <!-- Email -->
    <div style="margin-bottom: 12px;">
      <label>Email</label>
      <input type="email" formControlName="email" style="width:100%; padding:8px;">
      <small style="color:red" *ngIf="f.email.touched && f.email.invalid">
        Enter a valid email address.
      </small>
    </div>

    <!-- Phone -->
    <div style="margin-bottom: 12px;">
      <label>Phone Number</label>
      <input type="text" formControlName="phone" style="width:100%; padding:8px;" placeholder="10 digits">
      <small style="color:red" *ngIf="f.phone.touched && f.phone.invalid">
        Enter a valid 10-digit phone number.
      </small>
    </div>

    <!-- Sex -->
    <div style="margin-bottom: 12px;">
      <label>Sex</label><br/>
      <label><input type="radio" value="Male" formControlName="sex"> Male</label>&nbsp;&nbsp;
      <label><input type="radio" value="Female" formControlName="sex"> Female</label>&nbsp;&nbsp;
      <label><input type="radio" value="Other" formControlName="sex"> Other</label>
      <div style="color:red" *ngIf="f.sex.touched && f.sex.invalid">
        Please select an option.
      </div>
    </div>

    <!-- Attachment -->
    <div style="margin-bottom: 12px;">
      <label>Attachment</label>
      <input type="file" (change)="onFileChange($event)" style="width:100%; padding:6px;">
      <small *ngIf="file">Selected: {{ file.name }}</small>
    </div>

    <div style="margin-bottom: 12px;">
  <label>Confirmation</label>

  <select formControlName="consent" style="width:100%; padding:8px;">
    <option value="Select" disabled>Select</option>
    <option value="Yes">Yes</option>
    <option value="No">No</option>
  </select>

  <small style="color:red"
        *ngIf="f.consent.touched && f.consent.value === 'Select'">
    Please select Yes or No
  </small>
</div>

    <!-- Buttons -->
    <div style="margin-top: 18px;">
      <button type="submit" [disabled]="contactForm.invalid" style="padding:10px 16px;">
        Submit
      </button>

      <button type="button" (click)="cancel()" style="padding:10px 16px; margin-left:10px;">
        Cancel
      </button>
    </div>

  </form>
</div>


-----------------------------------------------------------------------


import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {

  private fb = inject(FormBuilder);

  file: File | null = null;

  contactForm = this.fb.group({
    fullName: this.fb.control<string>('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true
    }),
    email: this.fb.control<string>('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true
    }),
    phone: this.fb.control<string>('', {
      validators: [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
      nonNullable: true
    }),
    sex: this.fb.control<string>('', {
      validators: [Validators.required],
      nonNullable: true
    }),

    consent: this.fb.control<'Select' | 'Yes' | 'No'>('Select', {
      validators: [Validators.required],
      nonNullable: true
    }),

    attachment: this.fb.control<File | null>(null)
    
  });

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const selected: File | null = input.files && input.files.length ? input.files[0] : null;

    this.file = selected;
    this.contactForm.patchValue({ attachment: selected });
  }

  submit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('fullName', this.contactForm.value.fullName ?? '');
    formData.append('email', this.contactForm.value.email ?? '');
    formData.append('phone', this.contactForm.value.phone ?? '');
    formData.append('sex', this.contactForm.value.sex ?? '');
    formData.append('consent', this.contactForm.value.consent ?? 'Select');

    if (this.file) {
      formData.append('attachment', this.file);
    }

    console.log('Form Values:', this.contactForm.value);

    alert('Contact form submitted successfully!');
    this.cancel();
  }

  cancel() {
    this.contactForm.reset({
      fullName: '',
      email: '',
      phone: '',
      sex: '',      
      attachment: null
    });
    this.file = null;
  }

  get f() {
    return this.contactForm.controls;
  }
}
