# 📘 Blue Pay Backend – Naming Conventions

This document outlines the naming conventions used in the **Blue Pay Backend** to maintain a clean, scalable, and consistent project structure. All backend code is written in TypeScript using Node.js and follows modern backend architecture practices.

---

## 📁 Folder Structure & Naming

The project uses a **feature-based modular structure**, organizing code by concern: `controllers`, `models`, `routes`, `schemas`, etc.

## ✅ Naming Conventions

| Type       | Folder         | Example              | Description                           |
| ---------- | -------------- | -------------------- | ------------------------------------- |
| Controller | `controllers/` | `user.controller.ts` | Manages request logic                 |
| Model      | `models/`      | `user.model.ts`      | Database model definitions            |
| Schema     | `schemas/`     | `user.schema.ts`     | Data validation for requests          |
| Route      | `routes/`      | `users.route.ts`     | API routes for the resource           |
| Service    | `services/`    | `user.service.ts`    | Business logic and reusable functions |
| Middleware | `middlewares/` | `auth.middleware.ts` | Express middleware                    |
| Config     | `config/`      | `database.ts`        | Configuration files                   |
| Utility    | `utils/`       | `hash.ts`, `jwt.ts`  | Generic helper utilities              |

---
