import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LessonDetail} from "../model/lesson-detail";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'lesson',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.css'],
  standalone: false
})
export class LessonDetailComponent implements OnInit {

  lesson$: Observable<LessonDetail>;

  constructor(private route: ActivatedRoute, private router: Router) {

    console.log("Created LessonDetailComponent...");

  }

  ngOnInit() {
    //No es correcte del tot encara
    this.lesson$ = this.route.snapshot.data["lesson"];
  }

  previous(lesson: LessonDetail) {

    this.router.navigate(['lessons', lesson.seqNo - 1],
        //indica que la ruta base és el nivell superior a lesson-detail, és a dir, el component del curs (CourseComponent).
        {relativeTo: this.route.parent});
  }


  next(lesson: LessonDetail) {

      this.router.navigate(['lessons', lesson.seqNo + 1],
          {relativeTo: this.route.parent});
  }
}
