import { RouterModule, Routes } from '@angular/router';
import {
  PortalIndexComponent,
  LearningPathComponent,
  BookmarksComponent,
  MyCourseComponent,
  LearningPathDetailComponent
} from './index';

const portalRoutes: Routes = [
  {
    path: '',
    component: PortalIndexComponent,
    children: [
      {
        path: 'path',
        component: LearningPathComponent,
        children: [{ path: ':slug', component: LearningPathDetailComponent }]
      },
      { path: 'bookmarks', component: BookmarksComponent },
      { path: 'mycourse', component: MyCourseComponent }
    ]
  }
];

export const PortalRouting = RouterModule.forChild(portalRoutes);
