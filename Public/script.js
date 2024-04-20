
const nxtBtn = document.getElementById('nxt-btn');
const prvBtn = document.getElementById('prv-btn');
const nxtImg = document.getElementById('nxt-img');
const prvImg = document.getElementById('prv-img');
const centerImg = document.getElementById('center-img');
//fetching display imgs and Ids form DB
fetch('https://techcap-main.onrender.com/getUrl')
            .then(response => response.json())
            .then(data => {
                
                centerImg.src = data.imgOne.url || 'placeholder1.jpg';
                prvImg.src = data.imgTwo.url
                nxtImg.src = data.imgThree.url 
                centerImg.setAttribute('product-id', `${data.imgOne.id}`);
                prvImg.setAttribute('product-id', `${data.imgTwo.id}`);
                nxtImg.setAttribute('product-id', `${data.imgThree.id}`);

                centerImg.onclick = function() {
                    redirectToProductPage(centerImg.getAttribute('product-id'));
                };
                prvImg.onclick = function() {
                    redirectToProductPage(prvImg.getAttribute('product-id'));
                };
                nxtImg.onclick = function() {
                    redirectToProductPage(nxtImg.getAttribute('product-id'));
                };
                
            })
            .catch(error => console.error('Error fetching data:', error));
            function redirectToProductPage(productId) {
    
                window.location.href = `https://techcap-main.onrender.com/product/${productId}`;
            }
//Carousel menu function
nxtBtn.addEventListener('click', function() {
    const currentSrc = centerImg.src;
    const currentProductId = centerImg.getAttribute('product-id');
    centerImg.classList.add('fade-out');
    setTimeout(() => {
        centerImg.src = nxtImg.src;
        centerImg.setAttribute('product-id', nxtImg.getAttribute('product-id'));
        nxtImg.src = prvImg.src;
        nxtImg.setAttribute('product-id', prvImg.getAttribute('product-id'));
        prvImg.src = currentSrc;
        prvImg.setAttribute('product-id', currentProductId);
        centerImg.classList.remove('fade-out');
    }, 500); 
});

prvBtn.addEventListener('click', function() {
    const currentSrc = centerImg.src;
    const currentProductId = centerImg.getAttribute('product-id');

    centerImg.classList.add('fade-out');
    setTimeout(() => {
        centerImg.src = prvImg.src;
        centerImg.setAttribute('product-id', prvImg.getAttribute('product-id'));
        prvImg.src = nxtImg.src;
        prvImg.setAttribute('product-id', nxtImg.getAttribute('product-id'));
        nxtImg.src = currentSrc;
        nxtImg.setAttribute('product-id', currentProductId);
        centerImg.classList.remove('fade-out');
    }, 500);
});
  
  


  