// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // your code goes here
  return getString(obj);
};

var stringifyObject = function(obj)
{

  var dupobj = {};
  for(var key in obj)
  {
  	dupobj[key] = obj[key];
  }

  var objkeys = Object.keys(dupobj);
  var key = objkeys[0];

  if(objkeys.length===0) return '{}';

  var leftside = getString(key)+':' + getString(dupobj[key]);

  if(notdef(dupobj[key]))
  {
  	delete dupobj[key];
  	if(objkeys.length === 1)
  	{
	  	if(arguments[1]===undefined)
	  	{
	  		return '{}';
	  	}
	  	else
	  	{
	  		return '}';
	  	}
  	}
  	else if (arguments[1] === true)
  	{
  		return '' + stringifyObject(dupobj,true);
  	}
  	else
  	{
  		return '{' + stringifyObject(dupobj,true);
  	}
  }

  delete dupobj[key];
  
  if(objkeys.length === 1)
  {
  	if(arguments[1]===undefined)
  	{
  		return '{'+leftside+'}';
  	}
  	else
  	{
  		return leftside+'}';
  	}
  }
  else if (arguments[1] === true)
  {
  	return leftside+','+stringifyObject(dupobj,true);
  }
  else
  {
  	return '{'+leftside+','+stringifyObject(dupobj,true);
  }
}

var stringifyArray = function(obj)
{
	if(obj.length===0) return '[]';

	var duparr = [];
	for(var i = 0; i < obj.length; i++)
	{
		duparr[i] = obj[i];
	}

	var leftside = getString(duparr[0]);
	var len = duparr.length;
	var duparr = duparr.slice(1);

	if(len === 1)
	{
		if(arguments[1]===undefined)
		{
			return '['+leftside+']';
		}
		else
		{
			return leftside + ']';
		}
	}
	else if(arguments[1]===true)
	{
		return leftside+','+stringifyArray(duparr,true);
	}
	else
	{
		return '['+leftside+','+stringifyArray(duparr,true);
	}
}

var getString = function(v)
{
	var type = typeof v;

	if(type === 'string')
	{
		return '\"'+v+'\"';
	}
	else if(v===null)
	{
		return 'null';
	}
	else if(Array.isArray(v))
	{
		return stringifyArray(v);
	}
	else if(type === 'object' && type !== null)
	{
		return stringifyObject(v);
	}
	// else if(type === 'function' || type === 'undefined')
	// {
	// 	return '';
	// }
	else
	{
		return v + '';
	}
}

var notdef = function(v)
{
	var type = typeof v;

	if(type === 'function' || type === 'undefined')
	{
		return true;
	}
	return false;
}