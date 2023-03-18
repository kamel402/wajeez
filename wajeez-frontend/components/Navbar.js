const Navbar = () => {
  return (


    <header>
      <div class="container">
        <div class="logo">
          <img src="/wajeez-logo.png" alt="Logo"  />

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
  );
};

export default Navbar;
