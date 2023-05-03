import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'clientes',
        loadChildren: () => import('../clientes/clientes.module').then(m => m.ClientesModule)
      },
      {
        path: 'contas',
        loadChildren: () => import('../conta/conta.module').then(m => m.ContaModule)
      },
      {
        path: 'cartoes',
        loadChildren: () => import('../cartao-credito/cartao-credito.module').then(m => m.CartaoCreditoModule)
      },
      {
        path: '',
        redirectTo: '/tabs/clientes',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/clientes',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
