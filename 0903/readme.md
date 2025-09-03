# 📱 Apache Cordova 앱 개발 수업

## 🧾 수업 소개

이 수업은 **Apache Cordova**를 활용하여 하이브리드 모바일 애플리케이션을 개발하는 방법을 배우는 것을 목표로 합니다. HTML, CSS, JavaScript를 기반으로 하여 Android 및 iOS 플랫폼에서 실행 가능한 앱을 개발할 수 있습니다.

---

## 📌 수업 목표

- Cordova의 구조와 작동 방식 이해
- 크로스 플랫폼 앱 개발을 위한 환경 구성
- Cordova CLI 사용법 익히기
- 주요 플러그인 활용법 실습
- 간단한 모바일 앱 제작 및 배포

---

## 🛠️ 사전 준비 사항

| 항목 | 설명 |
|------|------|
| **Node.js** | Cordova 설치를 위한 런타임 |
| **NPM** | Node 패키지 매니저 |
| **Cordova CLI** | `npm install -g cordova` |
| **Android Studio** | Android 플랫폼 개발을 위한 도구 |
| **코드 편집기** | Visual Studio Code 추천 |
| **Git (선택)** | 버전 관리 도구 |

---

## 🗂️ 수업 커리큘럼

### 1️⃣ 오리엔테이션
- 하이브리드 앱 vs 네이티브 앱
- Cordova란 무엇인가?

### 2️⃣ 개발 환경 구성
- Node.js 및 Cordova CLI 설치
- 안드로이드 SDK 설정

### 3️⃣ Cordova 프로젝트 생성 및 구조 이해

```bash
cordova create myApp com.example.myapp MyApp
cd myApp
cordova platform add android
cordova build android
```

### 4️⃣ 앱 UI 구성 (HTML/CSS)

index.html 편집

모바일 레이아웃 구성

### 5️⃣ JavaScript를 활용한 앱 로직

DOM 조작

이벤트 처리

### 6️⃣ Cordova 플러그인 사용하기

기본 장치 기능 연동 (예: 카메라, 위치, 파일 시스템)

cordova plugin add cordova-plugin-camera

### 7️⃣ 앱 테스트 및 디버깅

에뮬레이터 실행

Android 기기 연결 테스트

### 8️⃣ 앱 패키징 및 배포

APK 생성

Play Store 업로드 개요
