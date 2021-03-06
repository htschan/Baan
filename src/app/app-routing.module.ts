import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule',
    runGuardsAndResolvers: 'always'
  },
  { path: 'Shopping', loadChildren: './shopping/shopping.module#ShoppingPageModule', canActivate: [AuthGuard] },
  { path: 'Todo', loadChildren: './todo/todo.module#TodoPageModule', canActivate: [AuthGuard] },
  { path: 'Songlist', loadChildren: './songlist/songlist.module#SonglistPageModule', canActivate: [AuthGuard] },
  { path: 'Youtubedownload', loadChildren: './youtubedownload/youtubedownload.module#YoutubedownloadPageModule', canActivate: [AuthGuard] },
  { path: 'Camera', loadChildren: './camera/camera.module#CameraPageModule' },
  { path: 'Test', loadChildren: './test/test.module#TestPageModule' },
  { path: 'Gps', loadChildren: './gps/gps.module#GpsPageModule' },
  { path: 'Kml', loadChildren: './kml/kml.module#KmlPageModule' },
  { path: 'Motion', loadChildren: './motion/motion.module#MotionPageModule' },
  { path: 'ChatRoom', loadChildren: './chat-room/chat-room.module#ChatRoomPageModule', canActivate: [AuthGuard] },
  { path: 'About', loadChildren: './about/about.module#AboutPageModule' },
  { path: 'Contact', loadChildren: './contact/contact.module#ContactPageModule', canActivate: [AuthGuard] },
  { path: 'Profil', loadChildren: './profile/profile.module#ProfilePageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
