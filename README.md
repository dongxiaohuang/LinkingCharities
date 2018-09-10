## Objectives
This project aims to build an online portal that connects charities with the world's users
## Functionalities
There are three types of target users: charities, donors and potential user. Each group of users can gain diverse experiences by utilizing this website, so the description of contributions will be presented below based on their purposes.

**Charity Users** can post their charities’ information such as promotional photos, donation details, location and so on and post volunteer activities. In addition, they can also edit their charities’ details page on this portal and track donations and voluntary registrations.

**Donors** can register on this website by creating an account or Facebook authorization. As an authorized user, they can give feedback to charities by ranking, saving to favorites and making comments. They can also sign up to volunteer services and make monetary donations to charities they wish. In their donation management pages, they can see the amount of money they have donated and details of each donation. Similarly, voluntary registration details can also be managed through the voluntary management page.

**Unregistered Users**, the potential users surﬁng the website, can also make a donation without registration. They are able to search the nonproﬁts by name, location or category. Once they are interested in one charity, they can browse its details. In addition, they can also search the charities based on geographical information, and ﬁnd out charities nearby or on a certain location. Potential users are of great signiﬁcance because we would like to cultivate the spirit of giving worldwide.


For the design choice, there are three parts of the project, front-end, back-end, and database. Angular and Bootstrap frameworks are used for front-end, and Express framework is adopted in the server side. As for the database, NoSQL database is utilized, MongoDB speciﬁcally
## How to use
Two parts need to be configured: Client and Server.

### In server-side

To initialize the server, run
```
npm install
```
After all the dependencies are installed, every time to open the server, by
```
npm start
```


### In client-side
Under `client` path, to initial the Angular application using
```
npm install
```
After that, every time you start the project,by
```
npm start
```
Note: if your server running is not in `http://localhost:8000/`, please change the connect server base url in `client/src/app/shared/baseurl.ts`


After that, the client is communicating with the server. To visit localhost:4200 to check the page.
