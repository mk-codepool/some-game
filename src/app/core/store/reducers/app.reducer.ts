import { createReducer, on } from '@ngrx/store';
import { setTitle } from '../actions/app.actions';
import { AppState } from '../app.state';

export const initialState: AppState = {
  title: 'Some game'
};

export const appReducer = createReducer(
  initialState,
  on(setTitle, (state, { title }) => {
    return { ...state, title }
  }),
);
