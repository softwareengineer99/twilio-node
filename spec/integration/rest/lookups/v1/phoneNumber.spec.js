'use strict';

var _ = require('lodash');  /* jshint ignore:line */
var Holodeck = require('../../../holodeck');  /* jshint ignore:line */
var Request = require(
    '../../../../../lib/http/request');  /* jshint ignore:line */
var Response = require(
    '../../../../../lib/http/response');  /* jshint ignore:line */
var RestException = require(
    '../../../../../lib/base/RestException');  /* jshint ignore:line */
var Twilio = require('../../../../../lib');  /* jshint ignore:line */


var client;
var holodeck;

describe('PhoneNumber', function() {
  beforeEach(function() {
    holodeck = new Holodeck();
    client = new Twilio('ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'AUTHTOKEN', {
      httpClient: holodeck
    });
  });
  it('should generate valid fetch request',
    function() {
      holodeck.mock(new Response(500, '{}'));

      var promise = client.lookups.v1.phoneNumbers('+987654321').fetch();
      promise = promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
      });
      promise.done();

      var solution = {
        phoneNumber: '+987654321'
      };
      var url = _.template('https://lookups.twilio.com/v1/PhoneNumbers/<%= phoneNumber %>')(solution);

      holodeck.assertHasRequest(new Request({
        method: 'GET',
        url: url
      }));
    }
  );
  it('should generate valid fetch response',
    function() {
      var body = JSON.stringify({
          'caller_name': {
              'caller_name': 'Delicious Cheese Cake',
              'caller_type': 'CONSUMER',
              'error_code': null
          },
          'carrier': {
              'error_code': null,
              'mobile_country_code': '310',
              'mobile_network_code': '456',
              'name': 'verizon',
              'type': 'mobile'
          },
          'country_code': 'US',
          'national_format': '(510) 867-5309',
          'phone_number': '+15108675309',
          'add_ons': {
              'status': 'successful',
              'message': null,
              'code': null,
              'results': {}
          },
          'url': 'https://lookups.twilio.com/v1/PhoneNumbers/phone_number'
      });

      holodeck.mock(new Response(200, body));

      var promise = client.lookups.v1.phoneNumbers('+987654321').fetch();
      promise = promise.then(function(response) {
        expect(response).toBeDefined();
      }, function() {
        throw new Error('failed');
      });

      promise.done();
    }
  );
});

