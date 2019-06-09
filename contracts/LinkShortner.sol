pragma solidity ^0.5.0;

contract LinkShortner {
  event LinkAdded(uint linkId, string url);
  uint lastLinkId;

  struct LinkTemplate {
		address userAddress;
		string url;
	}

  mapping (uint => LinkTemplate) public linkMapping;

  constructor() public {
		lastLinkId = 0;
	}

  function createNewLink(string memory url) public returns (uint) {
	  lastLinkId++;
		linkMapping[lastLinkId] = LinkTemplate(msg.sender, url);
    emit LinkAdded(lastLinkId, url);
		return lastLinkId;
	}

  function getLink(uint linkId) public view returns(address, string memory) {
		LinkTemplate memory link = linkMapping[linkId];
		return(link.userAddress, link.url);
	}

}
