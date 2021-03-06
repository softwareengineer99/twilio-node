'use strict';

var _ = require('lodash');  /* jshint ignore:line */
var Holodeck = require('../../../../../holodeck');  /* jshint ignore:line */
var Request = require(
    '../../../../../../../lib/http/request');  /* jshint ignore:line */
var Response = require(
    '../../../../../../../lib/http/response');  /* jshint ignore:line */
var RestException = require(
    '../../../../../../../lib/base/RestException');  /* jshint ignore:line */
var Twilio = require('../../../../../../../lib');  /* jshint ignore:line */


var client;
var holodeck;

describe('Message', function() {
  beforeEach(function() {
    holodeck = new Holodeck();
    client = new Twilio('ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'AUTHTOKEN', {
      httpClient: holodeck
    });
  });
  it('should generate valid fetch request',
    function() {
      holodeck.mock(new Response(500, '{}'));

      var promise = client.ipMessaging.v1.services('ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                         .channels('CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                         .messages('IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa').fetch();
      promise = promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
      });
      promise.done();

      var solution = {
        serviceSid: 'ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        channelSid: 'CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        sid: 'IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      };
      var url = _.template('https://chat.twilio.com/v1/Services/<%= serviceSid %>/Channels/<%= channelSid %>/Messages/<%= sid %>')(solution);

      holodeck.assertHasRequest(new Request({
        method: 'GET',
        url: url
      }));
    }
  );
  it('should generate valid fetch response',
    function() {
      var body = JSON.stringify({
          'sid': 'IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'service_sid': 'ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'to': 'CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'channel_sid': 'CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'date_created': '2016-03-24T20:37:57Z',
          'date_updated': '2016-03-24T20:37:57Z',
          'was_edited': false,
          'from': 'system',
          'attributes': '{}',
          'body': 'Hello',
          'index': 0,
          'url': 'https://chat.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      });

      holodeck.mock(new Response(200, body));

      var promise = client.ipMessaging.v1.services('ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                         .channels('CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                         .messages('IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa').fetch();
      promise = promise.then(function(response) {
        expect(response).toBeDefined();
      }, function() {
        throw new Error('failed');
      });

      promise.done();
    }
  );
  it('should generate valid create request',
    function() {
      holodeck.mock(new Response(500, '{}'));

      var opts = {
        body: 'body'
      };
      var promise = client.ipMessaging.v1.services('ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                         .channels('CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                         .messages.create(opts);
      promise = promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
      });
      promise.done();

      var solution = {
        serviceSid: 'ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        channelSid: 'CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      };
      var url = _.template('https://chat.twilio.com/v1/Services/<%= serviceSid %>/Channels/<%= channelSid %>/Messages')(solution);

      var values = {
        Body: 'body',
      };
      holodeck.assertHasRequest(new Request({
          method: 'POST',
          url: url,
          data: values
      }));
    }
  );
  it('should generate valid create response',
    function() {
      var body = JSON.stringify({
          'sid': 'IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'service_sid': 'ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'to': 'CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'channel_sid': 'CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'attributes': null,
          'date_created': '2016-03-24T20:37:57Z',
          'date_updated': '2016-03-24T20:37:57Z',
          'was_edited': false,
          'from': 'system',
          'body': 'Hello',
          'index': 0,
          'url': 'https://chat.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      });

      holodeck.mock(new Response(201, body));

      var opts = {
        body: 'body'
      };
      var promise = client.ipMessaging.v1.services('ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                         .channels('CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                         .messages.create(opts);
      promise = promise.then(function(response) {
        expect(response).toBeDefined();
      }, function() {
        throw new Error('failed');
      });

      promise.done();
    }
  );
  it('should generate valid create_with_attributes response',
    function() {
      var body = JSON.stringify({
          'sid': 'IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'service_sid': 'ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'to': 'CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'channel_sid': 'CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'date_created': '2016-03-24T20:37:57Z',
          'date_updated': '2016-03-24T20:37:57Z',
          'was_edited': false,
          'from': 'system',
          'attributes': '{}',
          'body': 'Hello',
          'index': 0,
          'url': 'https://chat.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      });

      holodeck.mock(new Response(201, body));

      var opts = {
        body: 'body'
      };
      var promise = client.ipMessaging.v1.services('ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                         .channels('CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                         .messages.create(opts);
      promise = promise.then(function(response) {
        expect(response).toBeDefined();
      }, function() {
        throw new Error('failed');
      });

      promise.done();
    }
  );
  it('should generate valid list request',
    function() {
      holodeck.mock(new Response(500, '{}'));

      var promise = client.ipMessaging.v1.services('ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                         .channels('CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                         .messages.list();
      promise = promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
      });
      promise.done();

      var solution = {
        serviceSid: 'ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        channelSid: 'CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      };
      var url = _.template('https://chat.twilio.com/v1/Services/<%= serviceSid %>/Channels/<%= channelSid %>/Messages')(solution);

      holodeck.assertHasRequest(new Request({
        method: 'GET',
        url: url
      }));
    }
  );
  it('should generate valid read_full response',
    function() {
      var body = JSON.stringify({
          'meta': {
              'page': 0,
              'page_size': 50,
              'first_page_url': 'https://chat.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages?PageSize=50&Page=0',
              'previous_page_url': null,
              'url': 'https://chat.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages?PageSize=50&Page=0',
              'next_page_url': null,
              'key': 'messages'
          },
          'messages': [
              {
                  'sid': 'IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'service_sid': 'ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'to': 'CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'channel_sid': 'CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'date_created': '2016-03-24T20:37:57Z',
                  'date_updated': '2016-03-24T20:37:57Z',
                  'was_edited': false,
                  'from': 'system',
                  'attributes': '{}',
                  'body': 'Hello',
                  'index': 0,
                  'url': 'https://chat.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
              }
          ]
      });

      holodeck.mock(new Response(200, body));

      var promise = client.ipMessaging.v1.services('ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                         .channels('CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                         .messages.list();
      promise = promise.then(function(response) {
        expect(response).toBeDefined();
      }, function() {
        throw new Error('failed');
      });

      promise.done();
    }
  );
  it('should generate valid read_empty response',
    function() {
      var body = JSON.stringify({
          'meta': {
              'page': 0,
              'page_size': 50,
              'first_page_url': 'https://chat.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages?PageSize=50&Page=0',
              'previous_page_url': null,
              'url': 'https://chat.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages?PageSize=50&Page=0',
              'next_page_url': null,
              'key': 'messages'
          },
          'messages': []
      });

      holodeck.mock(new Response(200, body));

      var promise = client.ipMessaging.v1.services('ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                         .channels('CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                         .messages.list();
      promise = promise.then(function(response) {
        expect(response).toBeDefined();
      }, function() {
        throw new Error('failed');
      });

      promise.done();
    }
  );
  it('should generate valid remove request',
    function() {
      holodeck.mock(new Response(500, '{}'));

      var promise = client.ipMessaging.v1.services('ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                         .channels('CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                         .messages('IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa').remove();
      promise = promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
      });
      promise.done();

      var solution = {
        serviceSid: 'ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        channelSid: 'CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        sid: 'IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      };
      var url = _.template('https://chat.twilio.com/v1/Services/<%= serviceSid %>/Channels/<%= channelSid %>/Messages/<%= sid %>')(solution);

      holodeck.assertHasRequest(new Request({
        method: 'DELETE',
        url: url
      }));
    }
  );
  it('should generate valid delete response',
    function() {
      var body = JSON.stringify(null);

      holodeck.mock(new Response(204, body));

      var promise = client.ipMessaging.v1.services('ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                         .channels('CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                         .messages('IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa').remove();
      promise = promise.then(function(response) {
        expect(response).toBe(true);
      }, function() {
        throw new Error('failed');
      });

      promise.done();
    }
  );
  it('should generate valid update request',
    function() {
      holodeck.mock(new Response(500, '{}'));

      var promise = client.ipMessaging.v1.services('ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                         .channels('CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                         .messages('IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa').update();
      promise = promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
      });
      promise.done();

      var solution = {
        serviceSid: 'ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        channelSid: 'CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        sid: 'IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      };
      var url = _.template('https://chat.twilio.com/v1/Services/<%= serviceSid %>/Channels/<%= channelSid %>/Messages/<%= sid %>')(solution);

      holodeck.assertHasRequest(new Request({
        method: 'POST',
        url: url
      }));
    }
  );
  it('should generate valid update response',
    function() {
      var body = JSON.stringify({
          'sid': 'IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'service_sid': 'ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'to': 'CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'channel_sid': 'CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'attributes': '{\'test\': \'test\'}',
          'date_created': '2016-03-24T20:37:57Z',
          'date_updated': '2016-03-24T20:37:57Z',
          'was_edited': false,
          'from': 'system',
          'body': 'Hello',
          'index': 0,
          'url': 'https://chat.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      });

      holodeck.mock(new Response(200, body));

      var promise = client.ipMessaging.v1.services('ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                         .channels('CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                         .messages('IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa').update();
      promise = promise.then(function(response) {
        expect(response).toBeDefined();
      }, function() {
        throw new Error('failed');
      });

      promise.done();
    }
  );
});

