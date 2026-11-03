const carousel = document.getElementById('carousel')
const backbtn = document.getElementById('backbtn')
const nextbtn = document.getElementById('nextbtn')
const indicators = document.getElementById('indicator')

let currentIdex = 0
const item = document.querySelectorAll('.carousel-items')
const totalitems = item.length

for(let i = 0; i < totalitems; i++){
    const  dot = document.createElement('div')
    dot.classList.add('indicator')
    if(i == 0)
        dot.classList.add('active')
    dot.addEventListener('click', () => goToslide(i))
    indicators.appendChild(dot)
}
function updateIndicator(){
    document.querySelectorAll('.indicator').forEach((indicator, index) => {
        indicator.classList.toggle('active', index == currentIdex)
    })
}

function goToslide(index){
    currentIdex = index
    carousel.style.transform = `translateX(-${currentIdex * 100}%)`
    updateIndicator()
}

function nextSlide(){
    currentIdex = (currentIdex + 1 ) % totalitems
    goToslide(currentIdex)
}
function backSlide(){
    currentIdex = (currentIdex - 1 + totalitems) % totalitems
    goToslide(currentIdex)
}
nextbtn.addEventListener('click', nextSlide)
backbtn.addEventListener('click', backSlide)