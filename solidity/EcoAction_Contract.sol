//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.7.0;

contract EcoAction2Coin{

    address payable creator;
    address payable administrator;

    mapping(address => uint) public balances;
    
    uint tokenValue;

    struct item {
      string wasteFacilities;
      uint timestamp;
      uint amount;
      bool isPositive;
   }

    mapping(address => item[]) public itemAccounts;
    
    string public constant name = "EcoAction";
    string public constant symbol = "EAs";

    constructor(){
        creator = msg.sender;
        tokenValue = 10000000000000;
    }
    
    function setAdministrator (address payable addr) public{
        require(msg.sender == creator);
        
        administrator = addr;
    }
    
    function tokenGeneration(address buyer, uint timestamp) public payable{
        balances[buyer] += msg.value;
        itemAccounts[buyer].push(item("In",timestamp,msg.value,true));
    }
    
    function tokenTransfer(address addrSRC, address addrDST, uint q, uint comission, uint timestamp) public{
        require(msg.sender == administrator);
        require(balances[addrSRC] >= q);
        
        balances[addrSRC] = balances[addrSRC] - q - comission;
        balances[addrDST] += q;
        
        itemAccounts[addrDST].push(item(toString(addrSRC),timestamp,q,true));
        itemAccounts[addrSRC].push(item(toString(addrDST),timestamp,q+comission,false));
        
        msg.sender.transfer(comission);
    }
    
    function tokenTransferAward(address addrSRC, address payable addrDST, uint q, uint comission, uint timestamp) public{
        require(msg.sender == administrator);
        require(balances[addrSRC] >= q);
        
        balances[addrSRC] = balances[addrSRC] - q - comission;
        itemAccounts[addrSRC].push(item(toString(addrDST),timestamp,q+comission,false));
        
        addrDST.transfer(q);
        msg.sender.transfer(comission);
    }
    
    
    function tokenSpend(address payable addrDST, uint timestamp) public{
        
        require(msg.sender == creator || msg.sender == administrator);
        
        addrDST.transfer(balances[msg.sender]);
        itemAccounts[msg.sender].push(item(toString(addrDST),timestamp,balances[msg.sender],false));
        balances[msg.sender] = 0;
    }
    
    function adminTokenTransfer(address addrSRC, address addrDST, uint q, uint timestamp, bool allTokens) public{
        require(msg.sender == creator || msg.sender == administrator);
        
        if(allTokens){
            if(balances[addrSRC] > 0){
                balances[addrDST] += balances[addrSRC];
                itemAccounts[addrDST].push(item(toString(addrSRC),timestamp,balances[addrSRC],true));
                
                itemAccounts[addrSRC].push(item(toString(addrDST),timestamp,balances[addrSRC],false));
                balances[addrSRC] = 0;
            }
        }
        else{
            if(balances[addrSRC] >= q){
                balances[addrSRC] -= q;
                itemAccounts[addrSRC].push(item(toString(addrDST),timestamp,q,false));
                
                balances[addrDST] += q;
                itemAccounts[addrDST].push(item(toString(addrSRC),timestamp,q,true));
            }
        }
    } 
    
    function setTokenValue(uint value) public{
         require(msg.sender == creator);
         if(value > 0){
            tokenValue = value;
         }
    }
    

    function getSizeItems(address client) public view returns (uint size) {
        size = itemAccounts[client].length;
    }

    function toString(address account) internal pure returns(string memory) {
        return toString(abi.encodePacked(account));
    }
    
    function toString(uint256 value) internal pure returns(string memory) {
        return toString(abi.encodePacked(value));
    }
    
    function toString(bytes32 value) internal pure returns(string memory) {
        return toString(abi.encodePacked(value));
    }
    
    function toString(bytes memory data) internal pure returns(string memory) {
        bytes memory alphabet = "0123456789abcdef";
    
        bytes memory str = new bytes(2 + data.length * 2);
        str[0] = "0";
        str[1] = "x";
        for (uint i = 0; i < data.length; i++) {
            str[2+i*2] = alphabet[uint(uint8(data[i] >> 4))];
            str[3+i*2] = alphabet[uint(uint8(data[i] & 0x0f))];
        }
        return string(str);
    }
    
    function destroy() public{
        require(msg.sender == creator); //Only the owner can destroy the contract
        selfdestruct(creator); //Send contract accumulated ethers to the owner
    }

}

