import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadModel } from 'src/models/ux.model';

@Component({
  selector: 'app-bread',
  templateUrl: './bread.component.html',
  styleUrls: ['./bread.component.scss']
})
export class BreadComponent implements OnInit {
  @Input() breads: BreadModel[];
  constructor(private router: Router) { }

  ngOnInit() {
  }
  goto(e){
    this.router.navigate([e])
  }
}
