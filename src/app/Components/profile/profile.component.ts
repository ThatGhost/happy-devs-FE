import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  profileId = 0;

  constructor() {
    this.profileId = Number(this.route.snapshot.params['id']);
  }
}
