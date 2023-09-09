import axios from 'axios';
import fetch from 'node-fetch'
import request from 'request';



export function arrayBufferToBase64( buffer ) {
	var binary = '';
	var bytes = new Uint8Array( buffer );
	var len = bytes.byteLength;
	for (var i = 0; i < len; i++) {
		binary += String.fromCharCode( bytes[ i ] );
	}
	return btoa( binary );
}
var items=[];

export function eden(options,provider){
	axios
        .request(options)
        .then((response) => {
            var resp = (response.data);
            console.log(resp)
            items = resp[provider].items;
			console.log(items)
            return items
        })
        .catch((error) => {
          console.error(error);
          // res.redirect("/error")
		  return [];
        });
}

export function clip(API_KEY,form){
	fetch('https://clipdrop-api.co/text-to-image/v1', {
        method: 'POST',
        headers: {
            'x-api-key': API_KEY,
        },
        body: form,
    })
  .then(response => response.arrayBuffer())
  .then(buffer => {
    items = [{image_resource_url:""},]
    items[0].image_resource_url = 'data:image/png;base64,' + arrayBufferToBase64(buffer);
    return items;
    })
    .catch((error) => {
        console.error(error);
        // res.redirect("/error")
      });
}

export function stable(options){
	request(options, function (error, response) {
		if (error) {console.log(error); //res.redirect("/error")
	};
		var resp = (response.body);
		resp = JSON.parse(resp)
		items = [{image_resource_url:""},]
		items[0].image_resource_url =(resp.output[0])
		return items;
	  })
}