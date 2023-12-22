## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

### Video instructions
For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4
 
### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application 
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder 
2. Run `npm install` to install all the depedencies 
3. Run `node index` to start the server 

The application should connect to the default server port (3042) automatically! 

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.


## addresses

### user 1
🚀 walletAddress: 0x4733a0f04f314a1aab50d0754e29ecc3d1690223
🚀 publicKey: 02122d626596b81f30e235a89d4733a0f04f314a1aab50d0754e29ecc3d1690223
🚀 privateKey: 1ae1b76b30e719ddd81570d5a201229cf28ec7bca41dcb7a95710be9d2b5f841
🚀 signature: Signature {
  r: 74092588920072894420328729958492068861878908974367099913742249027472102183961n,
  s: 30812749794044764162932425690112051122929645797786357717765732891146231344027n,
  recovery: 0
}
🚀 signatureString: a3ceeb516d48b53e7b2a9196db479f31fa8a9367ba11b28c3f1db9de1d6ed419441f65fa8e7f937f29492c7bc1c9432249c01f73f0c4a1c2f6e9dd961f19eb9b


### user 2
🚀 walletAddress: 0x7ad1bdc849895bd9f5af138b7a0201f879175193
🚀 publicKey: 033b243aac2778900fb0ab61107ad1bdc849895bd9f5af138b7a0201f879175193
🚀 privateKey: 4b6c0b2b06f6f03f073ef019df99f16cb0688a81f3c8ab0e936eab6a252e2ef8
🚀 signature: Signature {
  r: 14815477325611025797765518265065237855802206894024036016857360653070652672478n,
  s: 45853930059568725711591237547751826178768041487017136939259274368537792734123n,
  recovery: 0
}
🚀 signatureString: 20c14354371b923bc9b711c8cd0b08a811a8a8b6c7e696fdcf46a2afbf2c09de6560679a19f76b2caec2f42595dbd448fea0cf7e89a0d7461160e9c7dfb9e3ab

### user 3
🚀 walletAddress: 0x1eec3d8d8b93c3655cebca24d9c5df18861f95bd
🚀 publicKey: 025356f46d25afb4b650446d0b1eec3d8d8b93c3655cebca24d9c5df18861f95bd
🚀 privateKey: 3e5305c30eb5fc7ca339fa2b9ee042081e26bef55ec326159ecee51ac4a43f0b
🚀 signature: Signature {
  r: 99715682530648718160165077218888879465168518741820159204710541863482064820015n,
  s: 53793292940186324423926534719770578300876093990752165002726204920088939286140n,
  recovery: 0
}
🚀 signatureString: dc751385a073a8b103dea54702166435a7569fcc57790777d7ca8adc5312d72f76edecc2650aa339238ad684bb24664ee9370b26cd238a73a5811e1c6c694e7c


# TODO 
- Need to handle the errors on the FE
  - When address and signature do not match and not valid on load balance
  - When address and signature do not match and not valid on transaction
  - When not enough funds 