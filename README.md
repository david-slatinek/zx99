# zx99

Cilj projekta je bil razviti inteligentni sistem za prepoznavanje živali iz slik s pomočjo strojnega učenja.

<div align="center">
  <img src="img/infrastructure.png" alt="Infrastruktura projekta">
  <br/>
  <i>Infrastruktura projekta.</i>
</div>

Prispeval:
<table>
    <tbody>
        <tr>
            <td align="center">
                <a href="https://github.com/david-slatinek">
                    <img src="https://avatars.githubusercontent.com/u/79467409?v=4" width="100px;" alt="David Slatinek Github avatar"/>
                    <br/>
                    <sub><b>David Slatinek</b></sub>
                </a>
            </td>
        </tr>
    </tbody>
</table>

# Model strojnega učenja

Uporabili smo vnaprej pripravljen model strojnega učenja [[1]](#1), katerega smo nato doučili za naš problem. Model
lahko prepozna 9 različnih vrst živali: mačka, pes, koala, surikata, opica, panda, penguin, zajec in tiger. Za
gostovanje modela smo uporabili spletno storitev HuggingFace [[2]](#2).

Prispeval:
<table>
    <tbody>
        <tr>
            <td align="center">
                <a href="https://github.com/iskraM">
                    <img src="https://avatars.githubusercontent.com/u/40259973?v=4" width="100px;" alt="Marcel Iskrač Github avatar"/>
                    <br/>
                    <sub><b>Marcel Iskrač</b></sub>
                </a>
            </td>
        </tr>
    </tbody>
</table>

# API

API omogoča uporabnikom, da pošljejo sliko živali in prejmejo napoved o njeni vrsti. Za razvoj API-ja smo uporabili
programski jezik Python in knjižnico Flask. Podatki se shranjujo v podatkovno bazo MongoDB, ki gostuje na platformi
MongoDB Atlas. Za gostovanje Docker slike smo uporabili platformo DockerHub.

<div align="center">
  <img src="img/api-call.png" alt="Napovedovanje kategorije živali in zanimivost">
  <br/>
  <i>Napovedovanje kategorije živali in zanimivost.</i>
</div>

Prispeval:
<table>
    <tbody>
        <tr>
            <td align="center">
                <a href="https://github.com/iskraM">
                    <img src="https://avatars.githubusercontent.com/u/40259973?v=4" width="100px;" alt="Marcel Iskrač Github avatar"/>
                    <br/>
                    <sub><b>Marcel Iskrač</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/LiparAljaz">
                    <img src="https://avatars.githubusercontent.com/u/59646484?v=4" width="100px;" alt="Aljaž Lipar Github avatar"/>
                    <br/>
                    <sub><b>Aljaž Lipar</b></sub>
                </a>
            </td>
        </tr>
    </tbody>
</table>

# Spletna stran

Spletna stran je namenjena predstavitvi projekta in omogoča uporabnikom, da preko nje dostopajo do API-ja. Za razvoj smo
uporabili programski jezik JavaScript in knjižnico React.

<div align="center">
  <img src="img/website.png" alt="Spletna stran">
  <br/>
  <i>Spletna stran.</i>
</div>

Prispeval:
<table>
    <tbody>
        <tr>
            <td align="center">
                <a href="https://github.com/rokrozman321">
                    <img src="https://avatars.githubusercontent.com/u/120044143?v=4" width="100px;" alt="Rok Rozman Github avatar"/>
                    <br/>
                    <sub><b>Rok Rozman</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/VosinekTimotej">
                    <img src="https://avatars.githubusercontent.com/u/57943360?v=4" width="100px;" alt="Timotej Vošinek Github avatar"/>
                    <br/>
                    <sub><b>Timotej Vošinek</b></sub>
                </a>
            </td>
        </tr>
    </tbody>
</table>

# Razdelitev dela

<div align="center">
  <img src="img/tasks.png" alt="Zadolžitve pri projektu">
  <br/>
  <i>Zadolžitve pri projektu.</i>
</div>

# Viri

<a id="1">[1]</a>
https://huggingface.co/microsoft/resnet-50

<a id="2">[2]</a>
https://huggingface.co/devMinty/zx99-animal-classifier
