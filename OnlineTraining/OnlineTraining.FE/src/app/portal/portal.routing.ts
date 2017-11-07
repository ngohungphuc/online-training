import { RouterModule, Routes } from '@angular/router';
import {
  PortalIndexComponent,
  PathComponent,
  BookmarksComponent,
  MyCourseComponent } from './index';

const portalRoutes: Routes = [
{
  path: '',
  component: PortalIndexComponent,
  children: [
      { path: 'path', component: PathComponent},
      { path: 'bookmarks', component: BookmarksComponent},
      { path: 'mycourse', component: MyCourseComponent},
  ]
}
];

export const PortalRouting = RouterModule.forChild(portalRoutes);
