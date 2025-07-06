import { Routes } from '@angular/router';
import { PrivateLayoutComponent } from './layouts/private-layout/private-layout.component';
import { HistoryComponent } from './pages/history/history.component';
import { CalculatorComponent } from './pages/calculator/calculator.component';
import { MethodologyExplainComponent } from './pages/methodology-explain/methodology-explain.component';

export const routes: Routes = [
    {
        path: '',
        component: PrivateLayoutComponent,
        children: [
            { path: "", redirectTo: "calculator", pathMatch: "full" },
            { path: "calculator", component: CalculatorComponent },
            { path: "history", component: HistoryComponent },
            { path: "explain", component: MethodologyExplainComponent }
        ]
    },
    { path: '**', redirectTo: '' }
];