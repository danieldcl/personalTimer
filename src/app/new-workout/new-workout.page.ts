import { Component } from '@angular/core';
import { Workout } from '../workout';
import { Exercise } from '../exercise';
import { WorkoutsService } from '../workouts.service'
import { Location } from '@angular/common';


@Component({
  selector: 'app-new-workout',
  templateUrl: './new-workout.page.html',
  styleUrls: ['./new-workout.page.scss'],
})
export class NewWorkoutPage {
  newTime: any = "00:00:05";
  restTime: any = "00:00:15";
  autoRest: false;
  workoutName: string;
  newExerciseName: string;
  workout: Workout;
  exercises: Exercise[] = [];

  constructor(private location: Location, private workoutSerivce:WorkoutsService) {
  }
  
  addExercise(){
    const exercise = {
      name: this.newExerciseName,
      duration: this.newTime,
      id:this.workoutSerivce.genId()
    }
    this.exercises.push(exercise);
  }

  addNewWorkout(){
    this.insertRest();
    this.workout = {
      name: this.workoutName,
      exercises: this.exercises,
      id: this.workoutSerivce.genId()
    };
    this.workoutSerivce.addWorkout(this.workout);
    this.location.back();
  }

  insertRest() {
    if (this.autoRest) {
      let l = this.exercises.length - 1;
      while (l > 0) {
        const rest = {
          name: 'Rest',
          duration: this.restTime,
          id: this.workoutSerivce.genId()
        };
        this.exercises.splice(l, 0, rest);
        l -= 1;
      }
    }
  }

  removeExercise(id) {
    this.exercises.splice(id, 1);
  }
}
