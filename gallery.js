let lightboxTitle = "OUR ART ON A PLATE";

let imgFiles = [
    "images/crepe_chocolate.jpg", 
    "images/crepe_monte.jpg", 
    "images/crepe_stroganof.jpg",
    "images/ensalada_valparaiso.jpg", 
    "images/jugo_frambuesa.jpg",   
    "images/limonada_hierbabuena.jpg", 
    "images/limonada_mango.jpg", 
    "images/pita_bosque.jpg", 
    "images/pollo_thai.jpg", 
    "images/sopa_mexicana.jpg",
    "images/vainilla_hot.jpg", 
    "images/waffle_frutos.jpg"];
               
let imgCaptions = [
    "Chocolate Fondue Crepe",
     "Crepe Montes de Maria",
      "Stroganoff Crepe", 
      "Valparaiso Salad", 
      "Raspberry Juice", 
      "Mint Lemonade",
      "Mango Biche Lemonade", 
      "Pita in the Forest", 
      "Thai Chicken Crepe", 
      "Mexican Chicken Soup", 
      "Vanilla Hot Chocolate Cup", 
      "Waffle with Berries"];

    let imgCount = imgFiles.length;

        window.addEventListener("load", createLightbox);

        function createLightbox() {
            let lightBox = document.getElementById("lightbox");
            
            let lbTitle = document.createElement("h1");
            lbTitle.id = "lbTitle";
            lbTitle.textContent = lightboxTitle;
            lightBox.appendChild(lbTitle);

            let lbParagraph = document.createElement("p");
            lbParagraph.id = "lbParagraph";
            lbParagraph.textContent = "A journey through flavors, colors, and textures.";
            lightBox.appendChild(lbParagraph);

            let lbImages = document.createElement("div");
            lbImages.id = "lbImages";
            lightBox.appendChild(lbImages);

            for (let i = 0; i < imgCount; i++) 
            
            {
                let card = document.createElement("div");
                card.className = "card";
                
                let image = document.createElement("img");
                image.src = imgFiles[i];
                image.alt = imgCaptions[i];
                image.onclick = createOverlay; // Call your specific function
        

                card.appendChild(image);
                lbImages.appendChild(card);
            }
        

        function createOverlay() {
            let overlay = document.createElement("div");
            overlay.id = "lbOverlay";

            let figureBox = document.createElement("figure");
            
            let overlayImage = this.cloneNode("true");
            figureBox.appendChild(overlayImage);

            let overlayCaption = document.createElement("figcaption");
            overlayCaption.textContent = this.alt;
            figureBox.appendChild(overlayCaption);

            // Add Favorite Button
            let favBtn = document.createElement("button");
            favBtn.className = "btn-fav";
            favBtn.textContent = "❤ Add to Favorites";
            favBtn.onclick = () => {
                addToTray(this.src);
                document.body.removeChild(overlay);
            };

            figureBox.appendChild(favBtn);

            let closeBox = document.createElement("div");
            closeBox.id = "lbOverlayClose";
            closeBox.innerHTML = "&times;";
            closeBox.onclick = function ()
            {
                  document.body.removeChild(overlay);
            }
            overlay.appendChild(closeBox);


            
            
            overlay.appendChild(figureBox);
            document.body.appendChild(overlay);
        }

        function addToTray(src) {
            const tray = document.getElementById('tray');
            const count = tray.querySelectorAll('.fav-pill').length;

            if (count >= 5) {
                alert("The tray is full! Please remove an item");
                return;
            }

            const pill = document.createElement('div');
            pill.className = 'fav-pill';
            pill.innerHTML = `<img src="${src}"><div class="remove-dot">×</div>`;
            pill.querySelector('.remove-dot').onclick = () => pill.remove();
            
            tray.appendChild(pill);
        }
        }