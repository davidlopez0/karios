import { Component, OnInit } from '@angular/core';
import {Cloudinary} from '@cloudinary/url-gen';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'karios';

  ngOnInit() {
    const cld = new Cloudinary({cloud: {cloudName: 'du3os5qg9'}});
  }

}
