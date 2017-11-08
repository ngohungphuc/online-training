import { RouterModule, Routes } from '@angular/router';
import {
  PortalIndexComponent,
  LearningPathComponent,
  BookmarksComponent,
  MyCourseComponent } from './index';

const portalRoutes: Routes = [
{
  path: '',
  component: PortalIndexComponent,
  children: [
      { path: 'path', component: LearningPathComponent},
      { path: 'bookmarks', component: BookmarksComponent},
      { path: 'mycourse', component: MyCourseComponent},
  ]
}
];

export const PortalRouting = RouterModule.forChild(portalRoutes);
