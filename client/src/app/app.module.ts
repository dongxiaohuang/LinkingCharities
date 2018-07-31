import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
// import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddBgColorDirective } from './directives/add-bg-color.directive';
import { JumbotronComponent } from './jumbotron/jumbotron.component';
import { TopcharitiesComponent } from './topcharities/topcharities.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; // used for searching
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // used for ngModel
import { OrderModule } from 'ngx-order-pipe'; // used for order
import { NgxPaginationModule } from 'ngx-pagination'; // used for pagination
import { AgmCoreModule } from '@agm/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { RouterModule } from "@angular/router";
import { GetCharitiesService } from './services/get-charities.service';
import { GetCoverPicsService } from './services/get-cover-pics.service';
import { AuthService } from './services/auth.service';
import { FavoriteService } from './services/favorite.service';
import { ProcessHTTPMsgService } from './services/process-httpmsg.service';
import { SearchService } from './services/search.service';

import { DiscoverComponent } from './discover/discover.component';
import { VolunteerComponent } from './volunteer/volunteer.component';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactComponent } from './contact/contact.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ImageUploadModule } from "angular2-image-upload";

import { AppRoutingModule } from './app-routing/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SearchfilterPipe } from './pipes/searchfilter.pipe';
import { CharityDetailsComponent } from './charity-details/charity-details.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { RestangularModule, Restangular } from 'ngx-restangular';
import { RestangularConfigFactory } from './shared/restConfig';
import { baseURL } from './shared/baseurl';
import { googleAPI, stripeAPI } from './config';
import { AgmComponent } from './agm/agm.component';
import { AutocompleteSearchComponent } from './autocomplete-search/autocomplete-search.component';
import { LoadingComponent } from './loading/loading.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor, UnauthorizedInterceptor } from './services/auth.interceptor';
import { UnauthorizedCharityInterceptor } from './services/auth-charity.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CountryPickerModule } from 'ngx-country-picker';
import { FavoritesComponent } from './favorites/favorites.component';
import { CharityRegisterComponent } from './charity-register/charity-register.component';
import { PaymentComponent } from './payment/payment.component';
import { NgxStripeModule } from 'ngx-stripe';
import { SearchComponent } from './search/search.component';
import { CardComponent } from './card/card.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { CategoryComponent } from './category/category.component';
import { CharityProfileComponent } from './charity-profile/charity-profile.component';
import { CharityCardComponent } from './charity-card/charity-card.component';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { FacebookLoginProvider } from "angularx-social-login";
import { FacebookLoginComponent } from './facebook-login/facebook-login.component';

let config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("Facebook-App-Id")
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  // Specifies a list of directives/pipes that belong to this module.
  declarations: [
    AboutusComponent,
    AppComponent,
    AddBgColorDirective,
    AgmComponent,
    HeaderComponent,
    FooterComponent,
    JumbotronComponent,
    TopcharitiesComponent,
    DiscoverComponent,
    VolunteerComponent,
    HomeComponent,
    ContactComponent,
    PagenotfoundComponent,
    SearchfilterPipe,
    CharityDetailsComponent,
    AutocompleteSearchComponent,
    LoadingComponent,
    SignupComponent,
    LoginComponent,
    FavoritesComponent,
    CharityRegisterComponent,
    PaymentComponent,
    SearchComponent,
    CardComponent,
    UserprofileComponent,
    CategoryComponent,
    CharityProfileComponent,
    CharityCardComponent,
    FacebookLoginComponent,
  ],
  // Other modules whose exported classes are needed by component templates declared in this NgModule.
  imports: [
    BrowserModule,
    MaterialModule,
    NgbCollapseModule,
    // FlexLayoutModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    Ng2SearchPipeModule, // used for searching
    FormsModule,
    OrderModule, // used for ordering
    NgxPaginationModule, // used for pagination
    ReactiveFormsModule,
    RestangularModule.forRoot(RestangularConfigFactory),
    AgmCoreModule.forRoot({
      apiKey: googleAPI
    }),
    BrowserAnimationsModule,
    NgSelectModule,
    HttpClientModule,
    CountryPickerModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    NgxStripeModule.forRoot(stripeAPI),
    ImageUploadModule.forRoot(),
    SocialLoginModule
  ],
  // Defines the set of injectable objects that are available in the injector of this module.
  providers: [
    // TODO: why i need this
    GetCharitiesService,
    GetCoverPicsService,
    AuthService,
    FavoriteService,
    ProcessHTTPMsgService,
    SearchService,
    //registers a value (baseURL) under the BaseURL injection token.
    //Angular can inject the BaseURL value into any class that it creates.
    { provide: 'BaseURL', useValue: baseURL },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    // {
    //      provide: HTTP_INTERCEPTORS,
    //      useClass: AuthCharityInterceptor,
    //      multi: true
    // },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: UnauthorizedCharityInterceptor,
    //   multi: true
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true
    },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    LoginComponent
  ]
})
export class AppModule { }
