document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("container");
  const modal = document.querySelector(".modal");
  const modalCloseBtn = document.querySelector(".close-btn");
  const productImg = document.querySelector(".product-img img");
  const productName = document.querySelector(".product-name");
  const modalProductName = document.querySelector(".modal .product-name h1");
  const modalProductInfo = document.querySelector(".modal .product-name p");

  const boxCount = 12 * 12;
  const boxSize = 240;
  const totalImages = 15;
  const columns = 12;

  const productInfo = [
    {
      info: "THE MVP",
      color: "Blue red",
    },
    {
      info: "Riri",
      color: "Rose mauve nude",
    },
    {
      info: "C-Suite Heart",
      color: "soft pink nude",
    },
    {
      info: "Bread Winn'r",
      color: "chocolate brown nude",
    },
    {
      info: "H.B.I.C",
      color: "deep garnet red",
    },
    {
      info: "Pink Limo'scene",
      color: "vivid hot pink",
    },
    {
      info: "Berry Banger",
      color: "berry",
    },
  ];

  const containerWidth = columns * boxSize;
  container.style.width = containerWidth + "px";

  for (let i = 0; i < boxCount; i++) {
    const box = document.createElement("div");
    box.classList.add("box");

    const img = document.createElement("img");
    img.classList.add("img");
    const imageIndex = (i % totalImages) + 1;
    img.src = `images/fenty-${imageIndex}.jpeg`;
  }
});
