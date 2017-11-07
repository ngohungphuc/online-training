import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../common/services/auth.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'ota-path',
  templateUrl: './path.component.html',
  styleUrls: ['./path.component.scss']
})
export class PathComponent implements OnInit {
  pathList: any;
  constructor(private authSerivce: AuthService) { }

  ngOnInit() {
    const pathListUrl = 'api/LearningPath';
    this.authSerivce.Get(pathListUrl).subscribe(res => {
      this.pathList = res.json();
    });
  }

}
