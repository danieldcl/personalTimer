import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkoutsService } from '../workouts.service';
import { Workout } from '../workout';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  id:number;
  workout: Workout;
  newTime: any = "00:01:00";
  restTime: any = "00:00:15";
  autoRest: false;
  workoutName: string;
  newExerciseName: string;
  saved = false;
  error = null;
  constructor(private route: ActivatedRoute, private workoutSerivce:WorkoutsService) { }

  ngOnInit() {
    this.getWorkout();
  }

  getWorkout(){
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    const workouts = this.workoutSerivce.getWorkout(this.id);
    if (workouts.length > 0) {
      this.workout = workouts[0];
    }
  }

  addExercise() {
    const exercise = {
      name: this.newExerciseName,
      duration: this.newTime,
      id: this.workoutSerivce.genExId()
    };
    this.workout.exercises.push(exercise);
  }

  saveWorkout() {
    this.insertRest();
    this.workoutSerivce.updateWorkouts().then(
      t => {
        this.saved = t;
        setTimeout(() => {
          this.saved = false;
        }, 1500);
      }
    ).catch(
      e => {
        this.error = e;
      }
    );
  }

  moveExerciseUp(e) {
    const idx = this.workout.exercises.map(ex => ex.id).indexOf(e.id);
    if (idx !== 0) {
      this.workout.exercises[idx] = this.workout.exercises[idx - 1];
      this.workout.exercises[idx - 1] = e;
    }
  }

  moveExerciseDown(e) {
    const idx = this.workout.exercises.map(ex => ex.id).indexOf(e.id);
    if (idx < this.workout.exercises.length - 1) {
      this.workout.exercises[idx] = this.workout.exercises[idx + 1];
      this.workout.exercises[idx + 1] = e;
    }
  }

  insertRest() {
    if (this.autoRest) {
      let l = this.workout.exercises.length - 1;
      while (l > 0) {
        const rest = {
          name: 'Rest',
          duration: this.restTime,
          id: this.workoutSerivce.genId()
        };
        this.workout.exercises.splice(l, 0, rest);
        l -= 1;
      }
    }
  }

  removeExercise(idx) {
    this.workout.exercises.splice(idx, 1);
  }
}
