import { Component, OnInit } from '@angular/core';
import { NFC } from 'nfc-pcsc';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css']
})
export class ReaderComponent implements OnInit {
  private nfc: NFC;

  constructor() {
    this.nfc = new NFC();
  }

  ngOnInit() {
  }

}
