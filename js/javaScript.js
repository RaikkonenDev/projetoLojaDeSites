/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav_menu')
      navAlter = document.getElementById('nav_alterna')
      navClose = document.getElementById('nav-close')


if(navAlter){
    navAlter.addEventListener('click', () =>{
     navMenu.classList.add('show-menu')  //abre
    })
}



if(navClose){
    navClose.addEventListener('click',()=>{
        navMenu.classList.remove('show-menu')  //fecha
    })
}
/*=============== REMOVE MENU MOBILE ===============*/
const navlink = document.querySelectorAll('.nav_link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav_menu')
  
    navMenu.classList.remove('show-menu')
}
navlink.forEach(n => n.addEventListener('click', linkAction))

/*=============== ADD SHADOW HEADER ===============*/
const shadowHeader = () =>{
    const header = document.getElementById('header')

    this.scrollY >= 50 ? header.classList.add('shadow-header')
                      : header.classList.remove('shadow-header')
}


window.addEventListener('scroll', shadowHeader)

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp =() =>{
    const scrollUp = document.getElementById('scroll-up')

    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                         :scrollUp.classList.remove('show-scroll')
} 
window.addEventListener('scroll', scrollUp)
/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/

//essa parte e para fazer o nav menu ficar vermelhor com after quando vc rola pra baixoW
const sections = document.querySelectorAll('section[id]')  //Aqui está selecionado todos ids que tem section

const scrollActive = () =>{
const scrollDown = window.scrollY;
    
sections.forEach(current =>{
const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute('id'),
      sectionsClass = document.querySelector('.nav_menu a[href*=' + sectionId + ']')  //Aqui é uma parte do menu que tem <a href="#popular" class="nav_link">populares</a> (a parte #popular tem que estar definida no section ex: <div class"popular section" id="popular")

    if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
        sectionsClass.classList.add('active-link')
    }else{
        sectionsClass.classList.remove('active-link')
    }

})

}
window.addEventListener('scroll', scrollActive)



/*=============== SCROLL REVEAL ANIMATION ===============*/

const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 300,
    reset: true, //animação repetição
})

sr.reveal(`.home_data, .footer`)
sr.reveal(`.imagem_site`, {dalay:700 , distance: '100px', origin: 'bottom'})
sr.reveal(`.cubo-desing`, {dalay:1600 , interval: 100})
sr.reveal(`.apresentacao_img, .hosperdar_img, .contact_img`, {origin: 'left'})
sr.reveal(`.apresen_data, .sobre_data, .contact_data`, {origin: 'right'})
sr.reveal(`.popular_card`, {interval: 120})
