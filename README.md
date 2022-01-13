# RSA + SHA256 Demo for request signing

This is a small demo to showcase how request signing can work with assymetric public-private key pairs. The basic idea is:

1. Generate signature of request body using private key
2. Attach signature to a header field in the request
3. On the server side, verify the signature using public key

This way, our customers do not need access to a secret key in order to verify that the message is received authentically from Contentstack.

# How to run demo

## Install modules

```
$ npm install
```

## Generate key pair

Running the following script will generate a RSA public-private key pair with 2048 bit length.

```
$ node generate-keys.js
```

## Run server

Executing the following script will run the server on port `3000` (customizable with `PORT` env variable) and listen for incoming requests:

```
$ node server.js
```

## Make requests to server

Execute the following script to make requests to the above server. You can customize the message that you send to the server as a argument.

```
$ node client.js "hello world"
Response: Received verified message: hello world
$
```

The response indicates that the server was able to successfully verify the request body.

Explore the code to understand in detail.