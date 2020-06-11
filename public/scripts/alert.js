
const errContainer = document.querySelector('.error');


if(errContainer){
    // console.log(errContainer.clientHeight);

    errContainer.style.maxHeight = '60px';
    setTimeout(() => {
        errContainer.style.maxHeight = '0px';
    }, 5000);
    setTimeout(() => {
        errContainer.style.opacity = 0;
    }, 5500);
}