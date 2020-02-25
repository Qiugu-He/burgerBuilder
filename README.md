# Burger Builder App

The app is developed for restaurant to provide customized burger to their user

# Get started
- Install node js on your machine
- cd to root directory, type "npm install" for dependencies
- type "npm start" to start the server
- Go to http://localhost:3000

# Component tree:
<img src="https://github.com/Qiugu-He/burgerBuilder/blob/master/component-tree.png" alt="alt text" width="60%" height="60%">
The app's layout is consists by 4 component: Toolbar, sidebar(responsive), backdraw, {props.children}(dymanicly passing component into pages)
- Toolbar & sidebar consists: drawerToggle, Logo, Navbar items
- {props.children}
    - Burger builder page contains 3 component: builder controller, built burger preview, and modal
    - builder controller contains a list of components of individual control, which responseble to built burger. (HTML/JS)
    - burger preview hold ingredient components (a list of ingredient), which dynamic contolled by user with build control. (each ingredient is just a div/css)
    - modal is a wraper component, which takes {props.children} to warp itself aroundany content in the modle(e.g. order summary/checkout summary)

Oders state (JSON): 
- Ingredients {meat; cheese; salad; bacon}
- purchse; 
- totalPrice;

Firebase structure:
<img src="https://github.com/Qiugu-He/burgerBuilder/blob/master/firebase.png" alt="alt text" width="60%" height="60%">

Oder information (JSON):
- Ingredients {meat; cheese; salad; bacon};
- Order data {country; deliverMethod; email; name; address; zipCode};
- TotalPrice;

# App screenshot:
Home page:
<img src="https://github.com/Qiugu-He/burgerBuilder/blob/master/home.png" alt="alt text" width="60%" height="60%">
order summary:
<img src="https://github.com/Qiugu-He/burgerBuilder/blob/master/orderSummary.png" alt="alt text" width="60%" height="60%">
checkout:
<img src="https://github.com/Qiugu-He/burgerBuilder/blob/master/checkout.png" alt="alt text" width="60%" height="60%">
 
