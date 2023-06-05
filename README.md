# zx99

Cilj projekta je bil razviti inteligentni sistem za prepoznavanje živali iz slik s pomočjo strojnega učenja.

# Model strojnega učenja

Uporabili smo vnaprej pripravljen model strojnega učenja [[1]](#1), katerega smo nato doučili za naš problem. Model
lahko prepozna 9 različnih vrst živali: mačka, pes, koala, surikata, opica, panda, penguin, zajec in tiger. Za
gostovanje modela smo uporabili spletno storitev HuggingFace [[2]](#2).

<div align="center">
  <img src="img/infrastructure.png" alt="Infrastruktura projekta">
  <br/>
  <i>Infrastruktura projekta.</i>
</div>

# API

API omogoča uporabnikom, da pošljejo sliko živali in prejmejo napoved o njeni vrsti. Za razvoj API-ja smo uporabili
programski jezik Python in knjižnico Flask. Podatki se shranjujo v podatkovno bazo MongoDB, ki gostuje na platformi
MongoDB Atlas. Za gostovanje Docker slike smo uporabili platformo DockerHub.

<div align="center">
  <img src="img/api-call.png" alt="Napovedovanje kategorije živali in zanimivost">
  <br/>
  <i>Napovedovanje kategorije živali in zanimivost.</i>
</div>

# Spletna stran

Spletna stran je namenjena predstavitvi projekta in omogoča uporabnikom, da preko nje dostopajo do API-ja. Za razvoj smo
uporabili programski jezik JavaScript in knjižnico React.

<div align="center">
  <img src="img/website.png" alt="Spletna stran">
  <br/>
  <i>Spletna stran.</i>
</div>

# Razdelitev dela

<div align="center">
  <img src="img/tasks.png" alt="Zadolžitve na projektu">
  <br/>
  <i>Zadolžitve na projektu.</i>
</div>

# Viri

<a id="1">[1]</a>
https://huggingface.co/microsoft/resnet-50

<a id="2">[2]</a>
https://huggingface.co/devMinty/zx99-animal-classifier
