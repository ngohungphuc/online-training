import { RouterModule, Routes } from '@angular/router';
import { PortalIndexComponent } from './index';

const portalRoutes: Routes = [
{
  path: '',
  component: PortalIndexComponent,
  children: [

  ]
}
];

export const PortalRouting = RouterModule.forChild(portalRoutes);
