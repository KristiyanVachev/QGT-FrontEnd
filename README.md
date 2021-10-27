# Question Generation Web App

This is a simple Angular web application used to demonstrate the work of the [Question-Generation-Transformers](https://github.com/KristiyanVachev/Question-Generation-Transformers) repository. It accepts the given paragraph along with the desired number of questions and outputs each generated question with the ability to redact them (shown below). The algorithm is exposing a simple REST API using *flask* which is consumed by the web app.


![question generation process](https://i.ibb.co/WFJjCgH/1-edited-fullscreen.png "Web application ")


## Installation and running
After you have installed node.js, install the packages using

    npm install

Then after you have launched the [Question-Generation-Transformers](https://github.com/KristiyanVachev/Question-Generation-Transformers)  REST API,  run the application using

    ng serve --open
