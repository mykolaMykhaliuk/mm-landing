import { Component, OnInit, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class AboutComponent implements OnInit, AfterViewInit {
  @ViewChildren('statNumber') statNumbers!: QueryList<ElementRef>;

  stats = [
    { value: 5, suffix: '+', label: 'Years Experience' },
    { value: 50, suffix: '+', label: 'Projects Completed' },
    { value: 100, suffix: '%', label: 'Client Satisfaction' }
  ];

  ngOnInit() {}

  ngAfterViewInit() {
    this.observeStats();
  }

  private observeStats() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          const finalValue = parseInt(target.getAttribute('data-value') || '0');
          const suffix = target.getAttribute('data-suffix') || '';
          this.animateCounter(target, finalValue, suffix);
          observer.unobserve(target);
        }
      });
    }, { threshold: 0.5 });

    this.statNumbers.forEach(stat => {
      observer.observe(stat.nativeElement);
    });
  }

  private animateCounter(element: HTMLElement, target: number, suffix: string) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target + suffix;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current) + suffix;
      }
    }, stepTime);
  }
}
