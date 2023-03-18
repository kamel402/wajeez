const LandingPage = () => {


  const onStartClicked = (event) => {
    setLanguage(event.target.value);
    console.log('language changed to: ', language)
  };

  return (
    <div id="website">

        <div class="main">
            <nav>
                <div class="logo">
                    <div class="logup">
                        <img
                      src="/wajeez-logo.png"
                      // className="h-12 mr-2 hover:opacity-80 opacity-100 transition-opacity"
                      // width={184} height={48}
                    />
                    </div>
                </div>
                <div class="nav-links">

                    <ul>
                        <li><a href="#">الخدمات</a></li>
                        <li><a href="#">من نحن</a></li>
                    </ul>
                </div>
            </nav>
            <div class="info">
                <div class="overlay"></div>
                {/* <img src="Research paper-cuate.png" class="main-image"> */}
                <img class="main-image"
                      src="/research-paper-cuate.png"
                      // className="h-12 mr-2 hover:opacity-80 opacity-100 transition-opacity"
                      // width={184} height={48}
                    />
                <div id="circle">
                    <div class="feature one">
                        <div>
                            <h2>! اختصرناها عليك</h2>
                            <p>منصة وجيز تساعدك تفهم المستندات الخاصة فيك وتسهل عليك تفهم ايش لك وايش عليك بطريقة بسيطة
                                وسريعة عشان هدفنا الاول نسلهلها عليك ونحفظ وقتك</p>
                            <a class="cta" href="/"><button className="start-btn">ابدأ</button></a>

                        </div>

                    </div>

                </div>
            </div>

        </div>



    </div>
  );
};

export default LandingPage;
