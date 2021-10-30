import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SectionComponent } from './components/home/section/section.component';
import { ArticleComponent } from './components/home/article/article.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReadLaterComponent } from './components/read-later/read-later.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent, RegistrationComponent, ProfileComponent,
    HeaderComponent,
    SectionComponent,
    ArticleComponent,
    ReadLaterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
