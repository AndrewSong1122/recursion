// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  // your code here
  var dom = document.body;
  var classElements = [];

  var recurseNodes = function(node)
  {
  	if(node.classList && node.classList.contains(className))
  	{
  		classElements.push(node);
  	}
  	if(node.childNodes)
  	{
  		for(var i = 0; i < node.childNodes.length; i++)
  		{
  			recurseNodes(node.childNodes[i]);
  		}
  	}
  }

  recurseNodes(dom);
  return classElements;
};

