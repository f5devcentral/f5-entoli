


// idea here is to create a simple password vault

// keytar is proving problematic to install and use outside of vscode

// I think it is very important to manage passwords for work flows


/**
 * ideas:
 * - create a DB object to hold the device/passwords
 * - use a passphrase or ssh key to encrypt/decrypt the db object
 * - When the db object is decrypted, host it in a service running in memory so it will be active for then entire session
 *  - can put in a timer to kill the service after so long
 *  - should connect to this service over a socket
 */


// https://www.sohamkamani.com/nodejs/rsa-encryption/