import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { MessengerPageComponent } from "./pages/messenger-page/messenger-page.component";
import { ChatPageComponent } from "./pages/chat-page/chat-page.component";
import { PartyPageComponent } from "./pages/party-page/party-page.component";
import { CreatePublicationComponent } from "./views/create-publication/create-publication.component";
import { LayoutPageComponent } from "./pages/layout-page/layout-page.component";
import { HomeComponent } from "./views/home/home.component";
import { ConfigurationComponent } from "./views/configuration/configuration.component";
import { ProfileComponent } from "./views/profile/profile.component";

const routes: Routes = [
    {
        path: 'messenger',
        component: MessengerPageComponent,
    },
    {
        path: 'messenger/:id',
        component: ChatPageComponent,
    },
    {
        path: 'party',
        component: PartyPageComponent
    },
    {
        path: '',
        component: LayoutPageComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'create-publication',
                component: CreatePublicationComponent
            },
            {
                path: 'profile/:username',
                component: ProfileComponent
            },
            {
                path: 'configuration',
                component: ConfigurationComponent
            },
            {
                path: '**',
                redirectTo: 'home'
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];


@NgModule({
    declarations: [

    ],
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
})
export class KariosRoutingModule {}