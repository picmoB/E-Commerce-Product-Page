// Logos
import logoMain from "./assets/images/logo.svg";
import logoAvatar from"./assets/images/image-avatar.png";
import logoDelete from "./assets/images/icon-delete.svg";

// Main Images
import logoMainImage01 from "./assets/images/image-product-1.jpg";
import logoMainImage02 from "./assets/images/image-product-2.jpg";
import logoMainImage03 from "./assets/images/image-product-3.jpg";
import logoMainImage04 from "./assets/images/image-product-4.jpg";

// Thumbnails
import logoThumbnail01 from "./assets/images/image-product-1-thumbnail.jpg";
import logoThumbnail02 from "./assets/images/image-product-2-thumbnail.jpg";
import logoThumbnail03 from "./assets/images/image-product-3-thumbnail.jpg";
import logoThumbnail04 from "./assets/images/image-product-4-thumbnail.jpg";

// Icons
import iconMinus from "./assets/images/icon-minus.svg";
import iconPlus from "./assets/images/icon-plus.svg";
import iconCart from "./assets/images/icon-cart.svg";

// CSS
import "./App.css";
import { useState } from "react";

function App() {
  // Quantity Variables
  let [QUANTITY_NUM, setQuantity] = useState(0);
  let [QUANTITY_CART, setCart] = useState(0);

  // Enable/Disable button
  const isDisabled = QUANTITY_NUM === 0;

  // Starting Price
  const STARTING_PRICE = 125;

  // Hide/Show Cart Info
  const styleHide = {display: "none"};
  const styleShow = {
    backgroundColor: "orange",
    borderRadius: "50%",
    padding: "2px",
    width: "15px",
    height: "15px",
    fontSize: "10px",
    textAlign: "center",
    position: "relative",
    marginTop: "-15px",
    marginRight: "-25px"
  };

  // Increase Button
  function plusBtn() {
    setQuantity((prev) => {
      prev = prev + 1;
      return prev;
    });
  }

  // Decrease Button
  function minusBtn() {
    setQuantity((prev) => {
      prev = prev - 1;
      return prev;
    });
  }

  // Add To Cart
  function addToCart() {
    setCart((prev) => {
      prev = prev + QUANTITY_NUM;
      return prev;
    });
  }

  // Text Content for Each Link
  const linksArray = ["Collection", "Men", "Women", "About", "Contact"];
  const [activeIndex, setActiveIndex] = useState(null);

  // Links Component
  function Links() {
    return linksArray.map((link, index) => (
      <a 
        href="#"
        key={index}
        className={activeIndex === index ? "ecommerce-links active" : "ecommerce-links"}
        onClick={(e) => {
          e.preventDefault();
          setActiveIndex(index);
        }}
      >
        { link }
        {activeIndex === index && <span className="ecommerce-underline"></span>}
      </a>
    ));
  }

  // Image Array
  const imagesArray = [logoThumbnail01, logoThumbnail02, logoThumbnail03, logoThumbnail04];
  const mainImagesArray = [logoMainImage01, logoMainImage02, logoMainImage03, logoMainImage04];

  // Active Image State
  const [activeImage, setActiveImage] = useState(0);

  // Thumb Images Component
  function ThumbImage() {
    return imagesArray.map((image, num) => (
      <img 
        className={activeImage === num ? "thumb-image active" : "thumb-image"}
        src={image}
        key={num}
        alt="logo-thumb"
        onClick={(e) => {
          e.preventDefault();
          setActiveImage(num);
        }}
      />
    ));
  }

  // Main Image Component
  const [isOpened, setIsOpened] = useState(false);

  function MainImage() {
    return (
      <img className="ecommerce-main-image" src={mainImagesArray[activeImage]} onClick={openModal} alt="main-picture" />
    );
  }

  // Modal Window Style
  const displayNone = {display: "none"};
  const displayFlex = {display: "flex"};

  // Open Modal Window
  const openModal = () => {
    setIsOpened(true);
  }

  // Close Modal Window
  const closeModal = () => {
    setIsOpened(false);
  }

  // Arrow Buttons in Modal Window
  const nextImage = () => {
    setActiveImage((prev) => {
      if (prev === mainImagesArray.length - 1) {
        return 0;
      } else {
        return prev + 1;
      }
    });
  }

  const previousImage = () => {
    setActiveImage((prev) => {
      if (prev === 0) {
        return mainImagesArray.length - 1;
      } else {
        return prev - 1;
      }
    });
  }

  // Modal Window
  function ModalWindow() {
    return (
      <>
        <span className="modal-close" style={isOpened ? displayFlex : displayNone} onClick={closeModal}>&times;</span>
        <div className="modal-window" style={isOpened ? displayFlex : displayNone}>
          <div className="modal-main-image">
            <MainImage></MainImage>
            <div className="modal-arrow-holder">
              <div className="modal-left" onClick={previousImage}>&#10094;</div>
              <div className="modal-right" onClick={nextImage}>&#10095;</div>
            </div>
          </div>
          <div className="modal-thumb-image">
            <ThumbImage></ThumbImage>
          </div>
        </div>
      </>
    );
  }

  // Hamburger Menu
  function HamburgerMenu() {
    return (
      <>
        <div className={isHMactive ? "hamburger-menu-line-holder active" : "hamburger-menu-line-holder"} onClick={toggleHM}>
          <span className="hamburger-menu-line"></span>
          <span className="hamburger-menu-line"></span>
          <span className="hamburger-menu-line"></span>
        </div>
      </>
    );
  }

  const [isHMactive, setHMactive] = useState(false);

  const toggleHM = () => {
    setHMactive(!isHMactive);
  }

  // Cart Info Display Toggle
  const [isCartInfoVisible, setIsCartInfoVisible] = useState(false);

  const toggleCartInfo = () => {
    setIsCartInfoVisible(!isCartInfoVisible);
  };

  // Close Cart Info when clicking outside
  const closeCartInfo = (event) => {
    const cartDiv = document.querySelector(".quantity-cart-holder");
    const cartInfo = document.querySelector(".cart-info");
    if (cartDiv && !cartDiv.contains(event.target) && cartInfo && !cartInfo.contains(event.target)) {
      setIsCartInfoVisible(false);
    }
  }

  // Add Event Listener to Close Cart Info
  document.addEventListener("click", closeCartInfo);

  return (
    <div className="ecommerce-container">
      <ModalWindow></ModalWindow>
      <div className="hamburger-menu-holder" style={isHMactive ? {transform: "translateX(0%)", transition: "0.5s ease"} : {transform: "translateX(100%)", transition: "0.5s ease"}}>
        <Links></Links>
      </div>
      <header className="ecommerce-top-part">
        <HamburgerMenu></HamburgerMenu>
        <div className="ecommerce-top-left">
          <img src={logoMain} alt="logo-main" />
          <Links></Links>
        </div>
        <div className="ecommerce-top-right">
          <div className="quantity-cart-holder" onClick={toggleCartInfo}>
            <div className="quantity-cart" style={QUANTITY_CART === 0 ? styleHide : styleShow}>{QUANTITY_CART}</div>
            <img src={iconCart} alt="logo-cart" />
          </div>
          <div className="profile-circle">
            <img src={logoAvatar} alt="profile-avatar" />
          </div>
          <div className="cart-info" style={isCartInfoVisible ? {display: "inline-block"} : {display: "none"}}>
            <h1>Cart</h1>
            <p style={QUANTITY_CART === 0 ? {display: "flex"} : {display: "none"}}>Your cart is empty.</p>
            <div className="cart-info-packed" style={QUANTITY_CART !== 0 ? {display: "flex"} : {display: "none"}}>
              <div className="cart-info-details">
                <img src={logoThumbnail01} alt="cart-img" />
                <div className="cart-info-text">
                  <p>Fall Limited Edition Sneakers</p>
                  <p><span className="cart-info-multiply">${STARTING_PRICE} x {QUANTITY_CART}</span><span className="cart-info-total">${STARTING_PRICE * QUANTITY_CART}</span></p>
                </div>
                <div className="cart-delete" onClick={() => {
                    setCart(0);
                    setQuantity(0);
                  }}>
                  <img src={logoDelete} alt="delete-icon" />
                </div>
              </div>
              <button className="cart-checkout">Checkout</button>
            </div>
          </div>
        </div>
      </header>
      <div className="ecommerce-main-part">
        <div className="ecommerce-left-part">
          <MainImage></MainImage>
          <div className="ecommerce-image-section">
            <ThumbImage></ThumbImage>
          </div>
        </div>
        <div className="ecommerce-right-part">
          <div className="ecommerce-text-info">
            <p>SNEAKER COMPANY</p>
            <h1>Fall Limited Edition Sneakers</h1>
            <p>
              These low-profile sneakers are your perfect casual wear companion.
              Featuring a durable rubber outer sole, they'll withstand everything
              the weather can offer.
            </p>
          </div>
          <div className="ecommerce-price">
            <div className="sale-holder">
              <p className="new-price">$125.00</p>
              <div className="sale-div">50%</div>
            </div>
            <p className="old-price">$250.00</p>
          </div>
          <div className="ecommerce-shopping-part">
            <div className="quantity-count">
              <button className="btn-count" id="minus" onClick={minusBtn} disabled={isDisabled}><img src={iconMinus} alt="icon-count" /></button>
              <p className="quantity-num">{QUANTITY_NUM}</p>
              <button className="btn-count" id="plus" onClick={plusBtn}><img src={iconPlus} alt="icon-count" /></button>
            </div>
            <button id="btn-buy" disabled={isDisabled} onClick={addToCart}><img className="icon-buy" src={iconCart} alt="icon-buy" />Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
