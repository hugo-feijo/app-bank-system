import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { ContasListPageComponent } from "./components/conta-list-page/conta-list-page.component";

const routes: Route[] = [
    {
        path: '',
        redirectTo: 'lista',
        pathMatch: 'full'
    },
    {
        path: '',
        component: ContasListPageComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContaRoutingModule { }