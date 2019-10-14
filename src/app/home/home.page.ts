import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WorkoutsService } from '../workouts.service';
// import { NativeRingtones } from '@ionic-native/native-ringtones/ngx';
// import { FilePath } from '@ionic-native/file-path/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  workouts: any[];
  tones: any = [];
  constructor(
    private workoutSerivce: WorkoutsService,
    // private ringtones: NativeRingtones,
    // private filePath: FilePath
) {
  this.workouts = this.workoutSerivce.getWorkouts();
  // this.getRingTones();
}

  // getRingTones() {
  //   this.ringtones.getRingtone().then( r => {
  //     this.tones = r;
  //     console.log(r);
  //   }, e => {
  //       console.log(e);
  //     }
  //   );
  // }

// playRingtone(url) {
//     this.filePath.resolveNativePath(url).then(
//       p => this.ringtones.playRingtone(p).then(
//         v => {},
//         e => alert('play' + JSON.stringify(e)))
//       ,
//       error => alert('path' + JSON.stringify(error)));
//   }

removeWorkout(idx) {
    this.workoutSerivce.removeWorkout(idx);
  }
}
