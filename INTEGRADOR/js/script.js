const carousel = document.getElementById('carousel')
const backbtn = document.getElementById('backbtn')
const nextbtn = document.getElementById('nextbtn')
const indicators = document.getElementById('indicator')
const slides = [
    { src: 'Imagenes/producto1.jpg', alt: 'Trabajo reciente 1', descripcion: 'Engranaje' },
    { src: 'Imagenes/producto2.jpg', alt: 'Trabajo reciente 2', descripcion:'Maceta' },
    { src: 'Imagenes/producto3.jpg', alt: 'Trabajo reciente 3', descripcion:'Jarron' },
    { src: 'Imagenes/producto4.jpg', alt: 'Trabajo reciente 4', descripcion:'Soporte para celular' }
]

let currentIndex = 0
const totalitems = slides.length

slides.forEach((slide, i) => {
    const item = document.createElement('div')
    item.classList.add('carousel-items')

    const img = document.createElement('img')
    img.src = slide.src
    img.alt = slide.alt

    const texto = document.createElement('p')
    texto.classList.add('carousel-texto')
    texto.textContent = slide.descripcion

    item.appendChild(img)
    item.appendChild(texto)
    carousel.appendChild(item)

    const dot = document.createElement('div')
    dot.classList.add('indicator')
    if (i === 0) dot.classList.add('active')
    dot.addEventListener('click', () => goToslide(i))
    indicators.appendChild(dot)
})

function updateIndicator() {
    document.querySelectorAll('.indicator').forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex)
    })
}

function goToslide(index) {
    currentIndex = index
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`
    updateIndicator()
}

function nextSlide() {
    goToslide((currentIndex + 1) % totalitems)
}

function backSlide() {
    goToslide((currentIndex - 1 + totalitems) % totalitems)
}

nextbtn.addEventListener('click', nextSlide)
backbtn.addEventListener('click', backSlide)