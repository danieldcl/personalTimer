import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'workouts/:id', loadChildren: './workouts/workouts.module#WorkoutsPageModule' },
  { path: 'new-workout', loadChildren: './new-workout/new-workout.module#NewWorkoutPageModule' },
  { path: 'detail/:id', loadChildren: './detail/detail.module#DetailPageModule' },
  { path: 'edit-exercise/:id/:idx', loadChildren: './edit-exercise/edit-exercise.module#EditExercisePageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
