// Fetch products from data.json
async function getProducts() {
  try {
    const response = await fetch("/data.json");
    const data = await response.json();
    const products = data.products;

    return products;
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  const products = await getProducts();
  const container = document.getElementById("container");
  const modal = document.querySelector(".modal");
  const modalCloseBtn = document.querySelector(".close-btn");
  const productImg = document.querySelector(".product-img img");
  const productName = document.querySelector(".product-name");
  const modalProductName = document.querySelector(".modal .product-name h1");
  const modalProductInfo = document.querySelector(".modal .product-name p");
  const productContentOne = document.querySelector(
    ".modal .product-content .content-one"
  );
  const productContentTwo = document.querySelector(
    ".modal .product-content .content-two"
  );

  const boxCount = 12 * 12;
  const boxSize = 240;
  const totalImages = 7;
  const columns = 12;

  const containerWidth = columns * boxSize;
  container.style.width = containerWidth + "px";

  for (let i = 0; i < boxCount; i++) {
    const box = document.createElement("div");
    box.classList.add("box");

    const img = document.createElement("img");
    img.classList.add("img");
    const imageIndex = (i % totalImages) + 1;
    img.src = `images/fenty-${imageIndex}.jpeg`;

    const productIndex = i % products.length;
    const product = products[productIndex];

    const info = document.createElement("p");
    info.textContent = product.info;

    const name = document.createElement("h1");
    name.textContent = product.color;

    const content = document.createElement("div");
    content.classList.add("content");
    content.appendChild(info);
    content.appendChild(name);

    box.appendChild(img);
    box.appendChild(content);
    container.appendChild(box);

    // Dragging and clicking
    let isDragging = false;
    let isClicking = false;

    box.addEventListener("mousedown", function () {
      isDragging = false;
      isClicking = true;
    });

    box.addEventListener("mousemove", function () {
      isDragging = true;
      isClicking = false;
    });

    box.addEventListener("click", function () {
      if (!isDragging && isClicking) {
        gsap.set(modal, { display: "flex" });
        gsap.to(modal, { opacity: 1, duration: 0.4 });
        productImg.src = img.src;
        modalProductName.textContent = product.color;
        modalProductInfo.textContent = product.info;
        productContentOne.textContent = product.contentOne;
        productContentTwo.textContent = product.contentTwo;
      }
    });
  }

  modalCloseBtn.addEventListener("click", function () {
    gsap.to(modal, {
      opacity: 0,
      duration: 0.4,
      onComplete: () => {
        gsap.set(modal, {
          display: "none",
        });
      },
    });
  });

  let isContainerDragging = false;
  let startCoords = { x: 0, y: 0 };
  let startTranslate = { x: 0, y: 0 };

  container.addEventListener("mousedown", onDragStart);
  container.addEventListener("mouseup", onDragEnd);
  container.addEventListener("mouseleave", onDragEnd);
  container.addEventListener("mousemove", onDrag);

  function onDragStart(e) {
    isContainerDragging = true;
    startCoords.x = e.ClientX;
    startCoords.y = e.ClientY;
    startTranslate.x = gsap.getProperty(container, "x");
    startTranslate.y = gsap.getProperty(container, "y");
    gsap.set(container, { cursor: "grabbing" });
    gsap.set(container, { userSelect: "none" });
  }

  function onDragEnd() {
    if (!isContainerDragging) return;
    isContainerDragging = false;
    gsap.set(container, { cursor: "grab" });
    gsap.set(container, { userSelect: "grab" });
  }

  function onDrag(e) {
    if (!isContainerDragging) return;
    e.preventDefault();
    const deltaX = e.ClientX - startCoords.x;
    const deltaY = e.ClientY - startCoords.y;
    const translateX = startTranslate.x + deltaX;
    const translateY = startTranslate.y + deltaY;

    gsap.to(container, {
      x: translateX,
      y: translateY,
      duration: 0.5,
      ease: "power1.out",
    });
  }
});
