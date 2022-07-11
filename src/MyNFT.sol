// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
//import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.4.0/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
//import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.4.0/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
//import "https://github.com/nibbstack/erc721/blob/2.6.1/src/contracts/ownership/ownable.sol";

contract MyNFT is ERC721URIStorage, Ownable {
	struct Item {
		address owner;
		address currentOwner;
		uint256 price;
		string uri;
		uint256 time;
	}
	using Counters for Counters.Counter;
	Counters.Counter private _tokenIds;	//NFT id

	uint256 itemCount = 0;

	mapping(uint256 => Item) public tokenIdToItem;
	
	constructor() ERC721("MyNFT", "CHJ") {}

    function mintWithURI(address to, string memory tokenURI) public returns(uint256) {
        _tokenIds.increment(); // add 1 by minting
        uint256 newTokenId = _tokenIds.current();
        _mint(to, newTokenId); // or _safeMint(to, newTokenId);
        _setTokenURI(newTokenId, tokenURI); // need to import ERC721URIStorage
		setTokenIdToItem(newTokenId, owner(), to, 0, tokenURI, block.timestamp);

        return newTokenId;
    }
	function mintWithIdURI(uint256 _id, address to, string memory tokenURI) public returns(uint256) {
		_mint(to, _id);
		_setTokenURI(_id, tokenURI);
		setTokenIdToItem(_id, owner(), to, 0, tokenURI, block.timestamp);

		return _id;
	}
	function myTransfer(address from, address to, uint256 _tokenId) public payable {
		require(_exists(_tokenId), "Error: TokenId not owned");
        require(msg.value >= tokenIdToItem[_tokenId].price, "Error: Token costs more");
        _transfer(from, to, _tokenId);
	}
	function setTokenIdToItem(uint256 _id, address _o, address _to, uint256 _p, string memory _uri, uint256 _t) public {
		Item memory i = Item(_o, _to, _p, _uri, _t);
		tokenIdToItem[_id] = i;
		itemCount++;
	}
	function getTokenIdToItem(uint256 tokenId) public view returns (address, address, uint256, string memory, uint256) {
		Item memory i = tokenIdToItem[tokenId];
		return (i.owner, i.currentOwner, i.price, i.uri, i.time);
	}
	function getItemsLength() public view returns (uint256) {
		return itemCount;
	}
	function getOwner() public view returns (address) {
		return owner();
	}
	function getTokenURI(uint256 tokenId) public view returns (string memory) {
		Item memory i = tokenIdToItem[tokenId];
		return i.uri;
	}
	function getTotalSupply() public view returns (uint256) {
		return _tokenIds.current();
	}
}
