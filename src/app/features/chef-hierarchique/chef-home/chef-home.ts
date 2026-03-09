import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-chef-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './chef-home.html',
  styleUrl: './chef-home.scss'
})
export class ChefHomeComponent {}
