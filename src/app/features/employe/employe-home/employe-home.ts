import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employe-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './employe-home.html',
  styleUrl: './employe-home.scss'
})
export class EmployeHomeComponent {}