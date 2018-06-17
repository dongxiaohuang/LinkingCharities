import { Routes } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { ContactComponent } from '../contact/contact.component';
import { DiscoverComponent } from '../discover/discover.component';
import { VolunteerComponent } from '../volunteer/volunteer.component';
import { AboutusComponent } from '../aboutus/aboutus.component';
import { PagenotfoundComponent } from '../pagenotfound/pagenotfound.component';
import { CharityDetailsComponent } from '../charity-details/charity-details.component';
export const routes: Routes = [
     { path: 'home', component: HomeComponent},
     { path: 'contact', component: ContactComponent},
     { path: 'discover', component: DiscoverComponent},
     { path: 'volunteer', component: VolunteerComponent},
     { path: 'aboutus', component: AboutusComponent},
     { path: 'charitydetail/:id', component: CharityDetailsComponent},
     { path: '', redirectTo: '/home', pathMatch: 'full'},
     { path: '**', component: PagenotfoundComponent},
]
