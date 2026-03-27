
<div align="center">

# 🚀 HP System - Holistic Points Platform

[![GitHub stars](https://img.shields.io/github/stars/Mahabub-3301/hp-system?style=social)](https://github.com/Mahabub-3301/hp-system)
[![GitHub forks](https://img.shields.io/github/forks/Mahabub-3301/hp-system?style=social)](https://github.com/Mahabub-3301/hp-system)
[![License](https://img.shields.io/github/license/Mahabub-3301/hp-system)](https://github.com/Mahabub-3301/hp-system/blob/main/LICENSE)

<div align="center">
<img src="https://user-images.githubusercontent.com/123456789/28765432-1b8f4c3a-75e6-11e8-9f6e-1a2b3c4d5e6f.gif" width="100"/>
</div>

**A comprehensive gamified learning platform that rewards student progress with HP (Holistic Points) across courses, activities, and external integrations.**

</div>

## ✨ **Project Overview**

HP System is a **modular, scalable platform** designed to gamify education through a points-based reward system. Teachers create cohorts and activities, students earn/spend HP based on performance, and the system handles automated rewards, penalties, and comprehensive analytics.

### **Core Philosophy**

## 🏗️ **Architecture & Entities**

**Key Entities (Phase 0 ✅):**
| Entity | Description | Status |
|--------|-------------|--------|
| `Teacher` | Course/Cohort owner | ✅ |
| `Course` | Academic container | ✅ |
| `Cohort` | Student group | ✅ |
| `Student` | Email-based identity | ✅ |
| `Activity` | Tasks with HP rules | ✅ |
| `Submission` | Proof of completion | ✅ |
| `HP Ledger` | All credit/debit events | ✅ |
| `HP Rule` | Reward/Penalty config | ✅ |

## 📋 **Phase 0 Features (COMPLETE ✅)**

### **Teacher Workflow**
- [x] Cohort Setup + Student Import (email-based)
- [x] Base HP Assignment (default: 100, configurable)
- [x] Activity Creation (title, deadline, HP rules, mandatory toggle)
- [x] Submission Review + Revert

### **Student Experience**  
- [x] In-Platform Submission (file/image/link/text)
- [x] Auto HP Awards (absolute/% compounding)
- [x] Real-time Dashboard + Ledger

### **Automation**
- [x] Penalty Engine (scheduled for mandatory deadlines)
- [x] Full Ledger Audit Trail
- [x] Email Canonical Identity

## 🎯 **Roadmap**

| Phase | Milestone | Status |
|-------|-----------|--------|
| **1** | Core HP System | ✅ LIVE |
| **2** | VIBE Integration | 🔄 Next |
| **3** | Google Forms/CSV | 🔄 Planned |
| **4** | Peer Endorsements | 🔄 Planned |
| **5** | AI Feedback Coach | 🔄 Planned |

## 🚀 **Get Started (5 seconds)**

```bash
git clone https://github.com/Mahabub-3301/hp-system.git
cd hp-system
npm install
npm run dev
# → http://localhost:3000
```

## 🛠️ **Tech Stack**
MERN
