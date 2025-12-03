import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Api, ServerStatus } from './api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit, OnDestroy {
  message: string | null = null;
  nameInput = '';
  inputText = '';
  response = '';

  // Server status properties
  serverStatus: ServerStatus | null = null;
  statusError: string | null = null;
  private statusInterval: any;

  constructor(
    private api: Api,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Start polling server status
    this.checkServerStatus();
    this.statusInterval = setInterval(() => {
      this.checkServerStatus();
    }, 5000); // Poll every 5 seconds
  }

  ngOnDestroy() {
    // Clear interval when component is destroyed
    if (this.statusInterval) {
      clearInterval(this.statusInterval);
    }
  }

  checkServerStatus() {
    this.api.getStatus().subscribe({
      next: (status) => {
        this.serverStatus = status;
        this.statusError = null;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching server status:', err);
        this.statusError = 'Server offline or unreachable';
        this.serverStatus = null;
        this.cdr.detectChanges();
      }
    });
  }

  formatUptime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  }

  // Call backend
  sayHello(name: string) {
    console.log('sayHello called, message before:', this.message);
      this.message = null; // Reset message before new call
    this.api.getHello(name).subscribe({
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
