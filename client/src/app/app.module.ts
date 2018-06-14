import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddBgColorDirective } from './directives/add-bg-color.directive';
import { JumbotronComponent } from './jumbotron/jumbotron.component';
import { TopcharitiesComponent } from './topcharities/topcharities.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; // used for searching
import { FormsModule } from '@angular/forms'; // used for ngModel
import { OrderModule } from 'ngx-order-pipe'; // used for order
import { NgxPaginationModule } from 'ngx-pagination'; // used for pagination

import { GetCharitiesService } from './services/get-charities.service';
import { DiscoverComponent } from './discover/discover.component';
import { VolunteerComponent } from './volunteer/volunteer.component';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactComponent } from './contact/contact.component';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

@NgModule({
     // Specifies a list of directives/pipes that belong to this module.
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AddBgColorDirective,
    JumbotronComponent,
    TopcharitiesComponent,
    DiscoverComponent,
    VolunteerComponent,
    HomeComponent,
    AboutusComponent,
    ContactComponent,
    PagenotfoundComponent
  ],
  // Other modules whose exported classes are needed by component templates declared in this NgModule.
  imports: [
    BrowserModule,
    MaterialModule,
    NgbCollapseModule,
    FlexLayoutModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    Ng2SearchPipeModule, // used for searching
    FormsModule,
    OrderModule, // used for ordering
    NgxPaginationModule, // used for pagination
  ],
  // Defines the set of injectable objects that are available in the injector of this module.
  providers: [
       GetCharitiesService
 ],
  bootstrap: [AppComponent]
})
export class AppModule { }
