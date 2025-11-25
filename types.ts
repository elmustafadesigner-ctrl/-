import React from 'react';

export interface BlogPost {
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  date: string;
  featured_media_url?: string; // Custom field helper
  author_name?: string; // New field for design
  category_name?: string; // New field for design
  _embedded?: any;
}

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}