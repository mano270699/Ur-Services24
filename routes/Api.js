config = require('../config');
const { QueryTypes } = require('sequelize');
const sequelize = require('../config/database');
const Sequelize = require('sequelize');
const op = Sequelize.Op;
const urlDashBoard = "https://app.ur-services24.com";
const Admin = require("../model/admin");
const Client = require("../model/Client");
const fs = require("fs");
var path = require('path');
var mime = require('mime');
const ClientData = require('../model/Client_Data');
const Service = require('../model/services');
transporter = require('../config/sendMialer');


module.exports = {

    logPage: (req, res) => {
        var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + port;

        if (!req.session.email) {

            console.log(req.session);
            console.log(req.session.email);

            res.render("login.ejs", {

                urlMain: url
            });


        } else {
            res.writeHead(301, { Location: `${url}/dashboard` });
            res.end();
        }




    },
    getDashboard: (req, res) => {
        var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + port;


        if (req.session.A_Id) {

            console.log(req.session);
            console.log(req.session.email);
            var name = req.session.First_Name + " " + req.session.Last_Name;
            res.render("dashboard.ejs", {
                name: name,
                image: req.session.image,
                urlMain: url
            });


        } else {
            res.writeHead(301, { Location: `${url}/login` });
            res.end();
        }




    },
    postlogPage: (req, res) => {
        var sess;
        sess = req.session;
        Admin.findOne({
            where: {
                email: req.body.email

            }
        }).then((user) => {

            if (!user) {

                return res.status(400).send({ msg: "Admin not found ! " });

            } else {
                if (user.password == req.body.password) {
                    sess.email = user.email;
                    sess.First_Name = user.First_Name;
                    sess.Last_Name = user.Last_Name;
                    sess.password = user.password;
                    sess.image = user.image;
                    sess.phone = user.phone;
                    sess.address = user.address;
                    sess.A_Id = user.A_Id;


                    // alert(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
                    return res.status(200).send({ msg: `/dashboard` });
                    // res.writeHead(301, { Location: `${urlDashBoard}/dashboard` });
                    //res.end();
                } else {
                    res.status(400).send({ msg: "email ou mot de passe incorrect!" });


                }

            }

        })

    },
    updateadmin: (req, res) => {


        if (!req.files) {

            let
                First_Name = req.body.First_Name,
                Last_Name = req.body.Last_Name,
                A_Id = req.params.id,
                email = req.body.email,
                password = req.body.password,
                phone = req.body.phone,
                address = req.body.address;

            var sess;
            sess = req.session;
            sess.email = email;
            sess.First_Name = First_Name;
            sess.Last_Name = Last_Name;
            sess.password = password;
            sess.phone = phone;
            sess.address = address;



            Admin.update({ First_Name: First_Name, Last_Name: Last_Name, email: email, password: password, phone: phone, address: address }, {
                where: {
                    A_Id: A_Id
                }
            }).then((result) => {
                res.status(200).send({ msg: +"Your data Saved" });
            });

        } else {
            let
                First_Name = req.body.First_Name,
                Last_Name = req.body.Last_Name,
                fileupload = req.files.image,
                A_Id = req.params.id,
                email = req.body.email,
                password = req.body.password,
                phone = req.body.phone,
                address = req.body.address;

            var fileEx = fileupload.mimetype.split('/')[1];
            var sess;
            sess = req.session;
            sess.email = email;
            sess.First_Name = First_Name;
            sess.Last_Name = Last_Name;
            sess.password = password;
            sess.phone = phone;
            sess.address = address;
            sess.image = A_Id + "." + fileEx;



            Admin.update({ First_Name: First_Name, Last_Name: Last_Name, email: email, password: password, phone: phone, address: address }, {
                where: {
                    A_Id: A_Id
                }
            }).then((result) => {
                fileupload.mv('dist/img/admin/' + A_Id + "." + fileEx, (err) => {
                    if (err) {
                        console.log(err);
                        return res.status(400).send({ msg: err + " pour télécharger l'image" });
                    }


                });

                let values = { image: A_Id + "." + fileEx }
                Admin.update(values, { where: { A_Id: A_Id } }).then(updatedRecord => {
                    console.log(`updated record ${JSON.stringify(updatedRecord, null, 2)}`)
                    return res.status(200).send({ msg: "données sauvegardées true" });
                })


            })
        }




    },
    getAdminSetting: (req, res) => {
        var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + port;


        if (req.session.A_Id) {

            console.log(req.session);
            console.log(req.session.email);
            var name = req.session.First_Name + " " + req.session.Last_Name;
            res.render("Admin_profile_Setting.ejs", {
                name: name,
                First_Name: req.session.First_Name,
                Last_Name: req.session.Last_Name,
                phone: req.session.phone,
                address: req.session.address,
                password: req.session.password,
                image: req.session.image,
                email: req.session.email,
                A_Id: req.session.A_Id,
                urlMain: url
            });
            console.log("Done!")

        } else {
            console.log("Not Done!")
            res.writeHead(301, { Location: `${url}/login` });
            res.end();
        }




    },
    getPlombier: (req, res) => {
        var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + port;


        if (req.session.A_Id) {

            console.log(req.session);
            console.log(req.session.email);
            var name = req.session.First_Name + " " + req.session.Last_Name;
            res.render("Plombier.ejs", {
                name: name,
                image: req.session.image,
                urlMain: url
            });


        } else {
            res.writeHead(301, { Location: `${url}/login` });
            res.end();
        }




    },
    getÉlectricien: (req, res) => {
        var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + port;


        if (req.session.A_Id) {

            console.log(req.session);
            console.log(req.session.email);
            var name = req.session.First_Name + " " + req.session.Last_Name;
            res.render("Électricien.ejs", {
                name: name,
                image: req.session.image,
                urlMain: url
            });


        } else {
            res.writeHead(301, { Location: `${url}/login` });
            res.end();
        }




    },
    getservices: (req, res) => {
        var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + port;


        if (req.session.A_Id) {

            console.log(req.session);
            console.log(req.session.email);
            var name = req.session.First_Name + " " + req.session.Last_Name;
            res.render("services.ejs", {
                name: name,
                image: req.session.image,
                urlMain: url
            });


        } else {
            res.writeHead(301, { Location: `${url}/login` });
            res.end();
        }




    },
    getSerrurier: (req, res) => {
        var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + port;


        if (req.session.A_Id) {

            console.log(req.session);
            console.log(req.session.email);
            var name = req.session.First_Name + " " + req.session.Last_Name;
            res.render("Serrurier.ejs", {
                name: name,
                image: req.session.image,
                urlMain: url
            });


        } else {
            res.writeHead(301, { Location: `${url}/login` });
            res.end();
        }




    },
    getAllServices: (req, res) => {
        sequelize.query("SELECT * FROM `task` ", { type: sequelize.QueryTypes.SELECT })
            .then(function(result) {
                return res.status(200).send(result);

            })
    },

    ClientRequste: (req, res) => {
        let
            email = req.body.email,
            phone = req.body.phone,
            Profession = req.body.category,
            address = req.body.address,
            conditions = req.body.conditions;


        for (var Skill in req.body.tipo_lav) {
            if (req.body.tipo_lav) {
                items = req.body.tipo_lav;
                Skill = JSON.stringify(items).replace(/]|[[]|"/g, '', )
                    // console.log(items);
            }
        }


        const newReqClient = new Client({
            Profession: Profession,
            email: email,
            phone: phone,
            address: address,
            conditions: conditions,
            status: "Nouvelle_cliente",
            Skill: Skill
        });

        Client.findOne({ where: { email: email } })
            .then(function(Client) {
                console.log(Client)

                if (Client != null) {
                    return res.status(400).send({ error: true, msg: "Votre email est déjà pris, vous ne pouvez pas vous inscrire :(" })
                } else {

                    newReqClient.save().then((newClient) => {

                        return res.status(200).send({ error: false, msg: "Vos informations envoyées avec succès nous vous enverrons un e-mail dans les 24 h pour terminer votre inscription" })

                    }).catch(err => {
                        console.log("erros: ", err);
                    });


                }
            }).catch(err => {
                console.log("erros: ", err);
            });


    },
    ClientRegister: (req, res) => {
        if (!req.files)
            return res.status(400).send({ msg: "exiger que l'image ne soit pas téléchargée " });


        let errors = [];
        if (errors.length > 0) {
            res.status(400).send({ msg: errors });

        } else {

            let
                C_id = req.params.C_id,
                FirstName = req.body.FirstName,
                LastName = req.body.LastName,
                gender = req.body.gender,
                Country = req.body.Country,
                ville = req.body.ville,
                Province = req.body.Province,
                BDate = req.body.BDate,
                Rue = req.body.Rue,
                num_rue = req.body.num_rue,
                Company_Name = req.body.Company_Name,
                Legal_Form = req.body.Legal_Form,
                Social_Security_num = req.body.Social_Security_num,
                num_TVA = req.body.num_TVA,
                address_mail = req.body.address_mail,
                Identify_doc = req.body.Identify_doc,
                num_Identify_doc = req.body.num_Identify_doc,
                Identify_Doc_date_ex = req.body.Identify_Doc_date_ex,
                fileupload_Front_Doc = req.files.Front_Doc,
                fileupload_Retro_Doc = req.files.Retro_Doc,
                fileupload_Kbis_Doc = req.files.Kbis_Doc,
                fileupload_image = req.files.image,
                Kbis_num = req.body.Kbis_num,
                fileupload_Assurance_Doc = req.files.Assurance_Doc,
                Assurance_num = req.body.Assurance_num,
                Assurance_Date_ex = req.body.Assurance_Date_ex,
                fileupload_Licence_Doc = req.files.Licence_Doc,
                Licence_num = req.body.Licence_num;



            //console.log(fileupload);
            var Front_Doc = fileupload_Front_Doc.name;
            var Retro_Doc = fileupload_Retro_Doc.name;
            var Kbis_Doc = fileupload_Kbis_Doc.name;
            var Assurance_Doc = fileupload_Assurance_Doc.name;
            var Licence_Doc = fileupload_Licence_Doc.name;
            var image = fileupload_image.name;

            console.log("Front_Doc: " + Front_Doc);
            console.log("Retro_Doc: " + Retro_Doc);



            var Front_Doc_fileEx = fileupload_Front_Doc.mimetype.split('/')[1];
            var Retro_Doc_fileEx = fileupload_Retro_Doc.mimetype.split('/')[1];
            var Kbis_Doc_fileEx = fileupload_Kbis_Doc.mimetype.split('/')[1];
            var Assurance_Doc_fileEx = fileupload_Assurance_Doc.mimetype.split('/')[1];
            var Licence_Doc_fileEx = fileupload_Licence_Doc.mimetype.split('/')[1];
            // console.log(fileupload);
            //create product;


            ClientData.findAll({ where: { C_id: C_id } })
                .then(function(Client) {
                    console.log("isClient" + Client == null)

                    if (Client != "") {
                        return res.status(200).send({ error: false, msg: "Vous êtes déjà client, vous ne pouvez pas ajouter vos données deux fois" })
                    } else {
                        const newClient = new ClientData({
                            C_id: C_id,
                            FirstName: FirstName,
                            LastName: LastName,
                            gender: gender,
                            Country: Country,
                            ville: ville,
                            Province: Province,
                            BDate: BDate,
                            Rue: Rue,
                            num_rue: num_rue,
                            Company_Name: Company_Name,
                            Legal_Form: Legal_Form,
                            Social_Security_num: Social_Security_num,
                            num_TVA: num_TVA,
                            address_mail: address_mail,
                            Identify_doc: Identify_doc,
                            num_Identify_doc: num_Identify_doc,
                            Identify_Doc_date_ex: Identify_Doc_date_ex,
                            Kbis_num: Kbis_num,
                            Assurance_num: Assurance_num,
                            Assurance_Date_ex: Assurance_Date_ex,
                            Licence_num: Licence_num,
                            Front_Doc: Front_Doc,
                            Retro_Doc: Retro_Doc,
                            Kbis_Doc: Kbis_Doc,
                            Assurance_Doc: Assurance_Doc,
                            Licence_Doc: Licence_Doc,
                            image: image


                        });

                        newClient.save()

                        .then((newClient) => {
                            // console.log("Client Data Saved  " + JSON.stringify(newCategory));

                            fs.mkdir("dist/img/Clients_Data/" + newClient.FirstName + "_" + LastName + C_id + "/", { recursive: true }, function(err) {
                                if (err) {
                                    console.log(err)
                                } else {
                                    console.log("New directory successfully created.")
                                }
                            })



                            fileupload_Front_Doc.mv('dist/img/Clients_Data/' + newClient.FirstName + "_" + LastName + C_id + "/" + newClient.C_id + "_" + newClient.Front_Doc, (err) => {
                                if (err)
                                    return res.status(400).send({ msg: err + "exiger que l'image ne soit pas téléchargée " });

                            });
                            fileupload_Retro_Doc.mv('dist/img/Clients_Data/' + newClient.FirstName + "_" + LastName + C_id + "/" + newClient.C_id + "_" + newClient.Retro_Doc, (err) => {
                                if (err)
                                    return res.status(400).send({ msg: err + "exiger que l'image ne soit pas téléchargée " });

                            });
                            fileupload_Kbis_Doc.mv('dist/img/Clients_Data/' + newClient.FirstName + "_" + LastName + C_id + "/" + newClient.C_id + "_" + newClient.Kbis_Doc, (err) => {
                                if (err)
                                    return res.status(400).send({ msg: err + "exiger que l'image ne soit pas téléchargée " });

                            });
                            fileupload_Assurance_Doc.mv('dist/img/Clients_Data/' + newClient.FirstName + "_" + LastName + C_id + "/" + newClient.C_id + "_" + newClient.Assurance_Doc, (err) => {
                                if (err)
                                    return res.status(400).send({ msg: err + "exiger que l'image ne soit pas téléchargée " });

                            });
                            fileupload_Licence_Doc.mv('dist/img/Clients_Data/' + newClient.FirstName + "_" + LastName + C_id + "/" + newClient.C_id + "_" + newClient.Licence_Doc, (err) => {
                                if (err)
                                    return res.status(400).send({ msg: err + "exiger que l'image ne soit pas téléchargée " });

                            });
                            fileupload_image.mv('dist/img/Clients_Data/' + newClient.FirstName + "_" + LastName + C_id + "/" + newClient.C_id + "_" + newClient.image, (err) => {
                                if (err)
                                    return res.status(400).send({ msg: err + "exiger que l'image ne soit pas téléchargée " });

                            });




                            let values = {
                                Front_Doc: newClient.C_id + "_" + newClient.Licence_Doc,
                                Retro_Doc: newClient.C_id + "_" + newClient.Retro_Doc,
                                Kbis_Doc: newClient.C_id + "_" + newClient.Kbis_Doc,
                                Assurance_Doc: newClient.C_id + "_" + newClient.Retro_Doc,
                                Licence_Doc: newClient.C_id + "_" + newClient.Licence_Doc,
                                image: newClient.C_id + "_" + newClient.image
                            }
                            newClient.update(values).then(updatedOne => {
                                console.log(`updated record ${JSON.stringify(updatedOne, null, 2)}`)
                                return res.json({ msg: "Client créé avec succès :)  " }, 200);
                            })



                        }).catch((err) => {
                            console.log(err)

                        });

                    }


                });

        }


    },
    getFirstClientPage: (req, res) => {
        var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + port;

        console.log(req.session);
        console.log(req.session.email);
        res.render("first.ejs", {

            urlMain: url
        });


    },
    getallClientRequest: (req, res) => {

        Client.findAll({
                order: [
                    ['C_id', 'DESC'],

                ]
            })
            .then(function(result) {
                console.log(result)
                return res.status(200).send(result)


            });
    },
    updateClientStatus: (req, res) => {

        Client.update({ status: req.body.status }, {
            where: {
                C_id: req.body.C_id
            }
        }).then((result) => {
            return res.status(200).send(result);
        });

    },
    deleteClient: (req, res) => {
        Client.destroy({
            where: {
                C_id: req.params.id //this will be your id that you want to delete
            }
        }).then(function(rowDeleted) { // rowDeleted will return number of rows deleted
            if (rowDeleted === 1) {
                console.log('Deleted successfully');
                return res.status(200).send("Supprimé avec succès");
            }
        }, function(err) {
            return res.status(400).send("Error" + err);
        });

    },
    AcceptClendSendmail: (req, res) => {
        let email = req.body.email,
            C_id = req.body.id;

        Client.findAll({
            where: {
                email: email
            },
            attributes: ['email', 'C_id'],
        }).then(function(result) {
            //res.status(200).json(result);
            if (result.length == 0)
                return res.status(403).send({ error: true, msg: "Compte non trouvé" });
            else {
                var link_setPassword = urlDashBoard + '/client/getsetPassword/' + C_id;

                var templeteHtml = `<html style="width:100%;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0;">

                <head>
                    <meta charset="UTF-8">
                    <meta content="width=device-width, initial-scale=1" name="viewport">
                    <meta name="x-apple-disable-message-reformatting">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta content="telephone=no" name="format-detection">
                    <title>New Template</title>
                    <!--[if (mso 16)]><style type="text/css"> a {text-decoration: none;} </style><![endif]-->
                    <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
                    <style type="text/css">
                        @media only screen and (max-width:600px) {
                            p,
                            ul li,
                            ol li,
                            a {
                                font-size: 16px!important;
                                line-height: 150%!important
                            }
                            h1 {
                                font-size: 20px!important;
                                text-align: center;
                                line-height: 120%!important
                            }
                            h2 {
                                font-size: 16px!important;
                                text-align: left;
                                line-height: 120%!important
                            }
                            h3 {
                                font-size: 20px!important;
                                text-align: center;
                                line-height: 120%!important
                            }
                            h1 a {
                                font-size: 20px!important
                            }
                            h2 a {
                                font-size: 16px!important;
                                text-align: left
                            }
                            h3 a {
                                font-size: 20px!important
                            }
                            .es-menu td a {
                                font-size: 14px!important
                            }
                            .es-header-body p,
                            .es-header-body ul li,
                            .es-header-body ol li,
                            .es-header-body a {
                                font-size: 10px!important
                            }
                            .es-footer-body p,
                            .es-footer-body ul li,
                            .es-footer-body ol li,
                            .es-footer-body a {
                                font-size: 12px!important
                            }
                            .es-infoblock p,
                            .es-infoblock ul li,
                            .es-infoblock ol li,
                            .es-infoblock a {
                                font-size: 12px!important
                            }
                            *[class="gmail-fix"] {
                                display: none!important
                            }
                            .es-m-txt-c,
                            .es-m-txt-c h1,
                            .es-m-txt-c h2,
                            .es-m-txt-c h3 {
                                text-align: center!important
                            }
                            .es-m-txt-r,
                            .es-m-txt-r h1,
                            .es-m-txt-r h2,
                            .es-m-txt-r h3 {
                                text-align: right!important
                            }
                            .es-m-txt-l,
                            .es-m-txt-l h1,
                            .es-m-txt-l h2,
                            .es-m-txt-l h3 {
                                text-align: left!important
                            }
                            .es-m-txt-r img,
                            .es-m-txt-c img,
                            .es-m-txt-l img {
                                display: inline!important
                            }
                            .es-button-border {
                                display: block!important
                            }
                            a.es-button {
                                font-size: 14px!important;
                                display: block!important;
                                border-left-width: 0px!important;
                                border-right-width: 0px!important
                            }
                            .es-btn-fw {
                                border-width: 10px 0px!important;
                                text-align: center!important
                            }
                            .es-adaptive table,
                            .es-btn-fw,
                            .es-btn-fw-brdr,
                            .es-left,
                            .es-right {
                                width: 100%!important
                            }
                            .es-content table,
                            .es-header table,
                            .es-footer table,
                            .es-content,
                            .es-footer,
                            .es-header {
                                width: 100%!important;
                                max-width: 600px!important
                            }
                            .es-adapt-td {
                                display: block!important;
                                width: 100%!important
                            }
                            .adapt-img {
                                width: 100%!important;
                                height: auto!important
                            }
                            .es-m-p0 {
                                padding: 0px!important
                            }
                            .es-m-p0r {
                                padding-right: 0px!important
                            }
                            .es-m-p0l {
                                padding-left: 0px!important
                            }
                            .es-m-p0t {
                                padding-top: 0px!important
                            }
                            .es-m-p0b {
                                padding-bottom: 0!important
                            }
                            .es-m-p20b {
                                padding-bottom: 20px!important
                            }
                            .es-mobile-hidden,
                            .es-hidden {
                                display: none!important
                            }
                            .es-desk-hidden {
                                display: table-row!important;
                                width: auto!important;
                                overflow: visible!important;
                                float: none!important;
                                max-height: inherit!important;
                                line-height: inherit!important
                            }
                            .es-desk-menu-hidden {
                                display: table-cell!important
                            }
                            table.es-table-not-adapt,
                            .esd-block-html table {
                                width: auto!important
                            }
                            table.es-social {
                                display: inline-block!important
                            }
                            table.es-social td {
                                display: inline-block!important
                            }
                        }
                        
                        #outlook a {
                            padding: 0;
                        }
                        
                        .ExternalClass {
                            width: 100%;
                        }
                        
                        .ExternalClass,
                        .ExternalClass p,
                        .ExternalClass span,
                        .ExternalClass font,
                        .ExternalClass td,
                        .ExternalClass div {
                            line-height: 100%;
                        }
                        
                        .es-button {
                            mso-style-priority: 100!important;
                            text-decoration: none!important;
                        }
                        
                        a[x-apple-data-detectors] {
                            color: inherit!important;
                            text-decoration: none!important;
                            font-size: inherit!important;
                            font-family: inherit!important;
                            font-weight: inherit!important;
                            line-height: inherit!important;
                        }
                        
                        .es-desk-hidden {
                            display: none;
                            float: left;
                            overflow: hidden;
                            width: 0;
                            max-height: 0;
                            line-height: 0;
                            mso-hide: all;
                        }
                        
                        .es-button-border:hover a.es-button {
                            background: #ffffff!important;
                            border-color: #ffffff!important;
                        }
                        
                        .es-button-border:hover {
                            background: #ffffff!important;
                            border-style: solid solid solid solid!important;
                            border-color: #3d5ca3 #3d5ca3 #3d5ca3 #3d5ca3!important;
                        }
                    </style>
                </head>
                
                <body style="width:100%;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0;">
                    <div class="es-wrapper-color" style="background-color:#FAFAFA;">
                        <!--[if gte mso 9]><v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t"> <v:fill type="tile" color="#fafafa"></v:fill> </v:background><![endif]-->
                        <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;">
                            <tbody>
                                <tr style="border-collapse:collapse;">
                                    <td valign="top" style="padding:0;Margin:0;">
                                        <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;">
                                            <tbody>
                                                <tr style="border-collapse:collapse;">
                                                    <td class="es-info-area" style="padding:0;Margin:0;background-color:#FAFAFA;" bgcolor="#fafafa" align="center">
                                                        <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FAFAFA;" width="600" cellspacing="0" cellpadding="0" bgcolor="#fafafa" align="center">
                                                            <tbody>
                                                                <tr style="border-collapse:collapse;">
                                                                    <td style="Margin:0;padding-bottom:5px;padding-top:20px;padding-left:20px;padding-right:20px;background-position:left top;" align="left">
                                                                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                                            <tbody>
                                                                                <tr style="border-collapse:collapse;">
                                                                                    <td width="560" valign="top" align="center" style="padding:0;Margin:0;">
                                                                                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                                                            <tbody>
                                                                                                <tr style="border-collapse:collapse;">
                                                                                                    <td class="es-infoblock" align="center" style="padding:0;Margin:0;padding-bottom:5px;line-height:14px;font-size:12px;color:#CCCCCC;"></td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;">
                                            <tbody>
                                                <tr style="border-collapse:collapse;">
                                                    <td style="padding:0;Margin:0;background-color:#FAFAFA;" bgcolor="#fafafa" align="center">
                                                        <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                                                            <tbody>
                                                                <tr style="border-collapse:collapse;">
                                                                    <td style="Margin:0;padding-top:10px;padding-left:20px;padding-right:20px;padding-bottom:30px;border-radius:10px 10px 0px 0px;background-color: #0B5394;background-position:left top;" bgcolor="transparent" align="left">
                                                                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                                            <tbody>
                                                                                <tr style="border-collapse:collapse;">
                                                                                    <td width="560" valign="top" align="center" style="padding:0;Margin:0;">
                                                                                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                                                            <tbody>
                                                                                                <tr style="border-collapse:collapse;"> </tr>
                                                                                                <tr style="border-collapse:collapse;">
                                                                                                    <td align="center" style="padding:0;Margin:0;padding-top:10px;">
                                                                                                        <h1 style="margin:0;
                font-weight: 300;
                line-height: 1.2;
                font-size: 3rem;
                font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji';
                font-style:normal;
                color:#FFFFFF;
                ">Ur-Services24</h1>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr style="border-collapse:collapse;"> </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                <tr style="border-collapse:collapse;">
                                                                    <td style="padding:0;Margin:0;padding-left:20px;padding-right:20px;padding-top:40px;background-color:transparent;background-position:left top;" bgcolor="transparent" align="left">
                                                                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                                            <tbody>
                                                                                <tr style="border-collapse:collapse;">
                                                                                    <td width="560" valign="top" align="center" style="padding:0;Margin:0;">
                                                                                        <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-position:left top;" width="100%" cellspacing="0" cellpadding="0">
                                                                                            <tbody>
                                                                                                <tr style="border-collapse:collapse;">
                                                                                                    <td align="center" style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px;"><img src="https://qbsgq.stripocdn.email/content/guids/CABINET_905af03e8709229f1b10ad7414dc1531/images/23891556799905703.png" alt="" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;"
                                                                                                            width="160" height="189.92"></td>
                                                                                                </tr>
                                                                                                <tr style="border-collapse:collapse;">
                                                                                                    <td align="center" style="padding:0;Margin:0;padding-top:15px;padding-bottom:15px;">
                                                                                                        <h1 style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:20px;font-style:normal;font-weight:normal;color:#333333;"><strong>Définir votre mot de passe</strong></h1>
                
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr style="border-collapse:collapse;">
                                                                                                    <td align="center" style="padding:0;Margin:0;padding-left:40px;padding-right:40px;">
                                                                                                        <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:24px;color:#666666;">Cher,&nbsp;` + email + `</p>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr style="border-collapse:collapse;">
                                                                                                    <td align="center" style="padding:0;Margin:0;padding-right:35px;padding-left:40px;">
                                                                                                        <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:24px;color:#666666;">Il y a eu une demande pour rejoindre Ur-Services24 en tant que client</p>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr style="border-collapse:collapse;">
                                                                                                    <td align="center" style="padding:0;Margin:0;padding-top:25px;padding-left:40px;padding-right:40px;">
                                                                                                        <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:24px;color:#666666;">Si vous n'avez pas fait cette demande, ignorez simplement cet e-mail. Sinon, veuillez cliquer sur le bouton ci-dessous pour définir votre mot de passe</p>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr style="border-collapse:collapse;">
                                                                                                    <td align="center" style="Margin:0;padding-left:10px;padding-right:10px;padding-top:40px;padding-bottom:40px;"><span class="es-button-border" style="border-style:solid;border-color:#3D5CA3;background:#FFFFFF;border-width:2px;display:inline-block;border-radius:10px;width:auto;"><a href="` + link_setPassword + `" class="es-button" target="_blank" style="mso-style-priority:100
                    !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;color:#3D5CA3;border-style:solid;border-color:#FFFFFF;border-width:15px 20px 15px 20px;display:inline-block;background:#FFFFFF;border-radius:10px;font-weight:bold;font-style:normal;line-height:17px;width:auto;text-align:center;">RÉGLER LE MOT DE PASSE</a></span></td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </body>
                
                </html>`;

                var mailOptions = {
                    from: 'Ahmedsendmail99@gmail.com',
                    to: email,
                    subject: 'Services System',
                    html: templeteHtml
                }

            }

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log('error sent: ' + error);
                    return res.send({ error: true, msg: error });
                } else {
                    console.log('Email sent: ' + info.response);
                    res.status(200).send({ msg: "courrier envoyé à: " + email });
                }
            });








        })

    },
    getsetPassword: (req, res) => {
        var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + port;

        var c_id = req.params.id;

        res.render("set_password.ejs", {
            c_id: c_id,
            urlMain: url
        });


    },
    setClientPassword: (req, res) => {
        let password = req.body.password,
            confirmpassword = req.body.confirm,
            C_id = req.body.id;

        if (password == confirmpassword) {
            Client.update({ password: password }, { where: { C_id: C_id } })
                .then(result => {
                    return res.status(200).send({ error: false, msg: "mot de passe mis à jour, vous pouvez vous connecter maintenant pour terminer votre inscription" });
                })
                .catch(err => {
                    return res.status(400).send({ error: true, msg: err });
                })
        } else {
            return res.status(400).send({ error: true, msg: "Le mot de passe ne correspond pas" });

        }



    },
    refuseClendSendmail: (req, res) => {
        var email = req.body.email;

        Client.findAll({
            where: {
                email: email
            },
            attributes: ['email'],
        }).then(function(result) {
            //res.status(200).json(result);
            if (result.length == 0)
                return res.status(403).send({ error: true, msg: "Aucun compte trouvé" });
            else {
                var link_setregister = urlDashBoard + '/client/ClientFirstrequestpage';

                var templeteHtml = `<html style="width:100%;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0;">

                <head>
                    <meta charset="UTF-8">
                    <meta content="width=device-width, initial-scale=1" name="viewport">
                    <meta name="x-apple-disable-message-reformatting">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta content="telephone=no" name="format-detection">
                    <title>New Template</title>
                    <!--[if (mso 16)]><style type="text/css"> a {text-decoration: none;} </style><![endif]-->
                    <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
                    <style type="text/css">
                        @media only screen and (max-width:600px) {
                            p,
                            ul li,
                            ol li,
                            a {
                                font-size: 16px!important;
                                line-height: 150%!important
                            }
                            h1 {
                                font-size: 20px!important;
                                text-align: center;
                                line-height: 120%!important
                            }
                            h2 {
                                font-size: 16px!important;
                                text-align: left;
                                line-height: 120%!important
                            }
                            h3 {
                                font-size: 20px!important;
                                text-align: center;
                                line-height: 120%!important
                            }
                            h1 a {
                                font-size: 20px!important
                            }
                            h2 a {
                                font-size: 16px!important;
                                text-align: left
                            }
                            h3 a {
                                font-size: 20px!important
                            }
                            .es-menu td a {
                                font-size: 14px!important
                            }
                            .es-header-body p,
                            .es-header-body ul li,
                            .es-header-body ol li,
                            .es-header-body a {
                                font-size: 10px!important
                            }
                            .es-footer-body p,
                            .es-footer-body ul li,
                            .es-footer-body ol li,
                            .es-footer-body a {
                                font-size: 12px!important
                            }
                            .es-infoblock p,
                            .es-infoblock ul li,
                            .es-infoblock ol li,
                            .es-infoblock a {
                                font-size: 12px!important
                            }
                            *[class="gmail-fix"] {
                                display: none!important
                            }
                            .es-m-txt-c,
                            .es-m-txt-c h1,
                            .es-m-txt-c h2,
                            .es-m-txt-c h3 {
                                text-align: center!important
                            }
                            .es-m-txt-r,
                            .es-m-txt-r h1,
                            .es-m-txt-r h2,
                            .es-m-txt-r h3 {
                                text-align: right!important
                            }
                            .es-m-txt-l,
                            .es-m-txt-l h1,
                            .es-m-txt-l h2,
                            .es-m-txt-l h3 {
                                text-align: left!important
                            }
                            .es-m-txt-r img,
                            .es-m-txt-c img,
                            .es-m-txt-l img {
                                display: inline!important
                            }
                            .es-button-border {
                                display: block!important
                            }
                            a.es-button {
                                font-size: 14px!important;
                                display: block!important;
                                border-left-width: 0px!important;
                                border-right-width: 0px!important
                            }
                            .es-btn-fw {
                                border-width: 10px 0px!important;
                                text-align: center!important
                            }
                            .es-adaptive table,
                            .es-btn-fw,
                            .es-btn-fw-brdr,
                            .es-left,
                            .es-right {
                                width: 100%!important
                            }
                            .es-content table,
                            .es-header table,
                            .es-footer table,
                            .es-content,
                            .es-footer,
                            .es-header {
                                width: 100%!important;
                                max-width: 600px!important
                            }
                            .es-adapt-td {
                                display: block!important;
                                width: 100%!important
                            }
                            .adapt-img {
                                width: 100%!important;
                                height: auto!important
                            }
                            .es-m-p0 {
                                padding: 0px!important
                            }
                            .es-m-p0r {
                                padding-right: 0px!important
                            }
                            .es-m-p0l {
                                padding-left: 0px!important
                            }
                            .es-m-p0t {
                                padding-top: 0px!important
                            }
                            .es-m-p0b {
                                padding-bottom: 0!important
                            }
                            .es-m-p20b {
                                padding-bottom: 20px!important
                            }
                            .es-mobile-hidden,
                            .es-hidden {
                                display: none!important
                            }
                            .es-desk-hidden {
                                display: table-row!important;
                                width: auto!important;
                                overflow: visible!important;
                                float: none!important;
                                max-height: inherit!important;
                                line-height: inherit!important
                            }
                            .es-desk-menu-hidden {
                                display: table-cell!important
                            }
                            table.es-table-not-adapt,
                            .esd-block-html table {
                                width: auto!important
                            }
                            table.es-social {
                                display: inline-block!important
                            }
                            table.es-social td {
                                display: inline-block!important
                            }
                        }
                        
                        #outlook a {
                            padding: 0;
                        }
                        
                        .ExternalClass {
                            width: 100%;
                        }
                        
                        .ExternalClass,
                        .ExternalClass p,
                        .ExternalClass span,
                        .ExternalClass font,
                        .ExternalClass td,
                        .ExternalClass div {
                            line-height: 100%;
                        }
                        
                        .es-button {
                            mso-style-priority: 100!important;
                            text-decoration: none!important;
                        }
                        
                        a[x-apple-data-detectors] {
                            color: inherit!important;
                            text-decoration: none!important;
                            font-size: inherit!important;
                            font-family: inherit!important;
                            font-weight: inherit!important;
                            line-height: inherit!important;
                        }
                        
                        .es-desk-hidden {
                            display: none;
                            float: left;
                            overflow: hidden;
                            width: 0;
                            max-height: 0;
                            line-height: 0;
                            mso-hide: all;
                        }
                        
                        .es-button-border:hover a.es-button {
                            background: #ffffff!important;
                            border-color: #ffffff!important;
                        }
                        
                        .es-button-border:hover {
                            background: #ffffff!important;
                            border-style: solid solid solid solid!important;
                            border-color: #3d5ca3 #3d5ca3 #3d5ca3 #3d5ca3!important;
                        }
                    </style>
                </head>
                
                <body style="width:100%;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0;">
                    <div class="es-wrapper-color" style="background-color:#FAFAFA;">
                        <!--[if gte mso 9]><v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t"> <v:fill type="tile" color="#fafafa"></v:fill> </v:background><![endif]-->
                        <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;">
                            <tbody>
                                <tr style="border-collapse:collapse;">
                                    <td valign="top" style="padding:0;Margin:0;">
                                        <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;">
                                            <tbody>
                                                <tr style="border-collapse:collapse;">
                                                    <td class="es-info-area" style="padding:0;Margin:0;background-color:#FAFAFA;" bgcolor="#fafafa" align="center">
                                                        <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FAFAFA;" width="600" cellspacing="0" cellpadding="0" bgcolor="#fafafa" align="center">
                                                            <tbody>
                                                                <tr style="border-collapse:collapse;">
                                                                    <td style="Margin:0;padding-bottom:5px;padding-top:20px;padding-left:20px;padding-right:20px;background-position:left top;" align="left">
                                                                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                                            <tbody>
                                                                                <tr style="border-collapse:collapse;">
                                                                                    <td width="560" valign="top" align="center" style="padding:0;Margin:0;">
                                                                                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                                                            <tbody>
                                                                                                <tr style="border-collapse:collapse;">
                                                                                                    <td class="es-infoblock" align="center" style="padding:0;Margin:0;padding-bottom:5px;line-height:14px;font-size:12px;color:#CCCCCC;"></td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;">
                                            <tbody>
                                                <tr style="border-collapse:collapse;">
                                                    <td style="padding:0;Margin:0;background-color:#FAFAFA;" bgcolor="#fafafa" align="center">
                                                        <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                                                            <tbody>
                                                                <tr style="border-collapse:collapse;">
                                                                    <td style="Margin:0;padding-top:10px;padding-left:20px;padding-right:20px;padding-bottom:30px;border-radius:10px 10px 0px 0px;background-color: #bd1422;background-position:left top;" bgcolor="transparent" align="left">
                                                                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                                            <tbody>
                                                                                <tr style="border-collapse:collapse;">
                                                                                    <td width="560" valign="top" align="center" style="padding:0;Margin:0;">
                                                                                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                                                            <tbody>
                                                                                                <tr style="border-collapse:collapse;"> </tr>
                                                                                                <tr style="border-collapse:collapse;">
                                                                                                    <td align="center" style="padding:0;Margin:0;padding-top:10px;">
                                                                                                        <h1 style="margin:0;
                font-weight: 300;
                line-height: 1.2;
                font-size: 3rem;
                font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji';
                font-style:normal;
                color:#FFFFFF;
                ">Ur-Services24</h1>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr style="border-collapse:collapse;"> </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                <tr style="border-collapse:collapse;">
                                                                    <td style="padding:0;Margin:0;padding-left:20px;padding-right:20px;padding-top:40px;background-color:transparent;background-position:left top;" bgcolor="transparent" align="left">
                                                                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                                            <tbody>
                                                                                <tr style="border-collapse:collapse;">
                                                                                    <td width="560" valign="top" align="center" style="padding:0;Margin:0;">
                                                                                        <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-position:left top;" width="100%" cellspacing="0" cellpadding="0">
                                                                                            <tbody>
                                                                                                <tr style="border-collapse:collapse;">
                                                                                                    <td align="center" style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px;"><img src="https://qbsgq.stripocdn.email/content/guids/CABINET_905af03e8709229f1b10ad7414dc1531/images/23891556799905703.png" alt="" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;"
                                                                                                            width="160" height="189.92"></td>
                                                                                                </tr>
                                                                                                <tr style="border-collapse:collapse;">
                                                                                                    <td align="center" style="padding:0;Margin:0;padding-top:15px;padding-bottom:15px;">
                                                                                                        <h1 style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:20px;font-style:normal;font-weight:normal;color:#333333;"><strong>FAILED REGISTER</strong></h1>
                
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr style="border-collapse:collapse;">
                                                                                                    <td align="center" style="padding:0;Margin:0;padding-left:40px;padding-right:40px;">
                                                                                                        <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:24px;color:#666666;">Cher,&nbsp;` + email + `</p>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr style="border-collapse:collapse;">
                                                                                                    <td align="center" style="padding:0;Margin:0;padding-right:35px;padding-left:40px;">
                                                                                                        <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:24px;color:#666666;">Il y a eu une demande pour rejoindre Ur-Services24 en tant que client</p>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr style="border-collapse:collapse;">
                                                                                                    <td align="center" style="padding:0;Margin:0;padding-top:25px;padding-left:40px;padding-right:40px;">
                                                                                                        <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:24px;color:#666666;">Vos données ne sont pas correctes ou quelque chose ne va pas, veuillez réessayer avec les données correctes :)</p>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr style="border-collapse:collapse;">
                                                                                                    <td align="center" style="Margin:0;padding-left:10px;padding-right:10px;padding-top:40px;padding-bottom:40px;"><span class="es-button-border" style="border-style:solid;border-color:#3D5CA3;background:#FFFFFF;border-width:2px;display:inline-block;border-radius:10px;width:auto;"><a href="` + link_setregister + `" class="es-button" target="_blank" style="mso-style-priority:100
                    !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;color:#3D5CA3;border-style:solid;border-color:#FFFFFF;border-width:15px 20px 15px 20px;display:inline-block;background:#FFFFFF;border-radius:10px;font-weight:bold;font-style:normal;line-height:17px;width:auto;text-align:center;">réessayer</a></span></td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </body>
                
                </html>`;

                var mailOptions = {
                    from: 'Ahmedsendmail99@gmail.com',
                    to: email,
                    subject: 'Services System',
                    html: templeteHtml
                }

            }

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log('error sent: ' + error);
                    return res.send({ error: true, msg: error });
                } else {
                    console.log('Email sent: ' + info.response);
                    res.status(200).send({ msg: "courrier envoyé à: " + email });
                }
            });








        })

    },
    getPlombierData: (req, res) => {
        var Profession = "Plombier";
        SELECTQuery = "SELECT * FROM `v_client_data` where Profession='" + Profession + "'";
        sequelize.query(SELECTQuery, { type: sequelize.QueryTypes.SELECT })
            .then(function(result) {

                return res.status(200).send(result)
            });

    },
    getElectricienData: (req, res) => {
        var Profession = "Électricien";
        SELECTQuery = "SELECT * FROM `v_client_data` where Profession='" + Profession + "'";
        sequelize.query(SELECTQuery, { type: sequelize.QueryTypes.SELECT })
            .then(function(result) {

                return res.status(200).send(result)
            });

    },
    getSerrurierData: (req, res) => {
        var Profession = "Serrurier";
        SELECTQuery = "SELECT * FROM `v_client_data` where Profession='" + Profession + "'";
        sequelize.query(SELECTQuery, { type: sequelize.QueryTypes.SELECT })
            .then(function(result) {

                return res.status(200).send(result)
            });
    },
    addServicetoClient: (req, res) => {
        let cust_name = req.body.customerName,
            C_id = req.body.C_id,
            Profession = req.body.Profession,
            taskName = req.body.taskName,
            cust_phone = req.body.cust_phone,
            Service_price = req.body.Service_price,
            CustomerAddress = req.body.CustomerAddress,
            Service_Desc = req.body.Service_Desc;

        let date_ob = new Date();

        // current date
        // adjust 0 before single digit date
        let date = ("0" + date_ob.getDate()).slice(-2);

        // current month
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

        // current year
        let year = date_ob.getFullYear();

        // current hours
        let hours = date_ob.getHours();

        // current minutes
        let minutes = date_ob.getMinutes();

        // current seconds
        let seconds = date_ob.getSeconds();

        // prints date in YYYY-MM-DD format
        // console.log(year + "-" + month + "-" + date);

        // prints date & time in YYYY-MM-DD HH:MM:SS format
        //console.log(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);

        // prints time in HH:MM format
        //console.log(hours + ":" + minutes);


        // prints date in YYYY-MM-DD format
        var datedisplay = year + "-" + month + "-" + date;
        var timedisplay = hours + ":" + minutes + ":" + seconds;
        var datetime = datedisplay + " " + timedisplay;
        var status = "non payé";


        const newService = new Service({
            task_title: taskName,
            Cost: Service_price,
            Type: Profession,
            Cust_name: cust_name,
            Cust_phone: cust_phone,
            Cust_address: CustomerAddress,
            description: Service_Desc,
            status: status,
            DateTime: datetime,
            A_Id: req.session.A_Id,
            C_Id: C_id

        });
        newService.save().then((newService) => {

            return res.status(200).send({ error: false, msg: "sevice added" })
        })










    },
    getClientProfileAdmin: (req, res) => {
        var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + port;


        if (req.session.A_Id) {
            var C_Id = req.params.id;

            SELECTQuery = "SELECT * FROM `v_client_data` where C_id=" + C_Id;
            sequelize.query(SELECTQuery, { type: sequelize.QueryTypes.SELECT })
                .then(function(result) {
                    if (result.FirstName == "") {
                        return res.status(400).send("aucune donnée pour ce client");
                    } else {
                        Admin.findOne({ where: { A_Id: req.session.A_Id } }).then(function(Admin) {

                            var name = result[0].FirstName + " " + result[0].LastName;
                            res.render('Client_Profile.ejs', {
                                ClientData: result,
                                name: name,
                                First_Name: Admin.First_Name,
                                Last_Name: Admin.Last_Name,
                                image: Admin.image,
                                urlMain: url

                            });

                        });
                    }






                }).catch((err) => {

                    return res.status(404).send({ error: true, msg: err + "Pas de profil pour ce client" });
                });


        } else {
            res.writeHead(301, { Location: `${url}/login` });
            res.end();
        }




    },
    getconfirm_profile: (req, res) => {
        var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + port;


        if (req.session.A_Id) {
            var C_Id = req.params.id;

            SELECTQuery = "SELECT * FROM `v_client_data` where C_id=" + C_Id;
            sequelize.query(SELECTQuery, { type: sequelize.QueryTypes.SELECT })
                .then(function(result) {


                    var name = result[0].FirstName + " " + result[0].LastName;

                    res.render('confirm_profile.ejs', {
                        ClientData: result,
                        name: name,
                        First_Name: req.session.First_Name,
                        Last_Name: req.session.Last_Name,
                        image: req.session.image,
                        urlMain: url

                    });



                }).catch((err) => {
                    res.redirect('/getpage404');
                });


        } else {
            res.writeHead(301, { Location: `${url}/login` });
            res.end();
        }




    },
    getServicesDetails: (req, res) => {
        var task_id = req.params.id;

        SELECTQuery = "SELECT * FROM `v_servicesdetails` where task_id =" + task_id;
        sequelize.query(SELECTQuery, { type: sequelize.QueryTypes.SELECT })
            .then(function(result) {

                return res.status(200).send(result);



            }).catch((err) => {

                return res.status(404).send({ error: true, msg: err });
            });


    },
    getverifiepage: (req, res) => {
        var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + port;

        res.render("verifie.ejs", {
            urlMain: url
        });



    },
    refuseClientDataSendmail: (req, res) => {
        var email = req.body.email;

        Client.findAll({
            where: {
                email: email
            },
            attributes: ['email'],
        }).then(function(result) {
            //res.status(200).json(result);
            if (result.length == 0)
                return res.status(403).send({ error: true, msg: "Aucun compte trouvé" });
            else {

                var link_setregister = urlDashBoard + '/client/getFirstClientPage';

                var templeteHtml = `<html style="width:100%;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0;">

                <head>
                    <meta charset="UTF-8">
                    <meta content="width=device-width, initial-scale=1" name="viewport">
                    <meta name="x-apple-disable-message-reformatting">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta content="telephone=no" name="format-detection">
                    <title>New Template</title>
                    <!--[if (mso 16)]><style type="text/css"> a {text-decoration: none;} </style><![endif]-->
                    <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
                    <style type="text/css">
                        @media only screen and (max-width:600px) {
                            p,
                            ul li,
                            ol li,
                            a {
                                font-size: 16px!important;
                                line-height: 150%!important
                            }
                            h1 {
                                font-size: 20px!important;
                                text-align: center;
                                line-height: 120%!important
                            }
                            h2 {
                                font-size: 16px!important;
                                text-align: left;
                                line-height: 120%!important
                            }
                            h3 {
                                font-size: 20px!important;
                                text-align: center;
                                line-height: 120%!important
                            }
                            h1 a {
                                font-size: 20px!important
                            }
                            h2 a {
                                font-size: 16px!important;
                                text-align: left
                            }
                            h3 a {
                                font-size: 20px!important
                            }
                            .es-menu td a {
                                font-size: 14px!important
                            }
                            .es-header-body p,
                            .es-header-body ul li,
                            .es-header-body ol li,
                            .es-header-body a {
                                font-size: 10px!important
                            }
                            .es-footer-body p,
                            .es-footer-body ul li,
                            .es-footer-body ol li,
                            .es-footer-body a {
                                font-size: 12px!important
                            }
                            .es-infoblock p,
                            .es-infoblock ul li,
                            .es-infoblock ol li,
                            .es-infoblock a {
                                font-size: 12px!important
                            }
                            *[class="gmail-fix"] {
                                display: none!important
                            }
                            .es-m-txt-c,
                            .es-m-txt-c h1,
                            .es-m-txt-c h2,
                            .es-m-txt-c h3 {
                                text-align: center!important
                            }
                            .es-m-txt-r,
                            .es-m-txt-r h1,
                            .es-m-txt-r h2,
                            .es-m-txt-r h3 {
                                text-align: right!important
                            }
                            .es-m-txt-l,
                            .es-m-txt-l h1,
                            .es-m-txt-l h2,
                            .es-m-txt-l h3 {
                                text-align: left!important
                            }
                            .es-m-txt-r img,
                            .es-m-txt-c img,
                            .es-m-txt-l img {
                                display: inline!important
                            }
                            .es-button-border {
                                display: block!important
                            }
                            a.es-button {
                                font-size: 14px!important;
                                display: block!important;
                                border-left-width: 0px!important;
                                border-right-width: 0px!important
                            }
                            .es-btn-fw {
                                border-width: 10px 0px!important;
                                text-align: center!important
                            }
                            .es-adaptive table,
                            .es-btn-fw,
                            .es-btn-fw-brdr,
                            .es-left,
                            .es-right {
                                width: 100%!important
                            }
                            .es-content table,
                            .es-header table,
                            .es-footer table,
                            .es-content,
                            .es-footer,
                            .es-header {
                                width: 100%!important;
                                max-width: 600px!important
                            }
                            .es-adapt-td {
                                display: block!important;
                                width: 100%!important
                            }
                            .adapt-img {
                                width: 100%!important;
                                height: auto!important
                            }
                            .es-m-p0 {
                                padding: 0px!important
                            }
                            .es-m-p0r {
                                padding-right: 0px!important
                            }
                            .es-m-p0l {
                                padding-left: 0px!important
                            }
                            .es-m-p0t {
                                padding-top: 0px!important
                            }
                            .es-m-p0b {
                                padding-bottom: 0!important
                            }
                            .es-m-p20b {
                                padding-bottom: 20px!important
                            }
                            .es-mobile-hidden,
                            .es-hidden {
                                display: none!important
                            }
                            .es-desk-hidden {
                                display: table-row!important;
                                width: auto!important;
                                overflow: visible!important;
                                float: none!important;
                                max-height: inherit!important;
                                line-height: inherit!important
                            }
                            .es-desk-menu-hidden {
                                display: table-cell!important
                            }
                            table.es-table-not-adapt,
                            .esd-block-html table {
                                width: auto!important
                            }
                            table.es-social {
                                display: inline-block!important
                            }
                            table.es-social td {
                                display: inline-block!important
                            }
                        }
                        
                        #outlook a {
                            padding: 0;
                        }
                        
                        .ExternalClass {
                            width: 100%;
                        }
                        
                        .ExternalClass,
                        .ExternalClass p,
                        .ExternalClass span,
                        .ExternalClass font,
                        .ExternalClass td,
                        .ExternalClass div {
                            line-height: 100%;
                        }
                        
                        .es-button {
                            mso-style-priority: 100!important;
                            text-decoration: none!important;
                        }
                        
                        a[x-apple-data-detectors] {
                            color: inherit!important;
                            text-decoration: none!important;
                            font-size: inherit!important;
                            font-family: inherit!important;
                            font-weight: inherit!important;
                            line-height: inherit!important;
                        }
                        
                        .es-desk-hidden {
                            display: none;
                            float: left;
                            overflow: hidden;
                            width: 0;
                            max-height: 0;
                            line-height: 0;
                            mso-hide: all;
                        }
                        
                        .es-button-border:hover a.es-button {
                            background: #ffffff!important;
                            border-color: #ffffff!important;
                        }
                        
                        .es-button-border:hover {
                            background: #ffffff!important;
                            border-style: solid solid solid solid!important;
                            border-color: #3d5ca3 #3d5ca3 #3d5ca3 #3d5ca3!important;
                        }
                    </style>
                </head>
                
                <body style="width:100%;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0;">
                    <div class="es-wrapper-color" style="background-color:#FAFAFA;">
                        <!--[if gte mso 9]><v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t"> <v:fill type="tile" color="#fafafa"></v:fill> </v:background><![endif]-->
                        <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;">
                            <tbody>
                                <tr style="border-collapse:collapse;">
                                    <td valign="top" style="padding:0;Margin:0;">
                                        <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;">
                                            <tbody>
                                                <tr style="border-collapse:collapse;">
                                                    <td class="es-info-area" style="padding:0;Margin:0;background-color:#FAFAFA;" bgcolor="#fafafa" align="center">
                                                        <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FAFAFA;" width="600" cellspacing="0" cellpadding="0" bgcolor="#fafafa" align="center">
                                                            <tbody>
                                                                <tr style="border-collapse:collapse;">
                                                                    <td style="Margin:0;padding-bottom:5px;padding-top:20px;padding-left:20px;padding-right:20px;background-position:left top;" align="left">
                                                                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                                            <tbody>
                                                                                <tr style="border-collapse:collapse;">
                                                                                    <td width="560" valign="top" align="center" style="padding:0;Margin:0;">
                                                                                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                                                            <tbody>
                                                                                                <tr style="border-collapse:collapse;">
                                                                                                    <td class="es-infoblock" align="center" style="padding:0;Margin:0;padding-bottom:5px;line-height:14px;font-size:12px;color:#CCCCCC;"></td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;">
                                            <tbody>
                                                <tr style="border-collapse:collapse;">
                                                    <td style="padding:0;Margin:0;background-color:#FAFAFA;" bgcolor="#fafafa" align="center">
                                                        <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                                                            <tbody>
                                                                <tr style="border-collapse:collapse;">
                                                                    <td style="Margin:0;padding-top:10px;padding-left:20px;padding-right:20px;padding-bottom:30px;border-radius:10px 10px 0px 0px;background-color: #da1313;background-position:left top;" bgcolor="transparent" align="left">
                                                                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                                            <tbody>
                                                                                <tr style="border-collapse:collapse;">
                                                                                    <td width="560" valign="top" align="center" style="padding:0;Margin:0;">
                                                                                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                                                            <tbody>
                                                                                                <tr style="border-collapse:collapse;"> </tr>
                                                                                                <tr style="border-collapse:collapse;">
                                                                                                    <td align="center" style="padding:0;Margin:0;padding-top:10px;">
                                                                                                        <h1 style="margin:0;
                font-weight: 300;
                line-height: 1.2;
                font-size: 3rem;
                font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji';
                font-style:normal;
                color:#FFFFFF;
                ">Ur-Services24</h1>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr style="border-collapse:collapse;"> </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                <tr style="border-collapse:collapse;">
                                                                    <td style="padding:0;Margin:0;padding-left:20px;padding-right:20px;padding-top:40px;background-color:transparent;background-position:left top;" bgcolor="transparent" align="left">
                                                                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                                            <tbody>
                                                                                <tr style="border-collapse:collapse;">
                                                                                    <td width="560" valign="top" align="center" style="padding:0;Margin:0;">
                                                                                        <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-position:left top;" width="100%" cellspacing="0" cellpadding="0">
                                                                                            <tbody>
                                                                                                <tr style="border-collapse:collapse;">
                                                                                                    <td align="center" style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px;"><img src="https://qbsgq.stripocdn.email/content/guids/CABINET_905af03e8709229f1b10ad7414dc1531/images/23891556799905703.png" alt="" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;"
                                                                                                            width="160" height="189.92"></td>
                                                                                                </tr>
                                                                                                <tr style="border-collapse:collapse;">
                                                                                                    <td align="center" style="padding:0;Margin:0;padding-top:15px;padding-bottom:15px;">
                                                                                                        <h1 style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:20px;font-style:normal;font-weight:normal;color:#333333;"><strong>Définir votre mot de passe</strong></h1>
                
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr style="border-collapse:collapse;">
                                                                                                    <td align="center" style="padding:0;Margin:0;padding-left:40px;padding-right:40px;">
                                                                                                        <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:24px;color:#666666;">Cher,&nbsp;` + email + `</p>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr style="border-collapse:collapse;">
                                                                                                    <td align="center" style="padding:0;Margin:0;padding-right:35px;padding-left:40px;">
                                                                                                        <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:24px;color:#666666;">Il y a eu une demande pour rejoindre Ur-Services24 en tant que client</p>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr style="border-collapse:collapse;">
                                                                                                    <td align="center" style="padding:0;Margin:0;padding-top:25px;padding-left:40px;padding-right:40px;">
                                                                                                        <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:24px;color:#666666;">Si vous n'avez pas fait cette demande, ignorez simplement cet e-mail. Sinon, Nous nous excusons de ne pas avoir accepté vos données, car elles contiennent quelque
                                                                                                            chose d'incorrect ou enfreignent nos exigences. Appuyez sur le bouton inférieur pour réessayer correctement</p>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr style="border-collapse:collapse;">
                                                                                                    <td align="center" style="Margin:0;padding-left:10px;padding-right:10px;padding-top:40px;padding-bottom:40px;"><span class="es-button-border" style="border-style:solid;border-color:#3D5CA3;background:#FFFFFF;border-width:2px;display:inline-block;border-radius:10px;width:auto;"><a href="` + link_setregister + `" class="es-button" target="_blank" style="mso-style-priority:100
                    !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;color:#3D5CA3;border-style:solid;border-color:#FFFFFF;border-width:15px 20px 15px 20px;display:inline-block;background:#FFFFFF;border-radius:10px;font-weight:bold;font-style:normal;line-height:17px;width:auto;text-align:center;">réessayer</a></span></td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </body>
                
                </html>`;

                var mailOptions = {
                    from: 'Ahmedsendmail99@gmail.com',
                    to: email,
                    subject: 'Services System',
                    html: templeteHtml
                }

            }

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log('error sent: ' + error);
                    return res.send({ error: true, msg: error });
                } else {
                    console.log('Email sent: ' + info.response);
                    res.status(200).send({ msg: "courrier envoyé à: " + email });
                }
            });








        })

    },
    confirmClientDataSendmail: (req, res) => {
        var email = req.body.email;

        Client.findAll({
            where: {
                email: email
            },
            attributes: ['email'],
        }).then(function(result) {
            //res.status(200).json(result);
            if (result.length == 0)
                return res.status(403).send({ error: true, msg: "Aucun compte trouvé" });
            else {
                var link_setregister = urlDashBoard + '/client/getverifiepage';

                var templeteHtml = `<html style="width:100%;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0;">

                <head>
                    <meta charset="UTF-8">
                    <meta content="width=device-width, initial-scale=1" name="viewport">
                    <meta name="x-apple-disable-message-reformatting">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta content="telephone=no" name="format-detection">
                    <title>New Template</title>
                    <!--[if (mso 16)]><style type="text/css"> a {text-decoration: none;} </style><![endif]-->
                    <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
                    <style type="text/css">
                        @media only screen and (max-width:600px) {
                            p,
                            ul li,
                            ol li,
                            a {
                                font-size: 16px!important;
                                line-height: 150%!important
                            }
                            h1 {
                                font-size: 20px!important;
                                text-align: center;
                                line-height: 120%!important
                            }
                            h2 {
                                font-size: 16px!important;
                                text-align: left;
                                line-height: 120%!important
                            }
                            h3 {
                                font-size: 20px!important;
                                text-align: center;
                                line-height: 120%!important
                            }
                            h1 a {
                                font-size: 20px!important
                            }
                            h2 a {
                                font-size: 16px!important;
                                text-align: left
                            }
                            h3 a {
                                font-size: 20px!important
                            }
                            .es-menu td a {
                                font-size: 14px!important
                            }
                            .es-header-body p,
                            .es-header-body ul li,
                            .es-header-body ol li,
                            .es-header-body a {
                                font-size: 10px!important
                            }
                            .es-footer-body p,
                            .es-footer-body ul li,
                            .es-footer-body ol li,
                            .es-footer-body a {
                                font-size: 12px!important
                            }
                            .es-infoblock p,
                            .es-infoblock ul li,
                            .es-infoblock ol li,
                            .es-infoblock a {
                                font-size: 12px!important
                            }
                            *[class="gmail-fix"] {
                                display: none!important
                            }
                            .es-m-txt-c,
                            .es-m-txt-c h1,
                            .es-m-txt-c h2,
                            .es-m-txt-c h3 {
                                text-align: center!important
                            }
                            .es-m-txt-r,
                            .es-m-txt-r h1,
                            .es-m-txt-r h2,
                            .es-m-txt-r h3 {
                                text-align: right!important
                            }
                            .es-m-txt-l,
                            .es-m-txt-l h1,
                            .es-m-txt-l h2,
                            .es-m-txt-l h3 {
                                text-align: left!important
                            }
                            .es-m-txt-r img,
                            .es-m-txt-c img,
                            .es-m-txt-l img {
                                display: inline!important
                            }
                            .es-button-border {
                                display: block!important
                            }
                            a.es-button {
                                font-size: 14px!important;
                                display: block!important;
                                border-left-width: 0px!important;
                                border-right-width: 0px!important
                            }
                            .es-btn-fw {
                                border-width: 10px 0px!important;
                                text-align: center!important
                            }
                            .es-adaptive table,
                            .es-btn-fw,
                            .es-btn-fw-brdr,
                            .es-left,
                            .es-right {
                                width: 100%!important
                            }
                            .es-content table,
                            .es-header table,
                            .es-footer table,
                            .es-content,
                            .es-footer,
                            .es-header {
                                width: 100%!important;
                                max-width: 600px!important
                            }
                            .es-adapt-td {
                                display: block!important;
                                width: 100%!important
                            }
                            .adapt-img {
                                width: 100%!important;
                                height: auto!important
                            }
                            .es-m-p0 {
                                padding: 0px!important
                            }
                            .es-m-p0r {
                                padding-right: 0px!important
                            }
                            .es-m-p0l {
                                padding-left: 0px!important
                            }
                            .es-m-p0t {
                                padding-top: 0px!important
                            }
                            .es-m-p0b {
                                padding-bottom: 0!important
                            }
                            .es-m-p20b {
                                padding-bottom: 20px!important
                            }
                            .es-mobile-hidden,
                            .es-hidden {
                                display: none!important
                            }
                            .es-desk-hidden {
                                display: table-row!important;
                                width: auto!important;
                                overflow: visible!important;
                                float: none!important;
                                max-height: inherit!important;
                                line-height: inherit!important
                            }
                            .es-desk-menu-hidden {
                                display: table-cell!important
                            }
                            table.es-table-not-adapt,
                            .esd-block-html table {
                                width: auto!important
                            }
                            table.es-social {
                                display: inline-block!important
                            }
                            table.es-social td {
                                display: inline-block!important
                            }
                        }
                        
                        #outlook a {
                            padding: 0;
                        }
                        
                        .ExternalClass {
                            width: 100%;
                        }
                        
                        .ExternalClass,
                        .ExternalClass p,
                        .ExternalClass span,
                        .ExternalClass font,
                        .ExternalClass td,
                        .ExternalClass div {
                            line-height: 100%;
                        }
                        
                        .es-button {
                            mso-style-priority: 100!important;
                            text-decoration: none!important;
                        }
                        
                        a[x-apple-data-detectors] {
                            color: inherit!important;
                            text-decoration: none!important;
                            font-size: inherit!important;
                            font-family: inherit!important;
                            font-weight: inherit!important;
                            line-height: inherit!important;
                        }
                        
                        .es-desk-hidden {
                            display: none;
                            float: left;
                            overflow: hidden;
                            width: 0;
                            max-height: 0;
                            line-height: 0;
                            mso-hide: all;
                        }
                        
                        .es-button-border:hover a.es-button {
                            background: #ffffff!important;
                            border-color: #ffffff!important;
                        }
                        
                        .es-button-border:hover {
                            background: #ffffff!important;
                            border-style: solid solid solid solid!important;
                            border-color: #3d5ca3 #3d5ca3 #3d5ca3 #3d5ca3!important;
                        }
                    </style>
                </head>
                
                <body style="width:100%;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0;">
                    <div class="es-wrapper-color" style="background-color:#FAFAFA;">
                        <!--[if gte mso 9]><v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t"> <v:fill type="tile" color="#fafafa"></v:fill> </v:background><![endif]-->
                        <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;">
                            <tbody>
                                <tr style="border-collapse:collapse;">
                                    <td valign="top" style="padding:0;Margin:0;">
                                        <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;">
                                            <tbody>
                                                <tr style="border-collapse:collapse;">
                                                    <td class="es-info-area" style="padding:0;Margin:0;background-color:#FAFAFA;" bgcolor="#fafafa" align="center">
                                                        <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FAFAFA;" width="600" cellspacing="0" cellpadding="0" bgcolor="#fafafa" align="center">
                                                            <tbody>
                                                                <tr style="border-collapse:collapse;">
                                                                    <td style="Margin:0;padding-bottom:5px;padding-top:20px;padding-left:20px;padding-right:20px;background-position:left top;" align="left">
                                                                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                                            <tbody>
                                                                                <tr style="border-collapse:collapse;">
                                                                                    <td width="560" valign="top" align="center" style="padding:0;Margin:0;">
                                                                                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                                                            <tbody>
                                                                                                <tr style="border-collapse:collapse;">
                                                                                                    <td class="es-infoblock" align="center" style="padding:0;Margin:0;padding-bottom:5px;line-height:14px;font-size:12px;color:#CCCCCC;"></td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;">
                                            <tbody>
                                                <tr style="border-collapse:collapse;">
                                                    <td style="padding:0;Margin:0;background-color:#FAFAFA;" bgcolor="#fafafa" align="center">
                                                        <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                                                            <tbody>
                                                                <tr style="border-collapse:collapse;">
                                                                    <td style="Margin:0;padding-top:10px;padding-left:20px;padding-right:20px;padding-bottom:30px;border-radius:10px 10px 0px 0px;background-color: #0B5394;background-position:left top;" bgcolor="transparent" align="left">
                                                                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                                            <tbody>
                                                                                <tr style="border-collapse:collapse;">
                                                                                    <td width="560" valign="top" align="center" style="padding:0;Margin:0;">
                                                                                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                                                            <tbody>
                                                                                                <tr style="border-collapse:collapse;"> </tr>
                                                                                                <tr style="border-collapse:collapse;">
                                                                                                    <td align="center" style="padding:0;Margin:0;padding-top:10px;">
                                                                                                        <h1 style="margin:0;
                font-weight: 300;
                line-height: 1.2;
                font-size: 3rem;
                font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji';
                font-style:normal;
                color:#FFFFFF;
                ">Ur-Services24</h1>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr style="border-collapse:collapse;"> </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                <tr style="border-collapse:collapse;">
                                                                    <td style="padding:0;Margin:0;padding-left:20px;padding-right:20px;padding-top:40px;background-color:transparent;background-position:left top;" bgcolor="transparent" align="left">
                                                                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                                            <tbody>
                                                                                <tr style="border-collapse:collapse;">
                                                                                    <td width="560" valign="top" align="center" style="padding:0;Margin:0;">
                                                                                        <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-position:left top;" width="100%" cellspacing="0" cellpadding="0">
                                                                                            <tbody>
                                                                                                <tr style="border-collapse:collapse;">
                                                                                                    <td align="center" style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px;"><img src="https://qbsgq.stripocdn.email/content/guids/CABINET_905af03e8709229f1b10ad7414dc1531/images/23891556799905703.png" alt="" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;"
                                                                                                            width="160" height="189.92"></td>
                                                                                                </tr>
                                                                                                <tr style="border-collapse:collapse;">
                                                                                                    <td align="center" style="padding:0;Margin:0;padding-top:15px;padding-bottom:15px;">
                                                                                                        <h1 style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:20px;font-style:normal;font-weight:normal;color:#333333;"><strong>Définir votre mot de passe</strong></h1>
                
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr style="border-collapse:collapse;">
                                                                                                    <td align="center" style="padding:0;Margin:0;padding-left:40px;padding-right:40px;">
                                                                                                        <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:24px;color:#666666;">Cher,&nbsp;` + email + `</p>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr style="border-collapse:collapse;">
                                                                                                    <td align="center" style="padding:0;Margin:0;padding-right:35px;padding-left:40px;">
                                                                                                        <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:24px;color:#666666;">Il y a eu une demande pour rejoindre Ur-Services24 en tant que client</p>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr style="border-collapse:collapse;">
                                                                                                    <td align="center" style="padding:0;Margin:0;padding-top:25px;padding-left:40px;padding-right:40px;">
                                                                                                        <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:24px;color:#666666;">Si vous n'avez pas fait cette demande, ignorez simplement cet e-mail. Sinon, veuillez cliquer sur le bouton ci-dessous pour confirmer le compte et vous connecter en
                                                                                                            tant que client. Vos données ont été approuvées. Félicitations Merci de nous avoir rejoint</p>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr style="border-collapse:collapse;">
                                                                                                    <td align="center" style="Margin:0;padding-left:10px;padding-right:10px;padding-top:40px;padding-bottom:40px;"><span class="es-button-border" style="border-style:solid;border-color:#3D5CA3;background:#FFFFFF;border-width:2px;display:inline-block;border-radius:10px;width:auto;"><a href="` + link_setregister + `" class="es-button" target="_blank" style="mso-style-priority:100
                    !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;color:#3D5CA3;border-style:solid;border-color:#FFFFFF;border-width:15px 20px 15px 20px;display:inline-block;background:#FFFFFF;border-radius:10px;font-weight:bold;font-style:normal;line-height:17px;width:auto;text-align:center;">vérifier le compte</a></span></td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </body>
                
                </html>`;

                var mailOptions = {
                    from: 'Ahmedsendmail99@gmail.com',
                    to: email,
                    subject: 'Services System',
                    html: templeteHtml
                }

            }

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log('error sent: ' + error);
                    return res.send({ error: true, msg: error });
                } else {
                    console.log('Email sent: ' + info.response);
                    res.status(200).send({ msg: "courrier envoyé à: " + email });
                }
            });








        })

    },
    deleteClientData: (req, res) => {
        let First_Name = req.body.Fname,
            Last_Name = req.body.Lname,
            c_id = req.params.id;
        var path = "dist/img/Clients_Data/" + First_Name + "_" + Last_Name + c_id;


        ClientData.destroy({
            where: {
                C_id: c_id //this will be your id that you want to delete
            }
        }).then(function(rowDeleted) { // rowDeleted will return number of rows deleted
            if (rowDeleted === 1) {
                console.log('path=' + path);
                if (fs.existsSync(path)) {
                    fs.readdirSync(path).forEach(function(file, index) {
                        var curPath = path + "/" + file;
                        if (fs.lstatSync(curPath).isDirectory()) {
                            // recurse
                            console.log('get all Files');
                            deleteFolderRecursive(curPath);
                        } else { // delete file
                            console.log('Delete all Files');
                            fs.unlinkSync(curPath);
                        }
                    });
                    console.log('Delete Folder');
                    fs.rmdirSync(path);
                }




                return res.status(200).send("Supprimé avec succès");
            }
        }, function(err) {
            return res.status(400).send("Erreur" + err);
        });


    },
    clientLogin: (req, res) => {

        var sess;
        sess = req.session;
        Client.findOne({
            where: {
                email: req.body.email

            }
        }).then((user) => {

            if (!user) {

                res.status(400).send({ msg: "Client introuvable!" });

            } else {
                if (user.password == null) {
                    res.status(400).send({ error: true, msg: "Vérifiez votre boîte de réception pour définir un mot de passe pour vous connecter" });
                } else {
                    if (user.password == req.body.password) {
                        sess.email = user.email;
                        sess.password = user.password;
                        sess.phone = user.phone;
                        sess.address = user.address;
                        sess.C_Id = user.C_id;
                        ClientData.findOne({ where: { C_id: user.C_id } }).then(function(Client) {

                            if (!Client) {
                                res.status(200).send({ msg: "/client/clientregisterpage" });
                            } else {
                                res.status(200).send({ msg: "/client/clientindex" });

                            }


                        })





                        //res.writeHead(301, { Location: `${urlDashBoard}/client/clientindex` });

                    } else {
                        res.status(400).send({ msg: "email ou mot de passe incorrect!" });


                    }
                }



            }

        })

    },
    clientindex: (req, res) => {
        var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + port;

        var c_id = req.session.C_Id;
        if (!c_id) {
            res.redirect("/client/ClientFirstrequestpage")
                //res.status(400).send({ msg: "please log in first" })
        } else {
            ClientData.findOne({ where: { C_id: c_id } })
                .then(function(Client) {
                    if (Client.status != null) {
                        var name = Client.FirstName + " " + Client.LastName;
                        var image = Client.image;

                        res.render("index.ejs", {
                            name: name,
                            image: image,
                            Fname: Client.FirstName,
                            Lname: Client.LastName,
                            C_id: Client.C_id,
                            urlMain: url
                        });
                    } else {
                        res.redirect("/client/clientregisterprofilepage");
                    }



                });
        }












    },
    clientregisterpage: (req, res) => {
        var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + port;

        var c_id = req.session.C_Id;

        if (c_id) {
            res.render("registerClientProfile.ejs", {
                c_id: c_id,
                urlMain: url
            });
        } else {
            res.redirect("/client/ClientFirstrequestpage");
        }



    },
    updatestatusConfirmdata: (req, res) => {
        var status = "Confirmed";
        var c_id = req.body.c_id;
        ClientData.update({ status: status }, {
            where: {
                C_id: c_id
            }
        }).then((result) => {
            res.status(200).send({ msg: "Vos données confirmées" });
        });

    },
    clientregisterprofilepage: (req, res) => {
        var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + port;

        var c_id = req.session.C_Id;
        if (c_id) {
            ClientData.findAll({
                where: {
                    C_id: c_id
                }
            }).then((result) => {
                if (result.length != 0) {
                    res.render("registerprofile.ejs", {
                        data: result,
                        urlMain: url
                    });

                } else {
                    res.redirect("/client/clientregisterpage");
                }

            });
        } else {
            res.redirect("/client/ClientFirstrequestpage");
        }

    },
    notPaidPage: (req, res) => {
        var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + port;

        var c_id = req.session.C_Id;
        if (!c_id) {
            res.redirect("/client/ClientFirstrequestpage")
                //res.status(400).send({ msg: "please log in first" })
        } else {
            ClientData.findOne({ where: { C_id: c_id } })
                .then(function(Client) {
                    if (Client.status != null) {
                        var name = Client.FirstName + " " + Client.LastName;
                        var image = Client.image;

                        res.render("not_paid.ejs", {
                            name: name,
                            image: image,
                            Fname: Client.FirstName,
                            Lname: Client.LastName,
                            C_id: Client.C_id,
                            urlMain: url
                        });
                    } else {
                        res.redirect("/client/clientregisterprofilepage");
                    }



                });
        }




    },
    PaidPage: (req, res) => {
        var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + port;

        var c_id = req.session.C_Id;
        if (!c_id) {
            res.redirect("/client/ClientFirstrequestpage")
                //res.status(400).send({ msg: "please log in first" })
        } else {
            ClientData.findOne({ where: { C_id: c_id } })
                .then(function(Client) {
                    if (Client.status != null) {
                        var name = Client.FirstName + " " + Client.LastName;
                        var image = Client.image;

                        res.render("paid.ejs", {
                            name: name,
                            image: image,
                            Fname: Client.FirstName,
                            Lname: Client.LastName,
                            C_id: Client.C_id,
                            urlMain: url
                        });
                    } else {
                        res.redirect("/client/clientregisterprofilepage");
                    }



                });
        }




    },
    invoicePage: (req, res) => {
        var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + port;

        var c_id = req.session.C_Id;
        if (!c_id) {
            res.redirect("/client/ClientFirstrequestpage")
                //res.status(400).send({ msg: "please log in first" })
        } else {
            ClientData.findOne({ where: { C_id: c_id } })
                .then(function(Client) {
                    if (Client.status != null) {

                        var c_id = req.session.C_Id;
                        var status = "annulé";

                        Service.findAll({
                            where: {
                                C_Id: c_id,
                                status: {
                                    [op.ne]: status
                                }
                            }
                        }).then((result) => {

                            //return res.status(200).send(result);
                            var name = Client.FirstName + " " + Client.LastName;
                            var image = Client.image;

                            res.render("invoice.ejs", {
                                data: result,
                                name: name,
                                image: image,
                                Fname: Client.FirstName,
                                Lname: Client.LastName,
                                C_id: Client.C_id,
                                urlMain: url
                            });
                        }).catch((err) => {
                            console.log(err);
                        });

                    } else {
                        res.redirect("/client/clientregisterprofilepage");
                    }



                });
        }




    },
    canceledPage: (req, res) => {
        var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + port;

        var c_id = req.session.C_Id;
        if (!c_id) {
            res.redirect("/client/ClientFirstrequestpage")
                //res.status(400).send({ msg: "please log in first" })
        } else {
            ClientData.findOne({ where: { C_id: c_id } })
                .then(function(Client) {
                    if (Client.status != null) {
                        var name = Client.FirstName + " " + Client.LastName;
                        var image = Client.image;

                        res.render("canceled.ejs", {
                            name: name,
                            image: image,
                            Fname: Client.FirstName,
                            Lname: Client.LastName,
                            C_id: Client.C_id,
                            urlMain: url
                        });
                    } else {
                        res.redirect("/client/clientregisterprofilepage");
                    }



                });
        }




    },
    getclientnotpaidservice: (req, res) => {
        var c_id = req.session.C_Id;
        var status = "non payé";
        Service.findAll({ where: { C_Id: c_id, status: status } }).then((result) => {

            return res.status(200).send(result);
        }).catch((err) => {
            console.log(err);
        });


    },
    getclientpaidservice: (req, res) => {
        var c_id = req.session.C_Id;
        var status = "payé";
        Service.findAll({ where: { C_Id: c_id, status: status } }).then((result) => {

            return res.status(200).send(result);
        }).catch((err) => {
            console.log(err);
        });


    },
    getclientcancelservice: (req, res) => {
        var c_id = req.session.C_Id;
        var status = "annulé";
        Service.findAll({ where: { C_Id: c_id, status: status } }).then((result) => {

            return res.status(200).send(result);
        }).catch((err) => {
            console.log(err);
        });


    },

    uploadinvoice: (req, res) => {
        var service_id = req.body.s_id;
        var invoicefileupload = req.files.invoiceFile;
        var FirstName = req.body.Fname;
        var LastName = req.body.Lname;
        var C_id = req.session.C_Id;
        console.log("Fname:" + FirstName);
        console.log("Lname:" + LastName);
        var fileEx = invoicefileupload.mimetype.split('/')[1];

        fs.mkdir("dist/img/Clients_Data/" + FirstName + "_" + LastName + C_id + "/invoice " + service_id + "/", { recursive: true }, function(err) {
            if (err) {
                console.log(err)
            } else {
                console.log("New directory successfully created.")
            }
        })


        invoicefileupload.mv('dist/img/Clients_Data/' + FirstName + "_" + LastName + C_id + "/invoice " + service_id + "/" + invoicefileupload.name, (err) => {
            if (err) {
                console.log(err);
                return res.status(400).send({ msg: err + "pour télécharger l'image" });
            }


        });

        let values = { invoice: invoicefileupload.name }
        Service.update(values, { where: { task_id: service_id } }).then(updatedRecord => {
            console.log(`updated record ${JSON.stringify(updatedRecord, null, 2)}`)
            return res.status(200).send({ msg: "données sauvegardées true" });
        })



    },
    getservicescustomerdata: (req, res) => {
        var serviceid = req.params.id;
        Service.findAll({ where: { task_id: serviceid } }).then((result) => {

            return res.status(200).send(result);


        });
    },
    clientprofilePage: (req, res) => {
        var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + port;

        var c_id = req.session.C_Id;
        if (!c_id) {
            res.redirect("/client/ClientFirstrequestpage")
                //res.status(400).send({ msg: "please log in first" })
        } else {

            SELECTQuery = "SELECT * FROM `v_client_data` where C_id=" + c_id;
            sequelize.query(SELECTQuery, { type: sequelize.QueryTypes.SELECT })
                .then(function(result) {


                    var name = result[0].FirstName + " " + result[0].LastName;

                    var image = result[0].image;
                    var C_id = result[0].C_id;
                    res.render('profile_Setting.ejs', {
                        data: result,
                        name: name,
                        Fname: result[0].FirstName,
                        Lname: result[0].LastName,
                        image: image,
                        urlMain: url,
                        C_id: C_id

                    });



                }).catch((err) => {

                    return res.status(404).send({ error: true, msg: err + "Pas de profil pour ce client" });
                });


        }




    },
    editeclientprofile: (req, res) => {
        if (!req.files) {
            return res.status(400).send({ msg: "Aucun fichier image téléchargé pour mettre à jour le profil" })
        } else {

            var c_id = req.session.C_Id;
            var fileupload = req.files.image;
            var Fname = req.body.fname;
            var Lname = req.body.lname;

            // var fileEx = fileupload.mimetype.split('/')[1];
            fileupload.mv('dist/img/Clients_Data/' + Fname + "_" + Lname + c_id + "/" + fileupload.name, (err) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send({ msg: err + "pour télécharger l'image" });
                }


            });
            let values = { image: fileupload.name }
            ClientData.update(values, { where: { C_id: c_id } }).then(updatedRecord => {
                console.log(`updated record ${JSON.stringify(updatedRecord, null, 2)}`)
                return res.status(200).send({ msg: "données sauvegardées true" });
            })









        }




    },
    getTotalClient: (req, res) => {
        var status = "Confirmed";
        let selectQuery = "SELECT COUNT(*) as 'TotalClient' FROM `client_data` where status='" + status + "'";
        sequelize.query(selectQuery, { type: sequelize.QueryTypes.SELECT })
            .then(function(result) {
                return res.status(200).send(result);

            })
    },
    getTotalcancel: (req, res) => {
        var status = "annulé";
        let selectQuery = "SELECT COUNT(*) as 'Totalcancel' FROM `task` where status='" + status + "'";
        sequelize.query(selectQuery, { type: sequelize.QueryTypes.SELECT })
            .then(function(result) {
                return res.status(200).send(result);

            })
    },
    getClientrequest: (req, res) => {

        let selectQuery = "SELECT COUNT(*) as 'Totalclient' FROM `client`";
        sequelize.query(selectQuery, { type: sequelize.QueryTypes.SELECT })
            .then(function(result) {
                return res.status(200).send(result);

            })
    },
    getTotalservices: (req, res) => {

        let selectQuery = "SELECT COUNT(*) as 'Totalservices' FROM `task` ";
        sequelize.query(selectQuery, { type: sequelize.QueryTypes.SELECT })
            .then(function(result) {
                return res.status(200).send(result);

            })
    },
    getTotalpay: (req, res) => {
        var status = "payé";
        let selectQuery = "SELECT COUNT(*) as 'Totalpay' FROM `task` where status='" + status + "'";
        sequelize.query(selectQuery, { type: sequelize.QueryTypes.SELECT })
            .then(function(result) {
                return res.status(200).send(result);

            })
    },
    getTotalnonpay: (req, res) => {
        var status = "non payé";
        let selectQuery = "SELECT COUNT(*) as 'Totalnonpay' FROM `task` where status='" + status + "' ";
        sequelize.query(selectQuery, { type: sequelize.QueryTypes.SELECT })
            .then(function(result) {
                return res.status(200).send(result);

            })
    },
    getTotalservicesforclient: (req, res) => {
        var c_id = req.params.id;
        let selectQuery = "SELECT COUNT(*) as 'Totalservicesforclient' FROM `task` where C_Id=" + c_id;
        sequelize.query(selectQuery, { type: sequelize.QueryTypes.SELECT })
            .then(function(result) {
                return res.status(200).send(result);

            })
    },
    getTotalpayforclient: (req, res) => {
        var c_id = req.params.id;
        var status = "payé";
        let selectQuery = "SELECT COUNT(*) as 'Totalpayforclient' FROM `task` where status='" + status + "' AND C_Id=" + c_id;
        sequelize.query(selectQuery, { type: sequelize.QueryTypes.SELECT })
            .then(function(result) {
                return res.status(200).send(result);

            })
    },
    getTotalnonpayforclient: (req, res) => {
        var c_id = req.params.id;
        var status = "non payé";
        let selectQuery = "SELECT COUNT(*) as 'Totalnonpayforclient' FROM `task` where status='" + status + "' AND C_Id=" + c_id;
        sequelize.query(selectQuery, { type: sequelize.QueryTypes.SELECT })
            .then(function(result) {
                return res.status(200).send(result);

            })
    },
    getTotalcancelforclient: (req, res) => {
        var c_id = req.params.id;
        var status = "annulé";
        let selectQuery = "SELECT COUNT(*) as 'Totalcancelforclient' FROM `task` where status='" + status + "' AND C_Id=" + c_id;
        sequelize.query(selectQuery, { type: sequelize.QueryTypes.SELECT })
            .then(function(result) {
                return res.status(200).send(result);

            })
    },
    getallClientdatabyId: (req, res) => {
        var c_id = req.session.C_Id;
        SELECTQuery = "SELECT * FROM `v_client_data` where C_id=" + c_id;
        sequelize.query(SELECTQuery, { type: sequelize.QueryTypes.SELECT })
            .then(function(result) {

                return res.status(200).send(result);
            });

    },
    paymentSuccPage: (req, res) => {
        var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + port;

        var c_id = req.session.C_Id;
        if (!c_id) {
            res.redirect("/client/ClientFirstrequestpage")
                //res.status(400).send({ msg: "please log in first" })
        } else {
            res.render("paymentSuccess.ejs", {

                urlMain: url
            });

        }
    },
    updateTaskStatus: (req, res) => {
        var status = "payé";
        var task_id = req.params.id;
        Service.update({ status: status }, { where: { task_id: task_id } }).then(updatedRecord => {
            res.status(200).send({ msg: "status updated" })
        })
    },
    getClientLoginPage: (req, res) => {
        var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + port;

        console.log(req.session);
        console.log(req.session.email);
        res.render("clientlogin.ejs", {

            urlMain: url
        });


    },

    adminforgetpassSendmail: (req, res) => {
        var email = req.body.email;

        Admin.findAll({
            where: {
                email: email
            },
            attributes: ['email'],
        }).then(function(result) {
            //res.status(200).json(result);
            console.log("result.length: ", result.length);
            if (result.length == 0)
                return res.status(403).send({ msg: "Aucun compte trouvé" });
            else {


                var link_setregister = urlDashBoard + '/addminforgetpasspage/' + email;

                var templeteHtml = `<html style="width:100%;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0;">

                <head>
                    <meta charset="UTF-8">
                    <meta content="width=device-width, initial-scale=1" name="viewport">
                    <meta name="x-apple-disable-message-reformatting">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta content="telephone=no" name="format-detection">
                    <title>New Template</title>
                    <!--[if (mso 16)]><style type="text/css"> a {text-decoration: none;} </style><![endif]-->
                    <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
                    <style type="text/css">
                        @media only screen and (max-width:600px) {
                            p,
                            ul li,
                            ol li,
                            a {
                                font-size: 16px!important;
                                line-height: 150%!important
                            }
                            h1 {
                                font-size: 20px!important;
                                text-align: center;
                                line-height: 120%!important
                            }
                            h2 {
                                font-size: 16px!important;
                                text-align: left;
                                line-height: 120%!important
                            }
                            h3 {
                                font-size: 20px!important;
                                text-align: center;
                                line-height: 120%!important
                            }
                            h1 a {
                                font-size: 20px!important
                            }
                            h2 a {
                                font-size: 16px!important;
                                text-align: left
                            }
                            h3 a {
                                font-size: 20px!important
                            }
                            .es-menu td a {
                                font-size: 14px!important
                            }
                            .es-header-body p,
                            .es-header-body ul li,
                            .es-header-body ol li,
                            .es-header-body a {
                                font-size: 10px!important
                            }
                            .es-footer-body p,
                            .es-footer-body ul li,
                            .es-footer-body ol li,
                            .es-footer-body a {
                                font-size: 12px!important
                            }
                            .es-infoblock p,
                            .es-infoblock ul li,
                            .es-infoblock ol li,
                            .es-infoblock a {
                                font-size: 12px!important
                            }
                            *[class="gmail-fix"] {
                                display: none!important
                            }
                            .es-m-txt-c,
                            .es-m-txt-c h1,
                            .es-m-txt-c h2,
                            .es-m-txt-c h3 {
                                text-align: center!important
                            }
                            .es-m-txt-r,
                            .es-m-txt-r h1,
                            .es-m-txt-r h2,
                            .es-m-txt-r h3 {
                                text-align: right!important
                            }
                            .es-m-txt-l,
                            .es-m-txt-l h1,
                            .es-m-txt-l h2,
                            .es-m-txt-l h3 {
                                text-align: left!important
                            }
                            .es-m-txt-r img,
                            .es-m-txt-c img,
                            .es-m-txt-l img {
                                display: inline!important
                            }
                            .es-button-border {
                                display: block!important
                            }
                            a.es-button {
                                font-size: 14px!important;
                                display: block!important;
                                border-left-width: 0px!important;
                                border-right-width: 0px!important
                            }
                            .es-btn-fw {
                                border-width: 10px 0px!important;
                                text-align: center!important
                            }
                            .es-adaptive table,
                            .es-btn-fw,
                            .es-btn-fw-brdr,
                            .es-left,
                            .es-right {
                                width: 100%!important
                            }
                            .es-content table,
                            .es-header table,
                            .es-footer table,
                            .es-content,
                            .es-footer,
                            .es-header {
                                width: 100%!important;
                                max-width: 600px!important
                            }
                            .es-adapt-td {
                                display: block!important;
                                width: 100%!important
                            }
                            .adapt-img {
                                width: 100%!important;
                                height: auto!important
                            }
                            .es-m-p0 {
                                padding: 0px!important
                            }
                            .es-m-p0r {
                                padding-right: 0px!important
                            }
                            .es-m-p0l {
                                padding-left: 0px!important
                            }
                            .es-m-p0t {
                                padding-top: 0px!important
                            }
                            .es-m-p0b {
                                padding-bottom: 0!important
                            }
                            .es-m-p20b {
                                padding-bottom: 20px!important
                            }
                            .es-mobile-hidden,
                            .es-hidden {
                                display: none!important
                            }
                            .es-desk-hidden {
                                display: table-row!important;
                                width: auto!important;
                                overflow: visible!important;
                                float: none!important;
                                max-height: inherit!important;
                                line-height: inherit!important
                            }
                            .es-desk-menu-hidden {
                                display: table-cell!important
                            }
                            table.es-table-not-adapt,
                            .esd-block-html table {
                                width: auto!important
                            }
                            table.es-social {
                                display: inline-block!important
                            }
                            table.es-social td {
                                display: inline-block!important
                            }
                        }
                        
                        #outlook a {
                            padding: 0;
                        }
                        
                        .ExternalClass {
                            width: 100%;
                        }
                        
                        .ExternalClass,
                        .ExternalClass p,
                        .ExternalClass span,
                        .ExternalClass font,
                        .ExternalClass td,
                        .ExternalClass div {
                            line-height: 100%;
                        }
                        
                        .es-button {
                            mso-style-priority: 100!important;
                            text-decoration: none!important;
                        }
                        
                        a[x-apple-data-detectors] {
                            color: inherit!important;
                            text-decoration: none!important;
                            font-size: inherit!important;
                            font-family: inherit!important;
                            font-weight: inherit!important;
                            line-height: inherit!important;
                        }
                        
                        .es-desk-hidden {
                            display: none;
                            float: left;
                            overflow: hidden;
                            width: 0;
                            max-height: 0;
                            line-height: 0;
                            mso-hide: all;
                        }
                        
                        .es-button-border:hover a.es-button {
                            background: #ffffff!important;
                            border-color: #ffffff!important;
                        }
                        
                        .es-button-border:hover {
                            background: #ffffff!important;
                            border-style: solid solid solid solid!important;
                            border-color: #3d5ca3 #3d5ca3 #3d5ca3 #3d5ca3!important;
                        }
                    </style>
                </head>
                
                <body style="width:100%;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0;">
                    <div class="es-wrapper-color" style="background-color:#FAFAFA;">
                        <!--[if gte mso 9]><v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t"> <v:fill type="tile" color="#fafafa"></v:fill> </v:background><![endif]-->
                        <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;">
                            <tbody>
                                <tr style="border-collapse:collapse;">
                                    <td valign="top" style="padding:0;Margin:0;">
                                        <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;">
                                            <tbody>
                                                <tr style="border-collapse:collapse;">
                                                    <td class="es-info-area" style="padding:0;Margin:0;background-color:#FAFAFA;" bgcolor="#fafafa" align="center">
                                                        <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FAFAFA;" width="600" cellspacing="0" cellpadding="0" bgcolor="#fafafa" align="center">
                                                            <tbody>
                                                                <tr style="border-collapse:collapse;">
                                                                    <td style="Margin:0;padding-bottom:5px;padding-top:20px;padding-left:20px;padding-right:20px;background-position:left top;" align="left">
                                                                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                                            <tbody>
                                                                                <tr style="border-collapse:collapse;">
                                                                                    <td width="560" valign="top" align="center" style="padding:0;Margin:0;">
                                                                                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                                                            <tbody>
                                                                                                <tr style="border-collapse:collapse;">
                                                                                                    <td class="es-infoblock" align="center" style="padding:0;Margin:0;padding-bottom:5px;line-height:14px;font-size:12px;color:#CCCCCC;"></td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;">
                                            <tbody>
                                                <tr style="border-collapse:collapse;">
                                                    <td style="padding:0;Margin:0;background-color:#FAFAFA;" bgcolor="#fafafa" align="center">
                                                        <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                                                            <tbody>
                                                                <tr style="border-collapse:collapse;">
                                                                    <td style="Margin:0;padding-top:10px;padding-left:20px;padding-right:20px;padding-bottom:30px;border-radius:10px 10px 0px 0px;background-color: #3D5CA3;background-position:left top;" bgcolor="transparent" align="left">
                                                                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                                            <tbody>
                                                                                <tr style="border-collapse:collapse;">
                                                                                    <td width="560" valign="top" align="center" style="padding:0;Margin:0;">
                                                                                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                                                            <tbody>
                                                                                                <tr style="border-collapse:collapse;"> </tr>
                                                                                                <tr style="border-collapse:collapse;">
                                                                                                    <td align="center" style="padding:0;Margin:0;padding-top:10px;">
                                                                                                        <h1 style="margin:0;
                font-weight: 300;
                line-height: 1.2;
                font-size: 3rem;
                font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji';
                font-style:normal;
                color:#FFFFFF;
                ">Ur-Services24</h1>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr style="border-collapse:collapse;"> </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                <tr style="border-collapse:collapse;">
                                                                    <td style="padding:0;Margin:0;padding-left:20px;padding-right:20px;padding-top:40px;background-color:transparent;background-position:left top;" bgcolor="transparent" align="left">
                                                                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                                            <tbody>
                                                                                <tr style="border-collapse:collapse;">
                                                                                    <td width="560" valign="top" align="center" style="padding:0;Margin:0;">
                                                                                        <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-position:left top;" width="100%" cellspacing="0" cellpadding="0">
                                                                                            <tbody>
                                                                                                <tr style="border-collapse:collapse;">
                                                                                                    <td align="center" style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px;"><img src="https://qbsgq.stripocdn.email/content/guids/CABINET_905af03e8709229f1b10ad7414dc1531/images/23891556799905703.png" alt="" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;"
                                                                                                            width="160" height="189.92"></td>
                                                                                                </tr>
                                                                                                <tr style="border-collapse:collapse;">
                                                                                                    <td align="center" style="padding:0;Margin:0;padding-top:15px;padding-bottom:15px;">
                                                                                                        <h1 style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:20px;font-style:normal;font-weight:normal;color:#333333;"><strong>Définir votre mot de passe</strong></h1>
                
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr style="border-collapse:collapse;">
                                                                                                    <td align="center" style="padding:0;Margin:0;padding-left:40px;padding-right:40px;">
                                                                                                        <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:24px;color:#666666;">Cher,&nbsp;` + email + `</p>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr style="border-collapse:collapse;">
                                                                                                    <td align="center" style="padding:0;Margin:0;padding-right:35px;padding-left:40px;">
                                                                                                        <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:24px;color:#666666;">Il y a eu une demande d'oubli du mot de passe. Si vous n'avez pas fait cette demande, ignorez-la</p>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr style="border-collapse:collapse;">
                                                                                                    <td align="center" style="padding:0;Margin:0;padding-top:25px;padding-left:40px;padding-right:40px;">
                                                                                                        <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:24px;color:#666666;">Si vous n'avez pas fait cette demande, ignorez simplement cet e-mail. Sinon, appuyez sur le bouton ci-dessous pour changer votre mot de passe</p>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr style="border-collapse:collapse;">
                                                                                                    <td align="center" style="Margin:0;padding-left:10px;padding-right:10px;padding-top:40px;padding-bottom:40px;"><span class="es-button-border" style="border-style:solid;border-color:#3D5CA3;background:#FFFFFF;border-width:2px;display:inline-block;border-radius:10px;width:auto;"><a href="` + link_setregister + `" class="es-button" target="_blank" style="mso-style-priority:100
                    !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;color:#3D5CA3;border-style:solid;border-color:#FFFFFF;border-width:15px 20px 15px 20px;display:inline-block;background:#FFFFFF;border-radius:10px;font-weight:bold;font-style:normal;line-height:17px;width:auto;text-align:center;">changer le mot de passe</a></span></td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </body>
                
                </html>`;

                var mailOptions = {
                    from: 'Ahmedsendmail99@gmail.com',
                    to: email,
                    subject: 'Services System',
                    html: templeteHtml
                }

            }

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log('error sent: ' + error);
                    return res.send({ error: true, msg: error });
                } else {
                    console.log('Email sent: ' + info.response);
                    res.status(200).send({ msg: "courrier envoyé à: " + email });
                }
            });








        })

    },
    addminforgetpasspage: (req, res) => {
        var email = req.params.email;
        var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + port;


        res.render("AdminSet_password.ejs", {
            email: email,
            urlMain: url
        });
    },
    Clientforgetpasspage: (req, res) => {
        var email = req.params.email;
        var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + port;


        res.render("ClientSet_password.ejs", {
            email: email,
            urlMain: url
        });
    },
    upadeadminpassword: (req, res) => {

        let password = req.body.password,
            confirmpassword = req.body.confirm,
            email = req.body.email;

        if (password == confirmpassword) {
            Admin.update({ password: password }, { where: { email: email } })
                .then(result => {
                    return res.status(200).send({ error: false, msg: "mot de passe mis à jour, vous pouvez vous connecter maintenant." });
                })
                .catch(err => {
                    return res.status(400).send({ error: true, msg: err });
                })
        } else {
            return res.status(400).send({ error: true, msg: "Le mot de passe ne correspond pas" });

        }


    },
    getforgetpasswordadmin: (req, res) => {

        var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + port;


        res.render("forget_password.ejs", {
            urlMain: url
        });
    },
    getforgetpasswordclient: (req, res) => {

        var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + port;


        res.render("clientForgetPassword.ejs", {
            urlMain: url
        });
    },
    clientforgetpassSendmail: (req, res) => {
        var email = req.body.email;

        Client.findAll({
            where: {
                email: email
            },
            attributes: ['email'],
        }).then(function(result) {
            //res.status(200).json(result);
            console.log("result.length: ", result.length);
            if (result.length == 0)
                return res.status(403).send({ msg: "Aucun compte trouvé" });
            else {


                var link_setregister = urlDashBoard + '/client/Clientforgetpasspage/' + email;

                var templeteHtml = `<html style="width:100%;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0;">

                <head>
                    <meta charset="UTF-8">
                    <meta content="width=device-width, initial-scale=1" name="viewport">
                    <meta name="x-apple-disable-message-reformatting">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta content="telephone=no" name="format-detection">
                    <title>New Template</title>
                    <!--[if (mso 16)]><style type="text/css"> a {text-decoration: none;} </style><![endif]-->
                    <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
                    <style type="text/css">
                        @media only screen and (max-width:600px) {
                            p,
                            ul li,
                            ol li,
                            a {
                                font-size: 16px!important;
                                line-height: 150%!important
                            }
                            h1 {
                                font-size: 20px!important;
                                text-align: center;
                                line-height: 120%!important
                            }
                            h2 {
                                font-size: 16px!important;
                                text-align: left;
                                line-height: 120%!important
                            }
                            h3 {
                                font-size: 20px!important;
                                text-align: center;
                                line-height: 120%!important
                            }
                            h1 a {
                                font-size: 20px!important
                            }
                            h2 a {
                                font-size: 16px!important;
                                text-align: left
                            }
                            h3 a {
                                font-size: 20px!important
                            }
                            .es-menu td a {
                                font-size: 14px!important
                            }
                            .es-header-body p,
                            .es-header-body ul li,
                            .es-header-body ol li,
                            .es-header-body a {
                                font-size: 10px!important
                            }
                            .es-footer-body p,
                            .es-footer-body ul li,
                            .es-footer-body ol li,
                            .es-footer-body a {
                                font-size: 12px!important
                            }
                            .es-infoblock p,
                            .es-infoblock ul li,
                            .es-infoblock ol li,
                            .es-infoblock a {
                                font-size: 12px!important
                            }
                            *[class="gmail-fix"] {
                                display: none!important
                            }
                            .es-m-txt-c,
                            .es-m-txt-c h1,
                            .es-m-txt-c h2,
                            .es-m-txt-c h3 {
                                text-align: center!important
                            }
                            .es-m-txt-r,
                            .es-m-txt-r h1,
                            .es-m-txt-r h2,
                            .es-m-txt-r h3 {
                                text-align: right!important
                            }
                            .es-m-txt-l,
                            .es-m-txt-l h1,
                            .es-m-txt-l h2,
                            .es-m-txt-l h3 {
                                text-align: left!important
                            }
                            .es-m-txt-r img,
                            .es-m-txt-c img,
                            .es-m-txt-l img {
                                display: inline!important
                            }
                            .es-button-border {
                                display: block!important
                            }
                            a.es-button {
                                font-size: 14px!important;
                                display: block!important;
                                border-left-width: 0px!important;
                                border-right-width: 0px!important
                            }
                            .es-btn-fw {
                                border-width: 10px 0px!important;
                                text-align: center!important
                            }
                            .es-adaptive table,
                            .es-btn-fw,
                            .es-btn-fw-brdr,
                            .es-left,
                            .es-right {
                                width: 100%!important
                            }
                            .es-content table,
                            .es-header table,
                            .es-footer table,
                            .es-content,
                            .es-footer,
                            .es-header {
                                width: 100%!important;
                                max-width: 600px!important
                            }
                            .es-adapt-td {
                                display: block!important;
                                width: 100%!important
                            }
                            .adapt-img {
                                width: 100%!important;
                                height: auto!important
                            }
                            .es-m-p0 {
                                padding: 0px!important
                            }
                            .es-m-p0r {
                                padding-right: 0px!important
                            }
                            .es-m-p0l {
                                padding-left: 0px!important
                            }
                            .es-m-p0t {
                                padding-top: 0px!important
                            }
                            .es-m-p0b {
                                padding-bottom: 0!important
                            }
                            .es-m-p20b {
                                padding-bottom: 20px!important
                            }
                            .es-mobile-hidden,
                            .es-hidden {
                                display: none!important
                            }
                            .es-desk-hidden {
                                display: table-row!important;
                                width: auto!important;
                                overflow: visible!important;
                                float: none!important;
                                max-height: inherit!important;
                                line-height: inherit!important
                            }
                            .es-desk-menu-hidden {
                                display: table-cell!important
                            }
                            table.es-table-not-adapt,
                            .esd-block-html table {
                                width: auto!important
                            }
                            table.es-social {
                                display: inline-block!important
                            }
                            table.es-social td {
                                display: inline-block!important
                            }
                        }
                        
                        #outlook a {
                            padding: 0;
                        }
                        
                        .ExternalClass {
                            width: 100%;
                        }
                        
                        .ExternalClass,
                        .ExternalClass p,
                        .ExternalClass span,
                        .ExternalClass font,
                        .ExternalClass td,
                        .ExternalClass div {
                            line-height: 100%;
                        }
                        
                        .es-button {
                            mso-style-priority: 100!important;
                            text-decoration: none!important;
                        }
                        
                        a[x-apple-data-detectors] {
                            color: inherit!important;
                            text-decoration: none!important;
                            font-size: inherit!important;
                            font-family: inherit!important;
                            font-weight: inherit!important;
                            line-height: inherit!important;
                        }
                        
                        .es-desk-hidden {
                            display: none;
                            float: left;
                            overflow: hidden;
                            width: 0;
                            max-height: 0;
                            line-height: 0;
                            mso-hide: all;
                        }
                        
                        .es-button-border:hover a.es-button {
                            background: #ffffff!important;
                            border-color: #ffffff!important;
                        }
                        
                        .es-button-border:hover {
                            background: #ffffff!important;
                            border-style: solid solid solid solid!important;
                            border-color: #3d5ca3 #3d5ca3 #3d5ca3 #3d5ca3!important;
                        }
                    </style>
                </head>
                
                <body style="width:100%;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0;">
                    <div class="es-wrapper-color" style="background-color:#FAFAFA;">
                        <!--[if gte mso 9]><v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t"> <v:fill type="tile" color="#fafafa"></v:fill> </v:background><![endif]-->
                        <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;">
                            <tbody>
                                <tr style="border-collapse:collapse;">
                                    <td valign="top" style="padding:0;Margin:0;">
                                        <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;">
                                            <tbody>
                                                <tr style="border-collapse:collapse;">
                                                    <td class="es-info-area" style="padding:0;Margin:0;background-color:#FAFAFA;" bgcolor="#fafafa" align="center">
                                                        <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FAFAFA;" width="600" cellspacing="0" cellpadding="0" bgcolor="#fafafa" align="center">
                                                            <tbody>
                                                                <tr style="border-collapse:collapse;">
                                                                    <td style="Margin:0;padding-bottom:5px;padding-top:20px;padding-left:20px;padding-right:20px;background-position:left top;" align="left">
                                                                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                                            <tbody>
                                                                                <tr style="border-collapse:collapse;">
                                                                                    <td width="560" valign="top" align="center" style="padding:0;Margin:0;">
                                                                                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                                                            <tbody>
                                                                                                <tr style="border-collapse:collapse;">
                                                                                                    <td class="es-infoblock" align="center" style="padding:0;Margin:0;padding-bottom:5px;line-height:14px;font-size:12px;color:#CCCCCC;"></td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;">
                                            <tbody>
                                                <tr style="border-collapse:collapse;">
                                                    <td style="padding:0;Margin:0;background-color:#FAFAFA;" bgcolor="#fafafa" align="center">
                                                        <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                                                            <tbody>
                                                                <tr style="border-collapse:collapse;">
                                                                    <td style="Margin:0;padding-top:10px;padding-left:20px;padding-right:20px;padding-bottom:30px;border-radius:10px 10px 0px 0px;background-color: #3D5CA3;background-position:left top;" bgcolor="transparent" align="left">
                                                                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                                            <tbody>
                                                                                <tr style="border-collapse:collapse;">
                                                                                    <td width="560" valign="top" align="center" style="padding:0;Margin:0;">
                                                                                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                                                            <tbody>
                                                                                                <tr style="border-collapse:collapse;"> </tr>
                                                                                                <tr style="border-collapse:collapse;">
                                                                                                    <td align="center" style="padding:0;Margin:0;padding-top:10px;">
                                                                                                        <h1 style="margin:0;
                font-weight: 300;
                line-height: 1.2;
                font-size: 3rem;
                font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji';
                font-style:normal;
                color:#FFFFFF;
                ">Ur-Services24</h1>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr style="border-collapse:collapse;"> </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                <tr style="border-collapse:collapse;">
                                                                    <td style="padding:0;Margin:0;padding-left:20px;padding-right:20px;padding-top:40px;background-color:transparent;background-position:left top;" bgcolor="transparent" align="left">
                                                                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;">
                                                                            <tbody>
                                                                                <tr style="border-collapse:collapse;">
                                                                                    <td width="560" valign="top" align="center" style="padding:0;Margin:0;">
                                                                                        <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-position:left top;" width="100%" cellspacing="0" cellpadding="0">
                                                                                            <tbody>
                                                                                                <tr style="border-collapse:collapse;">
                                                                                                    <td align="center" style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px;"><img src="https://qbsgq.stripocdn.email/content/guids/CABINET_905af03e8709229f1b10ad7414dc1531/images/23891556799905703.png" alt="" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;"
                                                                                                            width="160" height="189.92"></td>
                                                                                                </tr>
                                                                                                <tr style="border-collapse:collapse;">
                                                                                                    <td align="center" style="padding:0;Margin:0;padding-top:15px;padding-bottom:15px;">
                                                                                                        <h1 style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:20px;font-style:normal;font-weight:normal;color:#333333;"><strong>Définir votre mot de passe</strong></h1>
                
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr style="border-collapse:collapse;">
                                                                                                    <td align="center" style="padding:0;Margin:0;padding-left:40px;padding-right:40px;">
                                                                                                        <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:24px;color:#666666;">Cher,&nbsp;` + email + `</p>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr style="border-collapse:collapse;">
                                                                                                    <td align="center" style="padding:0;Margin:0;padding-right:35px;padding-left:40px;">
                                                                                                        <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:24px;color:#666666;">Il y a eu une demande d'oubli du mot de passe. Si vous n'avez pas fait cette demande, ignorez-la</p>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr style="border-collapse:collapse;">
                                                                                                    <td align="center" style="padding:0;Margin:0;padding-top:25px;padding-left:40px;padding-right:40px;">
                                                                                                        <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:16px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:24px;color:#666666;">Si vous n'avez pas fait cette demande, ignorez simplement cet e-mail. Sinon, appuyez sur le bouton ci-dessous pour changer votre mot de passe</p>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr style="border-collapse:collapse;">
                                                                                                    <td align="center" style="Margin:0;padding-left:10px;padding-right:10px;padding-top:40px;padding-bottom:40px;"><span class="es-button-border" style="border-style:solid;border-color:#3D5CA3;background:#FFFFFF;border-width:2px;display:inline-block;border-radius:10px;width:auto;"><a href="` + link_setregister + `" class="es-button" target="_blank" style="mso-style-priority:100
                    !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;color:#3D5CA3;border-style:solid;border-color:#FFFFFF;border-width:15px 20px 15px 20px;display:inline-block;background:#FFFFFF;border-radius:10px;font-weight:bold;font-style:normal;line-height:17px;width:auto;text-align:center;">changer le mot de passe</a></span></td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </body>
                
                </html>`;

                var mailOptions = {
                    from: 'Ahmedsendmail99@gmail.com',
                    to: email,
                    subject: 'Services System',
                    html: templeteHtml
                }

            }

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log('error sent: ' + error);
                    return res.send({ error: true, msg: error });
                } else {
                    console.log('Email sent: ' + info.response);
                    res.status(200).send({ msg: "courrier envoyé à: " + email });
                }
            });








        })

    },
    upadeclinetforgetpassword: (rec, res) => {
        let password = req.body.password,
            confirmpassword = req.body.confirm,
            email = req.body.email;

        if (password == confirmpassword) {
            Client.update({ password: password }, { where: { email: email } })
                .then(result => {
                    return res.status(200).send({ error: false, msg: "mot de passe mis à jour, vous pouvez vous connecter maintenant." });
                })
                .catch(err => {
                    return res.status(400).send({ error: true, msg: err });
                })
        } else {
            return res.status(400).send({ error: true, msg: "Le mot de passe ne correspond pas" });

        }
    },
    getisclientdata: (req, res) => {
        var c_id = req.params.id;
        ClientData.findAll({ where: { C_id: C_id } }).then(result => {
            if (result == "") {
                res.status(400).send({ msg: "No peofile " })
            } else {
                res.status(200).send({ msg: result })
            }

        })


    },
    getpage404: (req, res) => {
        var url = req.connection.encrypted ? 'https://' : 'http://' + req.hostname + ':' + port;

        res.render("404.ejs", {

            urlMain: url
        });
    }



}