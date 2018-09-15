import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

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
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'Shopping', loadChildren: './shopping/shopping.module#ShoppingPageModule', canActivate: [AuthGuard] },
  { path: 'Todo', loadChildren: './todo/todo.module#TodoPageModule' },
  { path: 'Songlist', loadChildren: './songlist/songlist.module#SonglistPageModule' },
  { path: 'Youtubedownload', loadChildren: './youtubedownload/youtubedownload.module#YoutubedownloadPageModule' },
  { path: 'Camera', loadChildren: './camera/camera.module#CameraPageModule' },
  { path: 'Test', loadChildren: './test/test.module#TestPageModule' },
  { path: 'Gps', loadChildren: './gps/gps.module#GpsPageModule' },
  { path: 'Kml', loadChildren: './kml/kml.module#KmlPageModule' },
  { path: 'Motion', loadChildren: './motion/motion.module#MotionPageModule' },
  { path: 'ChatRoom', loadChildren: './chat-room/chat-room.module#ChatRoomPageModule' },
  { path: 'About', loadChildren: './about/about.module#AboutPageModule' },
  { path: 'Contact', loadChildren: './contact/contact.module#ContactPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'logout', loadChildren: './logout/logout.module#LogoutPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
