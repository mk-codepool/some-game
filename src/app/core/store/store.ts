import { ModuleWithProviders } from '@angular/core';
import { StoreModule, ActionReducerMap, StoreRootModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { appReducer } from './reducers/app.reducer';

export const reducers: ActionReducerMap<any> = {
  app: appReducer
};

export const store: ModuleWithProviders<StoreRootModule> = StoreModule.forRoot(reducers, {
  runtimeChecks: {
    strictStateImmutability: true,
    strictActionImmutability: true
  }
});

export const devTools = StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production });
