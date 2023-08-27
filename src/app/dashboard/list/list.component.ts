import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientListService } from 'src/app/services/patient-list.service';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { PatientListComponent } from '../patient-list/patient-list.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  standalone: true,
  imports: [MatTableModule, MatDialogModule],
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['firstname', 'lastname', 'zipcode', 'mobile'];
  dataSource = [];
  patient_Id: string = 'cDgXYcDsiPKu8GX0e/ysSw=='
  constructor(private formBuilder: FormBuilder, private router: Router, private _patientlistService: PatientListService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.GetPatientData()
  }

  GetPatientData() {
    let payload = {
      "apikey": "dwkoortGX8DVYzLP559sGJeWty4wX0de",
      "patient_id": this.patient_Id
    }

    this._patientlistService.getallpatientList(payload).subscribe((res)=>{

      this.dataSource = res.data;
      console.log(res)
    });
  }

  AddPatient() {
    const dialogRef = this.dialog.open(PatientListComponent, {
      data: {
        // animal: 'panda',
      },
    });

    dialogRef.updateSize('670px', 'auto');

    dialogRef.afterClosed().subscribe((res) => {
      this.patient_Id = res.data.patient_id;
      this.GetPatientData();
    });
  }


}
