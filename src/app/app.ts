import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Api } from './api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class App {
  message = '';
  inputText = '';
  response = '';

  constructor(private api: Api) {}

  // Call backend
  sayHello() {
    this.api.getHello().subscribe({
      next: (res: { message: string; }) => this.message = res.message,
      error: () => this.message = 'Error: Could not reach backend'
    });
  }

  // Simple demo function
  echoInput() {
    this.response = `You typed: ${this.inputText}`;
  }
}
