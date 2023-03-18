import React, { useState } from 'react';
const Dashboard = () => {

  const [language, setLanguage] = useState('ar');

  const onStartClicked = (event) => {
    setLanguage(event.target.value);
    console.log('language changed to: ', language)
  };

  return (
    <div class="big-wrapper light">
        <img src="./img/shape.png" alt="" class="shape" />

        <header>
          <div class="container">
            <div class="logo">
              <img src="./img/logo_.png" alt="Logo" />
              
            </div>

            <div class="links">
              <ul>
                <li><a href="#">من نحن</a></li>
                <li><a href="#">خدماتنا</a></li>

              </ul>
            </div>

            <div class="overlay"></div>

            <div class="hamburger-menu">
              <div class="bar"></div>
            </div>
          </div>
        </header>

        <div class="showcase-area">
          <div class="container">
            <div class="left">
              <div class="big-title">
                <h1>اختصرناها عليك!!</h1>
              </div>
              <p class="text">
منصة وجيز تساعدك تفهم المستندات الخاصة فيك وتسهل عليك تفهم ايش لك وايش اللي عليك 
بطريقة بسيطة وسريعة عشان هدفنا الاول نسهلها عليك ونحفظ وقتك
              </p>
              <div class="cta">
                <a href="#" class="btn">ابــدأ</a>
              </div>
            </div>

            <div class="right">
              <img src="./img/home.png" alt="Person Image" class="person" />
            </div>
          </div>
        </div>

        <div class="bottom-area">
          <div class="container">
            <button class="toggle-btn">
              <i class="far fa-moon"></i>
              <i class="far fa-sun"></i>
            </button>
          </div>
        </div>
      </div>
  );
};

export default Dashboard;