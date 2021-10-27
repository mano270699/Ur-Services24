const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    fileUpload = require('express-fileupload'),
    session = require('express-session'),

    path = require('path'),
    port = process.env.PORT || 3000;
config = require('./config');
global.port = port;
//http: //services.ur-services24.com/
const urlDashBoard = "http://192.168.1.20:3000";
app.set("port", process.env.port || port);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extends: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist')));
app.use(fileUpload());
var cookieparser = require('cookie-parser');
app.use(cookieparser());


const TWO_HOURS = 1000 * 60 * 60 * 2;
const {
    NODE_ENV = "development",
        SEE_LIFETIME = TWO_HOURS,
        SESS_NAME = 'sid'


} = process.env
const IN_PROD = NODE_ENV === 'production';



app.use(session({
    name: SESS_NAME,
    resave: false,
    cookie: {
        maxAge: SEE_LIFETIME,
        sameSite: true,
        secure: IN_PROD,
    },
    secret: 'ssshhhhh',
    saveUninitialized: true,
    resave: true,
    secure: true
}));

var sess;

app.get('/', function(req, res) {
    sess = req.session;
    /*
     * Here we have assigned the 'session' to 'sess'.
     * Now we can create any number of session variables we want.
     * in PHP we do as $_SESSION['var name'].
     * Here we do like this.
     */

    sess.email; // equivalent to $_SESSION['email'] in PHP.
    // equivalent to $_SESSION['username'] in PHP.
    sess.password; // equivalent to $_SESSION['password'] in PHP.
    sess.image;
    sess.First_Name;
    sess.Last_Name;
    sess.phone;
    sess.address;
    sess.A_Id;
    sess.client;
    // equivalent to $_SESSION['password'] in PHP.
});

const goCardlessRoute = require('./config/PaymentController');
app.use(goCardlessRoute)
app.get('/client', function(req, res) {
        sess = req.session;
        /*
         * Here we have assigned the 'session' to 'sess'.
         * Now we can create any number of session variables we want.
         * in PHP we do as $_SESSION['var name'].
         * Here we do like this.
         * */

        sess.email; // equivalent to $_SESSION['email'] in PHP.
        // equivalent to $_SESSION['username'] in PHP.
        sess.password; // equivalent to $_SESSION['password'] in PHP.
        sess.image;
        sess.First_Name;
        sess.Last_Name;
        sess.phone;
        sess.address;
        sess.C_Id;
        sess.client;
        // equivalent to $_SESSION['password'] in PHP.
    })
    /*
    const gocardless = require("gocardless-nodejs");

    const constants = require("gocardless-nodejs/constants");

    const client = gocardless(
        // We recommend storing your access token in an environment
        // variable for security
        process.env.GoCardlessAccessToken,
        // Change this to constants.Environments.Live when you're ready to go live
        constants.Environments.Sandbox
    );

    client.customers.list()
        .then(function(listResponse) {
            /* here's your customer object 
            console.log("listResponse: ", listResponse);
            const customers = listResponse.customers;
            console.log("customers: ", customers);
        })
        .catch(function(error) {
            console.error('errorlist: ', error);
        });


    client.redirectFlows.create({
        description: "Cider Barrels",
        session_token: "dummy_session_token",
        success_redirect_url: urlDashBoard + "/client/gocardlessComple"
            // Optionally, prefill customer details on the payment page

    }).then(function(redirectFlow) {
        console.log("redirectFlowID->", redirectFlow.id);
        console.log("redirectFlowURl->", redirectFlow.redirect_url);

    }).catch(function(error) {
        console.error('errorredirect:', error);
    });

    // Hold on to this ID - you'll need it when you
    // "confirm" the redirect flow later







    app.get("/client/gocardlessComple", (req, res) => {
        var redirect_flow_id = req.query.redirect_flow_id;
        console.log("redirect_flow_id: ", redirect_flow_id);
        client.redirectFlows.complete(
            redirect_flow_id, {
                session_token: "dummy_session_token"
            }
        ).then(function(redirectFlow) {
            // Store the mandate ID against the customer's database record so you can charge
            // them in future
            console.log(`Mandate: ${redirectFlow.links.mandate}`);
            console.log(`Customer: ${redirectFlow.links.customer}`);

            // Display a confirmation page to the customer, telling them their Direct Debit has been
            // set up. You could build your own, or use ours, which shows all the relevant
            // information and is translated into all the languages we support.
            console.log(`Confirmation URL: ${redirectFlow.confirmation_url}`);

        }).catch(function(error) {
            console.error('errorgocardless: ', error);
        });




    });

    app.get("/client/createpayment", (req, res) => {
        console.log("client: ", client);
        client.payments.create({
                amount: 1000,
                currency: "EUR",
                links: {
                    mandate: "MD000E56X5AZGX"
                },
                metadata: {
                    invoice_number: "001"
                }
            },
            "random_payment_specific_string"
        ).then(function(payment) {

            // Keep hold of this payment ID - we'll use it in a minute
            // It should look like "PM000260X9VKF4"
            console.log("paymentID: ", payment.id);



        }).catch(function(error) {
            console.error('errorPaymentcreate: ', error);
            //res.status(400).send("errorPaymentcreate " + error);
        });
    })
    */




/* const paymentId = payment.id;
     client.payments.find(paymentId).then(function(payment) {

         console.log(`Amount: ${payment.amount}`);
     }).catch(function(error) {
         console.error('errorPayment: ', error);
     });*/










//mytoken//sandbox_YtKPdger6pcabB-d_5OdzIMzkZJ7Lko9e0F-jKA5

/*const redirectFlow = (async() => await client.redirectFlows.create({
    description: "Cider Barrels",
    session_token: "dummy_session_token",
    success_redirect_url: "https://developer.gocardless.com/example-redirect-uri/",
    // Optionally, prefill customer details on the payment page
    prefilled_customer: {
        given_name: "Tim",
        family_name: "Rogers",
        email: "tim@gocardless.com",
        address_line1: "338-346 Goswell Road",
        city: "London",
        postal_code: "EC1V 7LQ"
    }
}))().catch((error) => {
    //assert.isNotOk(error, 'Promise error');
    // done();
});*/

// Hold on to this ID - you'll need it when you
// "confirm" the redirect flow later
/*console.log("id: " + redirectFlow.id);
console.log("url: " + redirectFlow.redirect_url);*/
const {
    logPage,
    getDashboard,
    postlogPage,
    updateadmin,
    getAdminSetting,
    getPlombier,
    getÉlectricien,
    getservices,
    getSerrurier,
    getAllServices,
    ClientRegister,
    ClientRequste,
    getFirstClientPage,
    getClientLoginPage,
    getallClientRequest,
    updateClientStatus,
    deleteClient,
    AcceptClendSendmail,
    getsetPassword,
    setClientPassword,
    refuseClendSendmail,
    getPlombierData,
    getElectricienData,
    getSerrurierData,
    addServicetoClient,
    getClientProfileAdmin,
    getconfirm_profile,
    getServicesDetails,
    getverifiepage,
    confirmClientDataSendmail,
    refuseClientDataSendmail,
    deleteClientData,
    clientLogin,
    clientindex,
    clientregisterpage,
    updatestatusConfirmdata,
    clientregisterprofilepage,
    notPaidPage,
    PaidPage,
    invoicePage,
    canceledPage,
    getclientnotpaidservice,
    getclientpaidservice,
    getclientcancelservice,
    uploadinvoice,
    getservicescustomerdata,
    clientprofilePage,
    editeclientprofile,
    getTotalClient,
    getTotalcancel,
    getClientrequest,
    getTotalservices,
    getTotalpay,
    getTotalnonpay,
    getTotalservicesforclient,
    getTotalpayforclient,
    getTotalnonpayforclient,
    getTotalcancelforclient,
    getallClientdatabyId,
    paymentSuccPage,
    updateTaskStatus,
    getforgetpasswordadmin,
    addminforgetpasspage,
    adminforgetpassSendmail,
    upadeadminpassword,
    getforgetpasswordclient,
    Clientforgetpasspage,
    clientforgetpassSendmail,
    upadeclinetforgetpassword,
    getisclientdata,
    getpage404


} = require("./routes/Api");

app.get("/login", logPage);
app.post("/login", postlogPage);
app.get("/dashboard", getDashboard);
app.get("/getpage404", getpage404);
app.get("/logout", (req, res) => {
    // res.send("done destroy session :"+req.session)
    if (req.session.A_Id) {
        req.session.destroy((err) => {
            if (err) {
                console.log("err", err);
                return res.redirect("/dashboard");
            }
            console.log("loged out !");
            res.clearCookie();
            res.redirect("/login");
            res.end();
        });
    } else {

        res.send("no admin in this session");
    }


});
app.get("/client/logout", (req, res) => {
    // res.send("done destroy session :"+req.session)
    if (req.session.C_Id) {
        req.session.destroy((err) => {
            if (err) {
                return res.redirect("/dashboard");
            }
            console.log("loged out !")
            res.clearCookie();
            res.redirect("/client/ClientFirstrequestpage")
            res.end()
        });
    }


});
app.put("/updateadmin/:id", updateadmin);
app.get("/adminProfile", getAdminSetting);
app.get("/getPlombier", getPlombier);
app.get("/getElectricien", getÉlectricien);
app.get("/getservices", getservices);
app.get("/getSerrurier", getSerrurier);


//get data form database in services page
app.get("/getAllServices", getAllServices);

//Client 
app.get("/client/ClientFirstrequestpage", getFirstClientPage);
app.get("/client/getClientLoginPage", getClientLoginPage);
app.post("/client/clientLogin", clientLogin);
app.get("/client/clientindex", clientindex);
app.get("/client/notPaidPage", notPaidPage);
app.get("/client/invoicePage", invoicePage);
app.get("/client/canceledPage", canceledPage);
app.get("/client/paymentSuccPage", paymentSuccPage);
app.get("/client/getallClientdatabyId", getallClientdatabyId);
app.put("/client/updateTaskStatus/:id", updateTaskStatus);

app.get("/client/editclientprofilePage", clientprofilePage);
app.get("/client/PaidPage", PaidPage);
app.get("/client/clientregisterpage", clientregisterpage);
app.get("/client/getclientnotpaidservice", getclientnotpaidservice);
app.get("/client/getclientpaidservice", getclientpaidservice);
app.get("/client/getclientcancelservice", getclientcancelservice);
app.get("/client/clientregisterprofilepage", clientregisterprofilepage);
app.get("/client/getservicescustomerdata/:id", getservicescustomerdata);
app.post("/client/SaveRequestClient", ClientRequste);
app.post("/client/SaveAllClientData/:C_id", ClientRegister);
app.put("/client/uploadinvoice", uploadinvoice);
app.put("/client/editeclientprofile", editeclientprofile);
app.get("/getAllRequest", getallClientRequest);
app.put("/updateClientStatus", updateClientStatus);

app.delete("/deleteClient/:id", deleteClient);
app.post("/sendmailtoClient", AcceptClendSendmail);
app.post("/refuseClendSendmail", refuseClendSendmail);
app.get("/client/getsetPassword/:id", getsetPassword);
app.post("/client/setClientPassword", setClientPassword);
app.get("/getPlombierData", getPlombierData);
app.get("/getElectricienData", getElectricienData);
app.get("/getSerrurierData", getSerrurierData);
app.post("/addService", addServicetoClient);

app.get("/getClientProfileAdmin/:id", getClientProfileAdmin);
app.get("/getTotalClient", getTotalClient);
app.get("/getTotalcancel", getTotalcancel);
app.get("/getTotalservices", getTotalservices);
app.get("/getTotalcancelforclient/:id", getTotalcancelforclient);
app.get("/getTotalpay", getTotalpay);
app.get("/getTotalnonpayforclient/:id", getTotalnonpayforclient);
app.get("/getTotalservicesforclient/:id", getTotalservicesforclient);
app.get("/getTotalpayforclient/:id", getTotalpayforclient);
app.get("/getTotalnonpay", getTotalnonpay);
app.get("/getClientrequest", getClientrequest);
app.get("/getconfirm_profile/:id", getconfirm_profile);
app.get("/getServicesDetails/:id", getServicesDetails);
app.get("/client/getverifiepage", getverifiepage);
app.post("/confirmClientDataSendmail", confirmClientDataSendmail);
app.post("/refuseClientDataSendmail", refuseClientDataSendmail);
app.delete("/deleteClientData/:id", deleteClientData);
app.put("/updatestatusConfirmdata", updatestatusConfirmdata);
app.get("/getforgetpasswordadmin", getforgetpasswordadmin);
app.get("/addminforgetpasspage/:email", addminforgetpasspage);
app.post("/adminforgetpassSendmail", adminforgetpassSendmail);
app.post("/upadeadminpassword", upadeadminpassword);
app.post("/client/upadeclinetforgetpassword", upadeclinetforgetpassword);
app.post("/client/clientforgetpassSendmail", clientforgetpassSendmail);
app.get("/client/getforgetpasswordclient", getforgetpasswordclient);
app.get("/client/Clientforgetpasspage/:email", Clientforgetpasspage);
app.get("/getisclientdata/:id", getisclientdata);


app.listen(port, () => {

    console.log(`Services App server runing in port:${port}`);
})