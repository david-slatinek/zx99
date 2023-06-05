import './About.css'

const About = () => {
    return(
        <main className='about'>
            <h1> About</h1>
            <p>Inteligentni sistem, za prepoznavanje živali iz slik.</p>
            <h2>Model strojnega učenja</h2>
            <p>Uporabili smo vnaprej pripravljen model strojnega učenja, katerega smo nato doučili za naš problem. Model lahko prepozna 9 različnih vrst živali: mačka, pes, koala, surikata, opica, panda, penguin, zajec in tiger. Za gostovanje modela smo uporabili spletno storitev HubbingFace.</p>
            
        </main>
    )
}

export default About