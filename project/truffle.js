/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a 
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() { 
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>') 
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */

module.exports = {
    networks: {
	development: {
	    host: "40.117.116.172",
	    port: 22000,
	    network_id: "*",
	    gasPrice: 0,
	    gas: 4500000
	},
	nodefour:  {
	    host: "40.117.116.172",
	    port: 22003,
	    network_id: "*", // Match any network id
	    gasPrice: 0,
	    gas: 4500000
	},
	nodeseven:  {
	    host: "40.117.116.172",
	    port: 22006,
	    network_id: "*", // Match any network id
	    gasPrice: 0,
	    gas: 4500000
	}
    }
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
};
