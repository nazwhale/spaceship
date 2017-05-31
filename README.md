#  ![MASA](public/images/Masa_small.jpg) Virtual Reality Spaceship
###### A project by the Makers Academy Space Administration
***

### Crew
We're a team of four aiming to build a Virtual Reality experience to view different locations in space via interactions with voice recognition technology.

- [Naz Malik](https://github.com/nazwhale)
- [Kate Gleeson](https://github.com/allbecauseyoutoldmeso)
- [Jean-Jacques Calbayrac](https://github.com/gekographe)
- [Ruan Odendaal](https://github.com/ruanodendaal)

### Log Book
#### Day 1
After arriving at Makers Academy HQ, the four of us gathered for a design sprint. We planned to interact with virtual reality using voice commands to Amazon's Alexa in order to transport the user to different planets. However, we first needed to clarify an MVP.

After a morning of constructive conversations reviewing our existing assumptions about VR and voice interaction, exploring as many possibilities as possible for our idea, then honing in on an MVP, we arrived at our mission statement: To switch VR views using voice commands to Alexa. Importantly, it must be sufficiently tested. Once this is satisfied, we can begin to fill those VR views will galactic environments from NASA's space rovers.

Next, we tried out [Google Cardboard](https://vr.google.com/cardboard/) and, after some thorough research including tutorials with [Google's standard developer kits for VR](https://developers.google.com/vr/cardboard/overview) and JJ managing to render a 360 degree photo in Google Cardboard, decided that an in-browser VR built in Unity with C# would be best suited to our mission. Certainly more technologies will be needed, but for now we have a place to start.

As none of us had any significant experience with Unity or C#, we set about educating ourselves by completing [Unity's roll-a-ball tutorial](https://unity3d.com/learn/tutorials/projects/roll-ball-tutorial). After, we plan to hack around in our Unity projects, adapting them for VR, then working on finding a way to switch between multiple VR views. Only once that is completed will we try and implement this functionality with Alexa.

Overall a very positive and productive day. We have a hell of a lot to do in 2 weeks, but spirits are high.

The earth looks mighty fine from up here.

*Major Naz*

#### Day 2
Building on our day 1 success we were all energized to dive a little deeper into VR. However after a good start we kept hitting blockers and our lack of experience in VR was becoming apparent. Post lunch we changed course and experiment with using [A-Frame](https://aframe.io) to build our VR model. Being built by the originators of WebVR and providing a clear structure to use `three.js`, we were starting to see immediate results.

By the end of the day we'd built a VR environment compatible with Google Cardboard that we can traverse!

 ![Mars_landing](public/images/vr_mars.png)

A great end to a tough day, searching for our purpose...but we're one step closer.

*Shipmate Odendaal*

#### Day 3
A new day, a new adventure. Like every morning we gathered on the conference room to speak about our strategies for the day. Our main focus is on Alexa, our new onboard Artificial Intelligence.

Even if it’s extremely powerful it is still fairly new and we are trying to find its limits. That’s why we tried, by working in pairs, to build different simple skills. After having fun creating a question game about video games, we started doing research to know how to link Alexa to our VR website experience.

One thing came out of that: we need to be able to update our website on the go. By the end of the day we moved to [Firebase](https://firebase.google.com/), a platform giving us the flexibility we were looking for. But we had to leave school to find refuge in an Alexa event.

Even if the talk was not quite what we hope for, we got the chance to ask the questions we were seeking answers for. And if it was not good enough a second talk about A-Frame (the 3D JavaScript framework we are using) was hosted at the same time. Major Naz went to attend this one while the rest of the crew staid for the Alexa one.

Finally, I took the space shuttle to return to the mother base, looking at the sun disappearing in the distance, warm and safe.

![major_naz](public/images/major_naz.jpg)

*Chief Engineer Jean-Jacques*

#### Day 4

*Ensign Gleeson’s log, stardate 25.4.2017*  

On the fourth day of our voyage we found ourselves exploring unmapped frontiers in the form of Alexa and Firebase.  It was all a bit scary to say the least.  

We already had the code to render our immersive interplanetary experience.  The next step was to teach Alexa to take the user to wherever said user asked.  Our intrepid coding team had attended talks, fired off emails, and interrogated every available expert, and concluded that Firebase might be the solution to the problem, functioning as an intermediary between AWS Lambda (the platform running our Alexa code) and the user’s device browser.

Today we split into two teams, tackling the problem from both ends (AWS Lambda and Firebase) and valiantly hoping that we would meet in the middle.  And so far it’s all going relatively well.

The mission continues…

#### Day 5

After splitting into two orbiting modules on day 4, both teams ventured into the deep space between AWS Lambda and Firebase, hoping to meet someday.

The Firebase team looked to edit our VR views using cURL requests from the command line. First a 'listener' was created using Firebase's 'messaging' functionality, and after a bit of tinkering, we managed to send it a signal via cURL. The listener listened and the view changed.

Later we looked to create the same effect via an HTTPS POST request from AWS Lambda. After some hard graft, we achieved this from the browser console. Later that evening, after a rocket fuel injection, Ensign Gleeson managed to insert the code into AWS Lambda and specify the Alexa intents to change views. Finally sweet contact was made. 

*Major Naz*

Day 6 - 7

*Chief engineer Calbayrac, stardate 29.4.2017* -
*Writing from the USS Challengers.*

The voyage is coming to an end. After a short Saturday where we celebrated the newly reached MVP, we spent some time to listen to Kate as she walked us through the code she wrote to finally make our lovely Alexa change the views using only our sweet voices. After what we tried to pair and accomplish some work but fatigue had caught up with us and we decided to have an early stop.

Today we gathered to work on making the experience smoother on smartphone, and we were able to link an Android to Alexa. 

Using the console of Kate’s Android phone we found the browser’s token and hardcoded it in the lambda function. Once done, Alexa had no difficulty to change the views of the different worlds we explored, including one populated of giants. While ensign Gleeson was doing that, Major Naz and I were adding new scenes and found the best way to do great VR pictures. Now you can visit the depths of the universe as well as our beautiful blue planet.

After lunch we were able, with the help of the database in Firebase, to save the token of every browsers visiting our web app, works perfectly with computers and Android phones but iPhones are still reluctant to share that piece of information with us. We tried many options but so far we still can’t put our hand on iPhones browser’s token. 

We ended the day with a brainstorm on what the following days will be about. We are going to focus on the user experience, make sure that it’s easy for every user to enjoy our VR experience, and for that we are going to need their browser token, but how? We have a couple good ways to do test. It’s gonna be challenging but we live for that. We are Challengers.

#### Day 5

*Ensign Gleeson's log, stardate 30.4.2017*

With Alexa linked up to our code on Firebase, today we went into warp drive.  We added new features to Alexa in the morning, and in the afternoon stared adding more interesting elements to our VR experience.  Before long our space odyssey had its very own monolith, capable of travelling to all corners of the universe in order to loom mysteriously. 

Towards the end of the day, sadly, we got blocked by a single knarly Jasmine test, and eventually had to admit temporary defeat.

Tomorrow, however, we will continue boldy onward.


### User Stories

* As a Space User,
  So that I can explore strange new worlds,
  I would like to have an immersive VR experience of intergalactic environments.

* As a Space User,
  So that I can travel without leaving the VR experience,
  I would like to be able to give orders by voice to an Alexa Skill.

* As a Space User,
  So that I can explore the frontiers of space,
  I would like to have multiple choices available as destinations.

* As a Space User,
  So that I can enjoy my VR experience at low cost,
  I would like it to be available on Google Cardboard.

* As a Space Developer,
  So that my VR experience can be available for free to anyone,
  I would like it to deploy it as a website.

### Technology
TBC
