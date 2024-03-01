'use strict'

export class Ajax{

    post(url, body, callback){
        var  method = 'POST';
        this._ajax({
            method,
            url,
            body,
            callback,
        })
    }

    get(url, callback){
        var  method = 'GET';
        this._ajax({
            method,
            url,
            callback,
        })
    }

    _ajax({method, url, body = null, callback}) {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.withCredentials = true;
      
        xhr.addEventListener('readystatechange', function () {
          if (xhr.readyState !== XMLHttpRequest.DONE) return;
      
          callback(xhr.status, xhr.responseText);
        });
      
        if (body) {
          xhr.setRequestHeader('Content-type', 'application/json; charset=utf8');
          xhr.send(JSON.stringify(body));
          return;
        }
      
        xhr.send(); 
      }
}