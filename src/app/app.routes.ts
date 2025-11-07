import { Routes } from '@angular/router';
import { MoviesList } from './movies-list/movies-list';
import { MovieDetails } from './movie-details/movie-details';
import { TvList } from './tv-list/tv-list';
import { TvDetails } from './tv-details/tv-details';

export const routes: Routes = [
    {path: 'movies', component: MoviesList},
    {path: 'movie-details/:id', component: MovieDetails},
    {path: 'tvs', component: TvList},
    {path: 'tv-details/:id', component: TvDetails}
];
