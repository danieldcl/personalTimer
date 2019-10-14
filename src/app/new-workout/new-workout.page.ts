import { Component } from '@angular/core';
import { Workout } from '../workout';
import { Exercise } from '../exercise';
import { WorkoutsService } from '../workouts.service'
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-new-workout',
  templateUrl: './new-workout.page.html',
  styleUrls: ['./new-workout.page.scss'],
})
export class NewWorkoutPage {
  newTime: any = "00:00:05";
  workoutName: string;
  newExerciseName: string;
  workout: Workout;
  exercises: Exercise[] = [];
  public workoutForm: FormGroup;

  constructor(private location: Location, private workoutSerivce:WorkoutsService, public fb: FormBuilder) {
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
    this.workout = {
      name: this.workoutName,
      exercises: this.exercises,
      id: 10
    }
    this.workoutSerivce.addWorkout(this.workout);
    this.location.back();
  }

  removeExercise(id){
    this.exercises.splice(id, 1);
  }
}
