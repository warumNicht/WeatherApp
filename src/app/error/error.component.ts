import {Component, Injectable, OnInit} from '@angular/core';
import {SessionStorageService} from 'angular-web-storage';

@Injectable()
@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  message: string;
  status: number;

  constructor(public session: SessionStorageService) {
  }

  ngOnInit() {
    this.message = this.session.get('er');
    this.status = this.session.get('code');
    this.session.set('er', null);
    this.session.set('code', null);
  }
}
