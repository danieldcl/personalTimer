import { Component, OnInit } from '@angular/core';
import { WorkoutsService } from '../workouts.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  workouts: any[];
  tones: any = [];
  constructor(
    private workoutSerivce: WorkoutsService
  ) {
    this.workouts = this.workoutSerivce.getWorkouts();
  }


  removeWorkout(idx) {
      this.workoutSerivce.removeWorkout(idx);
  }

  addNewWorkout(){
    const workout = {
      name: "New routine",
      exercises: [],
      id: this.workoutSerivce.genId()
    };
    this.workoutSerivce.addWorkout(workout);
  }
}
