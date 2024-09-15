# Streaming Server

<p align="center">
  <a href="https://nestjs.com/">
    <img src="https://nestjs.com/img/logo_text.svg" alt="NestJS Logo" height="50px">
  </a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API">
    <img src="https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_c13320392397522bb5c39454d240ebf0/socket-io.png" alt="WebSockets Logo" height="50px">
  </a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://firebase.google.com/docs/firestore">
    <img src="https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png" alt="Firebase Firestore Logo" height="50px">
  </a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://cloud.google.com/storage">
    <img src="https://cloud.google.com/images/social-icon-google-cloud-1200-630.png" alt="Google Cloud Storage Logo" height="50px">
  </a>
</p>

A high-performance streaming server built with NestJS, leveraging WebSockets for real-time communication, Firebase Firestore for data storage and authentication, and Google Cloud Storage for media hosting.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Architecture](#architecture)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Introduction

This project is a scalable streaming server designed to handle real-time data and media streaming efficiently. By integrating NestJS with WebSockets, Firebase Firestore, and Google Cloud Storage, it provides a robust platform for streaming applications. It also features ticket-based authentication using Firebase Firestore as the database to secure user access.

## Features

- **Real-time Communication**: Utilizes WebSockets for instant data exchange.
- **Scalable Architecture**: Built with NestJS to ensure scalability and maintainability.
- **Cloud Storage**: Stores media files securely using Google Cloud Storage.
- **Realtime Database**: Manages data with Firebase Firestore for quick access and synchronization.
- **Secure Authentication**: Implements ticket-based authentication using Firebase Firestore as the database.

## Architecture

![Architecture Diagram](./images/architecture-diagram.png)

*Include an architecture diagram explaining how the components interact.*

## Technologies Used

### NestJS

<a href="https://nestjs.com/">
  <img src="https://nestjs.com/img/logo_text.svg" alt="NestJS Logo" width="120px">
</a>

[NestJS](https://nestjs.com/) is a progressive Node.js framework for building efficient and scalable server-side applications.

### WebSockets

<a href="https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API">
  <img src="https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_c13320392397522bb5c39454d240ebf0/socket-io.png" alt="WebSockets Logo" width="60px">
</a>

[WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) enable two-way interactive communication between the user's browser and a server.

### Firebase Firestore

<a href="https://firebase.google.com/docs/firestore">
  <img src="https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png" alt="Firebase Firestore Logo" width="60px">
</a>

[Firebase Firestore](https://firebase.google.com/docs/firestore) is a flexible, scalable NoSQL cloud database for storing and syncing data in real time.

### Google Cloud Storage

<a href="https://cloud.google.com/storage">
  <img src="https://cloud.google.com/images/social-icon-google-cloud-1200-630.png" alt="Google Cloud Storage Logo" width="60px">
</a>

[Google Cloud Storage](https://cloud.google.com/storage) offers worldwide storage and retrieval of any amount of data at any time.

### Ticket-Based Authentication

The server uses **ticket-based authentication** where each user is issued a unique ticket upon successful login. This ticket is stored and validated against Firebase Firestore on each request to ensure secure access control.
