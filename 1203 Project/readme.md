# 🌤️ WeatherFit (날씨 기반 나만의 옷장 앱)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Cordova](https://img.shields.io/badge/Apache%20Cordova-E8E8E8?style=flat&logo=apachecordova&logoColor=black)

> **"오늘 뭐 입지?"** 고민을 해결해 주는 개인 맞춤형 날씨 비서 앱입니다.  
> 현재 위치의 날씨를 분석하여 내가 등록한 옷장 속 아이템 중 최적의 조합(OOTD)을 추천해 줍니다.

---

## ✨ 주요 기능 (Key Features)

1. **📍 실시간 위치 기반 날씨 정보**
    * OpenWeatherMap API를 사용하여 현재 위치의 온도, 날씨 상태, 최고/최저 기온을 보여줍니다.
    * 기온에 따른 경고 문구(일교차 주의, 폭염 등)를 제공합니다.

2. **👗 스마트 옷 추천 알고리즘**
    * 현재 기온(Temp)에 맞춰 **Outer(겉옷)**와 **Top(상의)** 조합을 자동으로 추천합니다.
    * 사용자가 등록한 옷 중에서 랜덤으로 선택되어 매번 새로운 코디를 제안합니다.

3. **🗄️ 나만의 모바일 옷장 (CRUD)**
    * **추가:** 옷 이름, 카테고리(아우터/상의/하의), 색상, 두께를 설정하여 등록할 수 있습니다.
    * **조회:** 필터(Filter) 기능을 통해 카테고리별로 옷을 모아볼 수 있습니다.
    * **삭제:** 더 이상 입지 않는 옷은 삭제할 수 있습니다.
    * **저장:** `LocalStorage`를 사용하여 앱을 껐다 켜도 데이터가 유지됩니다.

4. **📱 하이브리드 앱 (Apache Cordova)**
    * 웹 기술(HTML/CSS/JS)로 개발되었으며, Cordova를 통해 Android 및 iOS 앱으로 빌드 가능합니다.

---

## 📸 스크린샷 (Screenshots)

| 메인 화면 (날씨 & 추천) | 내 옷장 (리스트) | 옷 추가 화면 |
| :----------------: | :----------------: | :----------------: |
| <img src="screenshot_home.png" width="200" alt="Main Screen"> | <img src="screenshot_closet.png" width="200" alt="Closet Screen"> | <img src="screenshot_add.png" width="200" alt="Add Screen"> |

*(스크린샷 이미지를 `screenshot_home.png` 등으로 저장하여 프로젝트 폴더에 넣으면 위 영역에 표시됩니다.)*

---

## 🛠️ 기술 스택 (Tech Stack)

* **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+)
* **Framework:** Apache Cordova (Hybrid App Wrapper)
* **API:** OpenWeatherMap (Weather Data)
* **Database:** Browser LocalStorage (No Backend Required)
* **Library:** FontAwesome (Icons)

---

## 🚀 설치 및 실행 방법 (Installation)

이 프로젝트는 **Apache Cordova** 환경에서 실행되도록 설계되었습니다.

### 1. 필수 요구사항
* Node.js & npm 설치
* Cordova 설치: `npm install -g cordova`

### 2. 프로젝트 클론
```bash
git clone [https://github.com/your-username/weatherfit.git](https://github.com/your-username/weatherfit.git)
cd weatherfit

---

# 플랫폼 추가 (Android 또는 iOS)
cordova platform add android
# cordova platform add ios (Mac 환경일 경우)

# 위치 정보 플러그인 설치 (필수)
cordova plugin add cordova-plugin-geolocation



피그마 : https://www.figma.com/make/l59SnRwLhYCpBXxrbhUYHZ/WeatherFit-App-UI-Design?node-id=0-4&t=Pb6LwOq05PcQjuSD-1
