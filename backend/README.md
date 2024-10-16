# Yoga Classes
## About the App
* Frontend : ReactJS
* Backend : Express, NodeJS
* Database : MongoDB
## Features
* Accepts the user data, does basic validations.
* Only people within the age limit of 18-65 can enroll for the monthly classes and they will
be paying the fees on a month on month basis. I.e. an individual will have to pay the fees
every month and he can pay it any time of the month.
* They can enroll any day but they will have to pay for the entire month. The monthly fee is
500/- Rs INR.
* There are a total of 4 batches a day namely 6-7AM, 7-8AM, 8-9AM and 5-6PM. The
participants can choose any batch in a month and can move to any other batch next
month. I.e. participants can shift from one batch to another in different months but in
same month they need to be in same batch.
* Return the response to front-end depending on the payment response from
CompletePayment() function.
* Use of REST-API


## ENVIRONMENT VARIABLE REQUIRED FOR RUNNING THIS APPLICATION LOCALLY
* MONGODB_URI 
* JWT_SECRET
* PORT

## API USED :
1. /home    (Home page)
2. /signin (Page for Existing user to sign in again)
3. /signup (Page for Registering)
4. /chooseplan ( Page for choosing the batch and payment)
5. /profile ( Display all the users data in Profile Page) 


## ER DIAGRAM
![ER DIAGRAM](https://user-images.githubusercontent.com/65064180/207200877-92968c81-e896-4116-abb0-3988624f745e.png)



## Screen shots 📸
[Signup]: https://user-images.githubusercontent.com/65064180/207203793-e5ab6471-0f40-4a36-be1d-5a27f41ca104.png
[SignIn]: https://user-images.githubusercontent.com/65064180/207203814-b25835e9-cd7c-4ad6-9d09-12665a5aaef7.png
[Home]: https://user-images.githubusercontent.com/65064180/207203790-a234ca85-b6dd-4e5a-b4b8-313979c14a7a.png
[Choose Plan]: https://user-images.githubusercontent.com/65064180/207203802-7d6c5ca2-1098-41af-970e-e97b3ce2ee38.png
[After Choosing Plan]: https://user-images.githubusercontent.com/65064180/207203804-5bba86e5-6af5-4a48-843d-741afa84870f.png
[Profile]: https://user-images.githubusercontent.com/65064180/207203809-5b4929a6-28fa-4c6f-9a36-b3d730c24821.png



|   Home     |    
| ------------- |
|![alt text][Home]  | 

|    Sign up      |    
| ------------- | 
|![alt text][Signup]  | 


|    Sign In     |    
| ------------- |
|![alt text][SignIn]  | 



|    Choose Plan    |    
| ------------- |
|![alt text][Choose Plan]  | 



|   After Choosing Plan     |    
| ------------- |
|![alt text][After Choosing Plan]  | 



|   Profile     |    
| ------------- |
|![alt text][Profile]  | 

