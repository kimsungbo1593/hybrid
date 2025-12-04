/* ==========================================
   1. 설정 및 초기화
   ========================================== */
const API_KEY = ""; // 본인의 API Key

window.onload = function() {
    loadClosetFromStorage(); // 저장된 옷 불러오기

    // Cordova 앱 환경인지 확인
    if (window.cordova) {
        document.addEventListener("deviceready", onDeviceReady, false);
    } else {
        // 브라우저 테스트 환경에서는 바로 실행
        askForLocation();
    }
};

function onDeviceReady() {
    // 앱이 준비된 후 위치 권한 요청
    askForLocation();
}

/* ==========================================
   2. 데이터 저장소(Local Storage) 관리
   ========================================== */

// 저장된 옷 불러오는 함수
function loadClosetFromStorage() {
    const savedData = localStorage.getItem('myClosetData');

    // 1. 저장된 데이터가 하나도 없으면? (최초 실행 시) -> 예시 데이터 자동 등록
    if (!savedData) {
        const defaultItems = [
            { name: "Beige Cardigan", category: "outer", color: "#D2B48C" },
            { name: "Black Jacket", category: "outer", color: "#1A1A1A" },
            { name: "Denim Jacket", category: "outer", color: "#6485A5" },
            { name: "White T-Shirt", category: "top", color: "#FFFFFF" },
            { name: "Blue Polo", category: "top", color: "#4FA4F4" },
            { name: "Black Jeans", category: "bottom", color: "#333333" }
        ];
        // 예시 데이터를 저장소에 저장
        localStorage.setItem('myClosetData', JSON.stringify(defaultItems));
        savedData = JSON.stringify(defaultItems); // 변수 업데이트
    }
    
    const closetItems = savedData ? JSON.parse(savedData) : [];
    const closetGrid = document.querySelector('.closet-grid');
    
    // (선택사항) 기존 목록 초기화 필요시 주석 해제
    closetGrid.innerHTML = ""; 

    closetItems.forEach(item => {
        const newItemHTML = `
            <div class="closet-item" data-category="${item.category}" onclick="showItemDetail(this)">
                <div class="item-img" style="background-color: ${item.color};"></div>
                <span>${item.name}</span>
            </div>
        `;
        closetGrid.insertAdjacentHTML('beforeend', newItemHTML);
    });
    
    updateItemCount();
}

function updateItemCount() {
    const count = document.querySelectorAll('.closet-item').length;
    document.querySelector('.count-text').innerText = count + " items";
}

// [New] 옷장에서 특정 카테고리의 옷을 랜덤으로 하나 뽑는 함수
function getRandomItemFromCloset(targetCategory) {
    const savedData = localStorage.getItem('myClosetData');
    const closetItems = savedData ? JSON.parse(savedData) : [];

    // 원하는 카테고리만 골라내기
    const filteredItems = closetItems.filter(item => item.category === targetCategory);

    if (filteredItems.length === 0) return null; // 옷이 없으면 null 반환

    // 랜덤으로 하나 뽑기
    const randomIndex = Math.floor(Math.random() * filteredItems.length);
    return filteredItems[randomIndex];
}


/* ==========================================
   3. 위치 및 날씨 API
   ========================================== */
function askForLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successLocation, errorLocation);
    } else {
        alert("이 브라우저는 위치 정보를 지원하지 않습니다.");
        errorLocation();
    }
}

function successLocation(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    getWeatherByLocation(lat, lon);
}

function errorLocation() {
    getWeatherByLocation(37.5665, 126.9780); // 서울 좌표
}

async function getWeatherByLocation(lat, lon) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);
        const data = await response.json();

        // 화면 업데이트
        document.getElementById('city-name').innerText = data.name;
        document.getElementById('current-temp').innerText = Math.round(data.main.temp) + "°";
        document.getElementById('weather-status').innerText = data.weather[0].main;
        document.getElementById('temp-range').innerText = `H: ${Math.round(data.main.temp_max)}° L: ${Math.round(data.main.temp_min)}°`;

        // 옷 추천 로직 실행
        recommendOutfitByTemp(data.main.temp);

    } catch (error) {
        console.error("날씨 정보 로딩 실패:", error);
    }
}


/* ==========================================
   4. [수정됨] 온도별 옷 추천 로직 (내 옷장 연동)
   ========================================== */
function recommendOutfitByTemp(currentTemp) {
    let innerItem = null;
    let outerItem = null;
    let desc = "";

    // 1. 온도별 전략 설정 (상의는 무조건 Top, 아우터는 날씨따라 Outer)
    if (currentTemp >= 23) {
        innerItem = getRandomItemFromCloset('top');
        desc = "날씨가 덥습니다! 시원하게 입으세요.";
    } else if (currentTemp >= 15) {
        innerItem = getRandomItemFromCloset('top');
        outerItem = getRandomItemFromCloset('outer');
        desc = "일교차가 큽니다. 겉옷을 꼭 챙기세요.";
    } else if (currentTemp >= 5) {
        innerItem = getRandomItemFromCloset('top');
        outerItem = getRandomItemFromCloset('outer');
        desc = "쌀쌀한 날씨입니다. 따뜻하게 입으세요.";
    } else {
        innerItem = getRandomItemFromCloset('top');
        outerItem = getRandomItemFromCloset('outer');
        desc = "매우 춥습니다! 두꺼운 옷을 추천해요.";
    }

    // 2. 옷이 없을 경우 '기본 아이템' 설정 (오류 방지)
    if (!innerItem) {
        innerItem = { name: "기본 티셔츠", color: "#dddddd" }; // 회색
    }
    // 23도 미만인데 아우터가 없으면 기본 아우터 표시
    if (!outerItem && currentTemp < 23) { 
        outerItem = { name: "기본 겉옷", color: "#888888" }; // 진회색
    }

    updateUI(innerItem, outerItem, desc);
}

// [수정됨] 화면 업데이트 (이미지 URL 대신 색상 박스 사용)
function updateUI(inner, outer, description) {
    // index.html의 id="recommend-inner"와 "recommend-outer"를 찾음
    const innerBox = document.querySelector('#recommend-inner .combo-color-box');
    const innerText = document.querySelector('#recommend-inner span');
    
    const outerDiv = document.querySelector('#recommend-outer');
    const outerBox = document.querySelector('#recommend-outer .combo-color-box');
    const outerText = document.querySelector('#recommend-outer span');
    
    const plusSign = document.querySelector('.plus-sign');
    const descText = document.querySelector('.combo-desc');

    const alertText = document.querySelector('.alert-box span');

    // HTML 구조가 아직 업데이트 안 됐을 경우를 대비한 안전장치
    if (!innerBox) {
        console.log("HTML이 아직 이미지 모드입니다. index.html의 추천 영역을 색상 박스 모드로 변경해주세요.");
        return;
    }

    // 상의 적용
    innerBox.style.backgroundColor = inner.color;
    innerText.innerText = inner.name;

    // 아우터 적용 (없으면 숨김)
    if (!outer) {
        outerDiv.style.display = "none";
        plusSign.style.display = "none";
    } else {
        outerDiv.style.display = "flex"; 
        plusSign.style.display = "block";
        outerBox.style.backgroundColor = outer.color;
        outerText.innerText = outer.name;
    }
    
    if (alertText) {
        alertText.innerText = description; 
    }

    // 설명 텍스트 적용
    if (descText) descText.innerText = description;
}


/* ==========================================
   5. UI 동작 (탭, 팝업) - 기존 유지
   ========================================== */
function switchTab(tabName) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
        if(screen.id === 'add-screen') screen.style.display = 'none'; 
    });

    if(tabName === 'home') document.getElementById('home-screen').classList.add('active');
    else if (tabName === 'closet') document.getElementById('closet-screen').classList.add('active');

    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    
    const navItems = document.querySelectorAll('.nav-item');
    if(tabName === 'home') navItems[0].classList.add('active');
    if(tabName === 'closet') navItems[1].classList.add('active');
}

function showAddScreen() {
    const addScreen = document.getElementById('add-screen');
    addScreen.style.display = 'block';
    addScreen.classList.add('active');
}

function hideAddScreen() {
    const addScreen = document.getElementById('add-screen');
    addScreen.classList.remove('active');
    setTimeout(() => { addScreen.style.display = 'none'; }, 200);
}

function selectOption(element, group) {
    element.parentElement.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('selected'));
    element.classList.add('selected');
}

function selectSegment(element) {
    document.querySelectorAll('.segment-btn').forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');
}

function updateColorDisplay(input) {
    const chosenColor = input.value;
    document.getElementById('colorDisplayBtn').style.backgroundColor = chosenColor;
    document.getElementById('colorHexText').innerText = chosenColor.toUpperCase();
}


/* ==========================================
   6. 옷 저장 기능
   ========================================== */
function saveItem() {
    const nameInput = document.querySelector('.text-input').value;
    const selectedCategoryBtn = document.querySelector('.category-options .option-btn.selected');
    const selectedColor = document.getElementById('colorPickerInput').value;

    if (nameInput === "") { alert("옷 이름을 입력해주세요!"); return; }
    if (!selectedCategoryBtn) { alert("카테고리를 선택해주세요!"); return; }

    const categoryText = selectedCategoryBtn.innerText.toLowerCase();

    // 1. 화면에 추가
    const newItemHTML = `
        <div class="closet-item" data-category="${categoryText}" onclick="showItemDetail(this)">
            <div class="item-img" style="background-color: ${selectedColor};"></div>
            <span>${nameInput}</span>
        </div>
    `;
    const closetGrid = document.querySelector('.closet-grid');
    closetGrid.insertAdjacentHTML('afterbegin', newItemHTML);

    // 2. 저장소에 추가
    const newItem = {
        name: nameInput,
        category: categoryText,
        color: selectedColor
    };

    const savedData = localStorage.getItem('myClosetData');
    const closetItems = savedData ? JSON.parse(savedData) : [];
    closetItems.unshift(newItem);
    localStorage.setItem('myClosetData', JSON.stringify(closetItems));

    alert(`'${nameInput}' 저장 완료!`);
    
    document.querySelector('.text-input').value = ""; 
    hideAddScreen();
    switchTab('closet');
    updateItemCount();
}


/* ==========================================
   7. 필터 및 상세 보기/삭제
   ========================================== */
function filterCloset(btnElement, category) {
    document.querySelectorAll('.filter-scroll .chip').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');

    const items = document.querySelectorAll('.closet-item');
    items.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (category === 'all' || itemCategory === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });

    const visibleItems = document.querySelectorAll('.closet-item[style="display: block;"]').length;
    const totalVisible = (category === 'all') ? items.length : visibleItems;
    document.querySelector('.count-text').innerText = totalVisible + " items";
}

let currentSelectedItem = null;

function showItemDetail(itemElement) {
    currentSelectedItem = itemElement;
    
    const name = itemElement.querySelector('span').innerText;
    const category = itemElement.getAttribute('data-category').toUpperCase();
    const color = itemElement.querySelector('.item-img').style.backgroundColor;

    document.getElementById('modal-name').innerText = name;
    document.getElementById('modal-category').innerText = category;
    document.getElementById('modal-color-preview').style.backgroundColor = color;
    document.getElementById('detail-modal').style.display = 'flex';
}

function deleteCurrentItem() {
    if (currentSelectedItem) {
        const nameToDelete = currentSelectedItem.querySelector('span').innerText;

        // 1. 화면에서 삭제
        currentSelectedItem.remove();
        
        // 2. 저장소에서 삭제
        const savedData = localStorage.getItem('myClosetData');
        let closetItems = savedData ? JSON.parse(savedData) : [];
        
        closetItems = closetItems.filter(item => item.name !== nameToDelete);
        localStorage.setItem('myClosetData', JSON.stringify(closetItems));

        closeDetailModal(null);
        updateItemCount();
    }
}

function closeDetailModal(event) {
    if (event === null || event.target.id === 'detail-modal') {
        document.getElementById('detail-modal').style.display = 'none';
    }
}