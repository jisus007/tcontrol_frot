import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '../../../node_modules/@angular/material';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {

  constructor(public dialogRef: MatDialogRef<AlertComponent>) { }

  public confirmMessage:string;

  public title:string;

}
