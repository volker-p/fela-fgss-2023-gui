import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Api } from './api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  message: string | null = null;
  inputText = '';
  response = '';

  constructor(
    private api: Api,
    private cdr: ChangeDetectorRef
  ) {}

  // Call backend
  sayHello() {
    console.log('sayHello called, message before:', this.message);
      this.message = null; // Reset message before new call
    this.api.getHello().subscribe({
      next: (res: { message: string; }) => {
        console.log('Response received:', res);
        this.message = res.message;
        this.cdr.detectChanges(); // Force change detection
        console.log('message after:', this.message);
      },
      error: (err) => {
        console.error('Error occurred:', err);
        this.message = 'Error: Could not reach backend';
        this.cdr.detectChanges();
      }
    });
  }

  // Simple demo function
  echoInput() {
    this.response = `You typed: ${this.inputText}`;
  }
}
