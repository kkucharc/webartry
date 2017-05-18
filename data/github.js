
function getRecent3Commits(url){
  var myHeaders = new Headers();

  var myInit = { method: 'GET',
  headers: myHeaders,
  mode: 'cors',
  cache: 'default' };

  return fetch(url, myInit)
  .then(function(response) {
    return response.text();
  })
  .then(function(text){
    return JSON.parse(text);
  })
  .then(function(json){
    return json.slice(0, 3);
  })
  .catch(function(err){
    console.error(err);
  })
}

function addTextToElement(jsons, identifier){
  var element  = document.getElementById(identifier)
  var entity = document.createElement('a-entity')
  var att = document.createAttribute('text')
  var texts = jsons.reduce(function(prevString, json){
    var commit = json.commit
    var message = commit.message.split(' ').slice(0,3).join('+');
    return `${prevString} \n ${commit.committer.date} - ${commit.committer.name}:\n\t"${message}(...)"`
  }, '')
  att.value = `value: ${texts};`
  entity.setAttributeNode(att)

  var rotation = document.createAttribute('rotation')
  rotation.value = "-90 0 0"
  entity.setAttributeNode(rotation)

  element.appendChild(entity)
}
