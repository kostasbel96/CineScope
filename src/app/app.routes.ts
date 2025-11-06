import { Routes } from '@angular/router';
import { MoviesList } from './movies-list/movies-list';
import { MovieDetails } from './movie-details/movie-details';

export const routes: Routes = [
    {path: 'movies', component: MoviesList},
    {path: 'movie-details/:id', component: MovieDetails}
];
