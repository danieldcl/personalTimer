import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkoutsService } from '../workouts.service'
import { Workout } from '../workout';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  id:number;
  workout: any;
  constructor(private route: ActivatedRoute, private workoutSerivce:WorkoutsService) { }

  ngOnInit() {
    this.getWorkout();
  }

  getWorkout(){
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    const workouts = this.workoutSerivce.getWorkout(this.id);
    if (workouts.length>0){
      this.workout = workouts[0];
    }
  }

  removeExercise(idx){
    if (idx!==undefined){
      this.workoutSerivce.removeExercise(this.id, idx);
    }
  }

}
