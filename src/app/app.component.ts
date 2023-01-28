import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './core/store/app.state';
import { getTitle } from './core/store/selectors/app.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title$: Observable<string | null> = this.store.select(getTitle);

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    
  }
}
