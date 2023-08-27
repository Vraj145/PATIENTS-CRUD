import { validateHorizontalPosition, validateVerticalPosition } from '@angular/cdk/overlay';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PatientListService } from 'src/app/services/patient-list.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  public params = new HttpParams;
  context: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private _patientlistService: PatientListService, public dialog: MatDialogRef<PatientListComponent>) {
    this.context = this.formBuilder.group({
      mobileNo: new FormControl('', [Validators.required,Validators.pattern('[0-9]{10}')]),
      firstName: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z]+$')]),
      lastName: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z]+$')]),
      zipCode: new FormControl('',[Validators.required,Validators.pattern('[0-9]{6}')]),
      dob: new FormControl('',[Validators.required]),
      gender: new FormControl('',[Validators.required]),
      bloodGroup: new FormControl('',[Validators.required])
    });
  }

  get mobileNo() {
    return this.context.get('mobileNo');
  }

  ngOnInit(): void {

  }

  submitForm() {
    let data = this.context.value;
    let payload = {
      "apikey": "dwkoortGX8DVYzLP559sGJeWty4wX0de",
      "mobile": data.mobileNo,
      "first_name": data.firstName,
      "last_name": data.lastName,
      "zipcode": data.zipCode,
      "dob": data.dob,
      "gender": data.gender,
      "blood_group": data.bloodGroup
    }
    this._patientlistService.AddPatient(payload).subscribe((res) => {
      this.dialog.close(res);
    });
  }

  close() {
    this.dialog.close();
  }
}
