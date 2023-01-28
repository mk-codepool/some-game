import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

const getAppState = createFeatureSelector<AppState>('app');

export const getTitle = createSelector(
  getAppState,
  state => state.title
);
