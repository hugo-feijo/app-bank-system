import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { ClientesListPageComponent } from "./components/clientes-list-page/clientes-list-page.component";

const routes: Route[] = [
    {
        path: '',
        redirectTo: 'lista',
        pathMatch: 'full'
    },
    {
        path: '',
        component: ClientesListPageComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientesRoutingModule { }