'use strict';

const express = require('express');
const bodyParser = require('body-parser');


const restService = express();
restService.use(bodyParser.json());

restService.post('/hook', function (req, res) {

    console.log('hook request');

    try {
        var speech = 'empty speech';
        var  nombre = '';
        var dirempresa = '';

        if (req.body) {
            var requestBody = req.body;

            if (requestBody.result) {
                speech = '';

                if (requestBody.result.fulfillment) {
                    speech += requestBody.result.parameters.nombre_empresa;
                    nombre += requestBody.result.parameters.nombre_empresa;
                    dirempresa += requestBody.result.parameters.direccion_empresa;
                    speech += ' ';
                    
                    restService.get('http://writedocuments.azurewebsites.net/template.php?nombre=nombre&direccion=dirempresa&municipio=tolima&provincia=pruebas&cp=1000&telefono=2629831', function(req, res) {
                            res.send();
                    });
                    
                }

                if (requestBody.result.action) {
                    speech += 'action: ' + requestBody.result.action;
                }
            }
        }

        console.log('result: ', speech);

        return res.json({
            speech: speech,
            displayText: speech,
            source: 'apiai-webhook-jjh'
        });
    } catch (err) {
        console.error("Can't process request", err);

        return res.status(400).json({
            status: {
                code: 400,
                errorType: err.message
            }
        });
    }
});



restService.listen((process.env.PORT || 5000), function () {
    console.log("Server listening");
});
