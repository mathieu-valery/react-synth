# react-synth

App can be found at => https://mathieu-react-synth.herokuapp.com/

A fun synthetiser made using React + Web Audi API.

Features implemented : 
* waveform selection, 
* low pass filter (2022 update: Knob button)
* volume enveloppe
* volume visualisation

User can play a note by pressing the corresponding key on the computer keyboard or just by clicking the keyboard. 

![](app.png)

I used Le Wagon React boilerplate with the following config:

- React, ReactDOM
- Redux, React-Redux
- Webpack 3
- Babel with es2015 and react presets
- Bootstrap (css only, loaded from a cdn in `index.html`)
- work with `.js` or `.jsx` files
- main `application.scss` stylesheet is imported in `index.js` as a module to enjoy hot reloading

# run the project

local : `npm run serve`