import { Routes } from '@angular/router';

import { AboutusComponent } from '../aboutus/aboutus.component';
import { CharityDetailsComponent } from '../charity-details/charity-details.component';
import { ContactComponent } from '../contact/contact.component';
import { DiscoverComponent } from '../discover/discover.component';
import { FavoritesComponent } from '../favorites/favorites.component';
import { HomeComponent } from '../home/home.component';
import { PagenotfoundComponent } from '../pagenotfound/pagenotfound.component';
import { SignupComponent } from '../signup/signup.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { VolunteerComponent } from '../volunteer/volunteer.component';
import { SearchComponent } from '../search/search.component';
export const routes: Routes = [
     { path: '', redirectTo: '/home', pathMatch: 'full'},
     { path: 'aboutus', component: AboutusComponent},
     { path: 'charitydetail/:id', component: CharityDetailsComponent},
     { path: 'contact', component: ContactComponent},
     { path: 'discover', component: DiscoverComponent},
     { path: 'favorites', component: FavoritesComponent},
     { path: 'home', component: HomeComponent},
     { path: 'signup', component: SignupComponent},
     { path: 'user/:id', component: UserProfileComponent},
     { path: 'volunteer', component: VolunteerComponent},
     { path: 'search', component: SearchComponent},
]
