import { Component, OnInit, OnDestroy } from '@angular/core';
import { Insomnia } from '@ionic-native/insomnia/ngx';
import { ActivatedRoute } from '@angular/router';
import { WorkoutsService } from '../workouts.service';
import { Workout } from '../workout';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';


@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.page.html',
  styleUrls: ['./workouts.page.scss'],
})
export class WorkoutsPage implements OnInit, OnDestroy {

  percent = 0;
  radius = 100;
  fullTime: any = '00:00:05';
  timer: any = false;
  progress: any = 0;
  currentExercise = 0;
  workout: Workout;
  pause = false;
  elapsed: any = {
    h: '00',
    m: '00',
    s: '00'
  };
  overallTimer: any = false;

  constructor(
    private insomnia: Insomnia,
    private route: ActivatedRoute,
    private workoutSerivce: WorkoutsService,
    // private ringtones: NativeRingtones,
    private tts: TextToSpeech
    ) {}

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    const workouts = this.workoutSerivce.getWorkout(id);
    if (workouts.length > 0) {
      this.workout = workouts[0];
      this.fullTime = this.workout.exercises[this.currentExercise].duration;
    }
  }

  startTimer() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = false;
    this.progress = 0;
    const timesplit: any = this.fullTime.split(':');
    const minute = timesplit[1];
    const second = timesplit[2];
    const total = Math.floor(minute * 60) + parseInt(second, 10);
    this.tts.speak(
      {text: this.workout.exercises[this.currentExercise].name, locale: 'en-GB', rate: 1.5}
      ).then(() => {
        this.timer = setInterval(() => {
          if (this.pause) {
            return;
          }
          if (this.percent === this.radius) {
            clearInterval(this.timer);
            this.progress = 0;
            this.percent = 0;
            if (this.currentExercise + 1 < this.workout.exercises.length) {
              this.currentExercise++;
              this.fullTime = this.workout.exercises[this.currentExercise].duration;
              this.startTimer();
            } else {
              this.stopTimer();
              this.tts.speak({
                text: 'Well Done!',
                locale: 'en-GB',
                rate: 1.5
              });
              return;
            }
          }
          this.percent = Math.floor(this.progress / total * 100);
          this.progress++;
          if (!this.overallTimer) {
            this.progressTimer();
            this.insomnia.keepAwake();
          }
        }, 1000);
    });
  }

  progressTimer() {
    const d = new Date();
    this.overallTimer = setInterval(() => {
      const now = new Date().getTime();
      const distance = now - d.getTime();
      this.elapsed.h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.elapsed.m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.elapsed.s = Math.floor((distance % (1000 * 60 )) / 1000);

      this.elapsed.h = this.pad(this.elapsed.h, 2);
      this.elapsed.m = this.pad(this.elapsed.m, 2);
      this.elapsed.s = this.pad(this.elapsed.s, 2);
    }, 1000);
  }

  pad(num, size) {
    let s = num + '';
    while (s.length < size) { s = '0' + s; }
    return s;
  }

  stopTimer() {
    clearInterval(this.timer);
    clearInterval(this.overallTimer);
    this.timer = false;
    this.overallTimer = false;
    this.percent = 0;
    this.progress = 0;
    this.elapsed = {
      h: '00',
      m: '00',
      s: '00'
    };
    this.insomnia.allowSleepAgain();
  }

  ngOnDestroy() {
    this.stopTimer();
  }
}
