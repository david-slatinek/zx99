# zx99

Cilj projekta je bil razviti inteligentni sistem za prepoznavanje živali iz slik s pomočjo strojnega učenja.

# Model strojnega učenja

Uporabili smo vnaprej pripravljen model strojnega učenja [[1]](#1), katerega smo nato doučili za naš problem. Model
lahko prepozna 9 različnih vrst živali: mačka, pes, koala, surikata, opica, panda, penguin, zajec in tiger. Za
gostovanje modela smo uporabili spletno storitev HubbingFace [[2]](#2).

# API

API omogoča uporabnikom, da pošljejo sliko živali in prejmejo napoved o njeni vrsti. Za razvoj API-ja smo uporabili
programski jezik Python in knjižnico Flask. Podatki se shranjujo v podatkovno bazo MongoDB, ki gostuje na platformi
MongoDB Atlas.

# Razdelitev dela

<div align="center">
  <img src="img/tasks.png" alt="Zadolžitve na projektu">
  <br/>
  <i>Zadolžitve na projektu.</i>
</div>
<br/>

# Viri

<a id="1">[1]</a>
https://huggingface.co/microsoft/resnet-50

<a id="2">[2]</a>
https://huggingface.co/devMinty/zx99-animal-classifier
