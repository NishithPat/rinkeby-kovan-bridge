const TokenA = artifacts.require("TokenA");
const TokenB = artifacts.require("TokenB");

module.exports = async function (deployer, network, accounts) {

    if (network === "rinkeby") {
        await deployer.deploy(TokenA, "TokenARinkeby", "TokenA", web3.utils.toWei("1000000", "ether"));
    }
    if (network === "kovan") {
        await deployer.deploy(TokenB, "TokenBKovan", "TokenB", web3.utils.toWei("1000000", "ether"));
    }
};