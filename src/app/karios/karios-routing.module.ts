import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { MessengerPageComponent } from "./pages/messenger-page/messenger-page.component";
import { ChatPageComponent } from "./pages/chat-page/chat-page.component";
import { PartyPageComponent } from "./pages/party-page/party-page.component";

const routes: Routes = [
    {
        path: 'home',
        component: HomePageComponent
    },
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