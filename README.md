# carbon-footprint-logger

Technologies used:
Node, express, jquery, javascript, charts js, css and materialize.


Project Planning:

I first created a kanban board with a set of deliverables. Each one of those deliverables had a set of check marked boxes as shown below:




I also created a route map and styled the different lines for indicating a link, get route or post route.

API:

I used the CM1 API to gather my data. The api allows for a user to build a url based on the parameters. In this case I used the make, model, year and distance traveled in a given car. The data received back was a JSON format. I then parsed the data and looked for the total CO2 emmited with the input parameters. 


Models:

There are three models in this database; users, vehicles and mileage. The users has a one to many relationship with the vehicles model. The vehicles model has a one to many relationship with the mileage model. They are all connected through their ID number. 



CRUD:

Create- The user is able to post data from two forms to the mileage module,  vehicle moduel and user module. 
 
Read- The data is found and retrieved from the database through multiple routes as shown below.
 
Update- The carbon value from the api is put into the mileage module.
 
Delete- The user is able to delete cars they no longer have.  This is done through an AJAX call paired with the delete route. 


Style:

The style is very minimal for an mvp goal. It has a few inputs and mainly focuses on the data visualization. The style will be revisited and updated post cohort. 


Take-aways:

I had a difficult time mirroring the routes to my functionality. When I was able to overcome that issue, I was able to simplify the code and cut down on quite a few redundancies. I did learn a lot and solidify my understanding of restful routing.  

Add-ons Post Cohort:

I hope to dive more into the data visualization component of this project. I am hoping to add another few charts that show the user’s carbon footprint by year. I would also like to add a component where the user can compare their footprint to other methods of transportation as well as other factors(diet, purchases, airline travel, ect) that go into calculating a total carbon footprint. 
