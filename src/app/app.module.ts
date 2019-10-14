import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Insomnia } from '@ionic-native/insomnia/ngx';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicStorageModule } from '@ionic/storage';

import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
// import { FilePath } from '@ionic-native/file-path/ngx';
// import { NativeRingtones } from '@ionic-native/native-ringtones/ngx';






@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, ReactiveFormsModule, IonicStorageModule.forRoot()],
  providers: [
    StatusBar,
    SplashScreen,
    TextToSpeech,
    // NativeRingtones,
    // FilePath,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Insomnia
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
