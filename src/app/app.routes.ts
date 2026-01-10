import { Routes } from '@angular/router';
import { Signup } from './auth/signup/signup';
import { Login } from './auth/login/login';
import { UserDashboard } from './dashboard/user-dashboard/user-dashboard';
import { authGuard } from './core/guards/auth-guard';
import { adminGuard } from './core/guards/admin-guard';
import { AdminDashboard } from './admin/admin-dashboard/admin-dashboard';
import { CourseForm } from './admin/course-form/course-form';

export const routes: Routes = [
    {path:'signup',component:Signup},
    {path:'login',component:Login},

    {path:'user-dashboard',component:UserDashboard,canActivate:[authGuard]},
    {path:'admin',component:AdminDashboard,canActivate:[authGuard,adminGuard]},
    {path:'admin/add-course',component:CourseForm,canActivate:[authGuard,adminGuard]},
    {path:'admin/edit-course/:id',component:CourseForm,canActivate:[authGuard,adminGuard]},

    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'**',redirectTo:'login'}
];
