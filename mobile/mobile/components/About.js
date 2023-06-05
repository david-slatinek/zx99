//import './About.css'
import Text, { SafeAreaView, View } from "react-native";

const About = () => {
    return(
        <main>
            <Text> About</Text>
            <Text>Inteligentni sistem, za prepoznavanje živali iz slik.</Text>
            <Text>Model strojnega učenja</Text>
            <Text>Uporabili smo vnaprej pripravljen model strojnega učenja, katerega smo nato doučili za naš problem. Model lahko prepozna 9 različnih vrst živali: mačka, pes, koala, surikata, opica, panda, penguin, zajec in tiger. Za gostovanje modela smo uporabili spletno storitev HubbingFace.</Text>
            
        </main>
    )
}

export default About;