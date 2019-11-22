import { Injectable, OnInit } from '@angular/core';
import { Workout } from './workout';
import { Exercise } from './exercise';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class WorkoutsService implements OnInit{
  storageKey: string = "personalHIITWorkouts"
  workouts: Workout[] = [];
  constructor(private storage:Storage){} 
  
  ngOnInit(){
    this.storage.get(this.storageKey).then( v => {
      if (v !== null) {
        this.workouts = v;
      } else {
        this.storage.set(this.storageKey, []);
      }
    });
  }
  getWorkouts() {
    return this.workouts;
  }

  getWorkout(id) {
    return this.workouts.filter((r)=>r.id===id);
  }

  addWorkout(workout) {
    this.workouts.push(workout);
    this.updateWorkouts();
  }

  removeWorkout(idx) {
    this.workouts.splice(idx, 1);
    this.updateWorkouts();
  }

  removeExercise(id, idx) {
    const workout = this.workouts.filter( h => h.id===id);
    if (workout.length > 0) {
      const index = this.workouts.indexOf(workout[0]);
      this.workouts[index].exercises.splice(idx, 1);
      this.updateWorkouts();
    }
  }

  getExercise(id, idx): Exercise{
    const workout = this.workouts.filter( h => h.id===id);
    if (workout.length > 0) {
      return workout[0].exercises[idx];
    }
  }

  updateExercise(id, idx, exercise) {
    const workout = this.workouts.filter( h => h.id === id);
    if (workout.length > 0) {
      const index = this.workouts.indexOf(workout[0]);
      this.workouts[index].exercises[idx] = exercise;
      this.updateWorkouts();
    }
  }

  genId(): number {
    return this.workouts.length > 0 ? Math.max(...this.workouts.map(hero => hero.id)) + 1 : 11;
  }

  genExId(): number {
    return this.workouts.reduce( (count, workout) => count + workout.exercises.length, 1) + 1;
  }

  updateWorkouts() {
    return this.storage.set(this.storageKey, this.workouts).then(
      () => {
        return true;
      }
    ).catch((e) => {
      console.log(e);
      return false;
    });
  }

}
