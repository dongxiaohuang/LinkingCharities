import { Routes } from '@angular/router';

import { AboutusComponent } from '../aboutus/aboutus.component';
import { CharityDetailsComponent } from '../charity-details/charity-details.component';
import { ContactComponent } from '../contact/contact.component';
import { DiscoverComponent } from '../discover/discover.component';
import { FavoritesComponent } from '../favorites/favorites.component';
import { HomeComponent } from '../home/home.component';
import { PagenotfoundComponent } from '../pagenotfound/pagenotfound.component';
import { SignupComponent } from '../signup/signup.component';
import { VolunteerComponent } from '../volunteer/volunteer.component';
import { SearchComponent } from '../search/search.component';
import { UserprofileComponent } from '../userprofile/userprofile.component';
import { UserDonationHistoryComponent } from '../user-donation-history/user-donation-history.component';
import { CharityDonationHistoryComponent } from '../charity-donation-history/charity-donation-history.component';
import { CharityProfileComponent } from '../charity-profile/charity-profile.component';
import { CategoryComponent } from '../category/category.component';
import { VolunteerAddComponent } from '../volunteer-add/volunteer-add.component';
import { VolunteerDetailsComponent } from '../volunteer-details/volunteer-details.component';
import { VolunteerTimeslotsComponent } from '../volunteer-timeslots/volunteer-timeslots.component';
import { CharityVolunteerComponent } from '../charity-volunteer/charity-volunteer.component';
import { CharityVolunteersRegistersComponent } from '../charity-volunteers-registers/charity-volunteers-registers.component';
import { EditVolunteerComponent } from '../edit-volunteer/edit-volunteer.component';
import { UserVolunteerHistoryComponent } from '../user-volunteer-history/user-volunteer-history.component';
export const routes: Routes = [
     { path: '', redirectTo: '/home', pathMatch: 'full'},
     { path: 'aboutus', component: AboutusComponent},
     { path: 'charitydetail/:id', component: CharityDetailsComponent},
     { path: 'volunteerdetail/:id', component: VolunteerDetailsComponent},
     { path: 'volunteerdetail/:id/registers', component: CharityVolunteersRegistersComponent},
     { path: 'volunteerdetail/:id/timeslots', component: VolunteerTimeslotsComponent},
     { path: 'contact', component: ContactComponent},
     { path: 'discover', component: DiscoverComponent},
     { path: 'favorites', component: FavoritesComponent},
     { path: 'home', component: HomeComponent},
     { path: 'signup', component: SignupComponent},
     { path: 'volunteer', component: VolunteerComponent},
     { path: 'volunteer/register', component: VolunteerAddComponent},
     { path: 'search', component: SearchComponent},
     { path: 'user/profile', component: UserprofileComponent},
     { path: 'user/donations', component: UserDonationHistoryComponent},
     { path: 'user/volunteer', component: UserVolunteerHistoryComponent},
     { path: 'charityuser/profile', component: CharityProfileComponent},
     { path: 'charityuser/donations', component: CharityDonationHistoryComponent},
     { path: 'charityuser/volunteer', component: CharityVolunteerComponent},
     { path: 'charityuser/volunteer/:id', component: EditVolunteerComponent},
     { path: 'category/:id', component: CategoryComponent},
     { path: '**', redirectTo: '/home'},
]
