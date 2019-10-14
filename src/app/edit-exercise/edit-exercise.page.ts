import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { WorkoutsService } from '../workouts.service';
import { Exercise } from '../exercise';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';



@Component({
  selector: 'app-edit-exercise',
  templateUrl: './edit-exercise.page.html',
  styleUrls: ['./edit-exercise.page.scss'],
})
export class EditExercisePage implements OnInit {
  id: number;
  idx: number;
  newExerciseName: string;
  newTime: string;
  constructor(private route: ActivatedRoute, private workoutSerivce:WorkoutsService, private location:Location) { }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.idx = parseInt(this.route.snapshot.paramMap.get('idx'));
    if(this.id!==undefined && this.idx!==undefined){
      const e = this.getExercise(this.id, this.idx);
      this.newExerciseName = e.name;
      this.newTime = e.duration;
    }
  }

  getExercise(id, idx):Exercise{
    return this.workoutSerivce.getExercise(id,idx);
  }

  updateExercise(){
    const newExercise = {
      name: this.newExerciseName,
      duration: this.newTime
    }
    this.workoutSerivce.updateExercise(this.id, this.idx, newExercise);
    this.location.back();
  }

  

}
