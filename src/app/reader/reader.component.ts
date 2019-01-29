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
    this.nfc.on('reader', reader => {

      console.log(`${reader.reader.name}  device attached`);

      // enable when you want to auto-process ISO 14443-4 tags (standard=TAG_ISO_14443_4)
      // when an ISO 14443-4 is detected, SELECT FILE command with the AID is issued
      // the response is available as card.data in the card event
      // see examples/basic.js line 17 for more info
      // reader.aid = 'F222222222';

      reader.on('card', card => {

        // card is object containing following data
        // [always] String type: TAG_ISO_14443_3 (standard nfc tags like MIFARE) or TAG_ISO_14443_4 (Android HCE and others)
        // [always] String standard: same as type
        // [only TAG_ISO_14443_3] String uid: tag uid
        // [only TAG_ISO_14443_4] Buffer data: raw data from select APDU response

        console.log(`${reader.reader.name}  card detected`, card);

      });

      reader.on('card.off', card => {
        console.log(`${reader.reader.name}  card removed`, card);
      });

      reader.on('error', err => {
        console.log(`${reader.reader.name}  an error occurred`, err);
      });

      reader.on('end', () => {
        console.log(`${reader.reader.name}  device removed`);
      });

    });

    this.nfc.on('error', err => {
      console.log('an error occurred', err);
    });
  }

}
