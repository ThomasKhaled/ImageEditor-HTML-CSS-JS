let saturate = document.getElementById('saturate');
let contrast = document.getElementById('contrast');
let brightness = document.getElementById('brightness');
let grayscale = document.getElementById('grayscale');
let sepia = document.getElementById('sepia');
let blur = document.getElementById('blur');
let hue_rotate = document.getElementById('hue-rotate');

let upload = document.getElementById('upload');
let download = document.getElementById('download');
let reset = document.querySelector('ul li span');
let img = document.getElementById('img-src');
let img_box = document.querySelector('.img-box .img');
let filters = document.querySelectorAll('ul li input');



function resetValues(){
    img.style.filter = `
            saturate(100%)
            contrast(100%)
            brightness(100%)
            grayscale(0%)
            sepia(0%)
            blur(0px)
            hue-rotate(0deg)
        `;

        saturate.value = '100';
        contrast.value = '100';
        brightness.value = '100';
        grayscale.value = '0';
        sepia.value = '0';
        blur.value = '0';
        hue_rotate.value = '0';
}

reset.addEventListener('click',_=>resetValues());

window.onload = function(){
    download.style.display = 'none';
    reset.style.display = 'none';
    img_box.style.display = 'none';
}

upload.onchange = function(){
    download.style.display = 'block';
    reset.style.display = 'block';
    img_box.style.display = 'block';
    let file = new FileReader();
    file.readAsDataURL(upload.files[0]);
    file.onload = function(){
        img.src = file.result;
        
    }
    img.addEventListener('load', () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img,100,0,canvas.width,canvas.width);
    });
}

filters.forEach(filter=>{
    filter.addEventListener(`input`,function(){
        img.style.filter = `
            saturate(${saturate.value}%)
            contrast(${contrast.value}%)
            brightness(${brightness.value}%)
            grayscale(${grayscale.value}%)
            sepia(${sepia.value}%)
            blur(${blur.value}px)
            hue-rotate(${hue_rotate.value}deg)
        `
        
    })
});

const saveImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    
    ctx.filter = `saturate(${saturate.value}%)
    contrast(${contrast.value}%)
    brightness(${brightness.value}%)
    grayscale(${grayscale.value}%)
    sepia(${sepia.value}%)
    blur(${blur.value}px)
    hue-rotate(${hue_rotate.value}deg)`;
    ctx.drawImage(img, 0,0, canvas.width, canvas.height);
    
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
}

download.addEventListener('click', saveImage);