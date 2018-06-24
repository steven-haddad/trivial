import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

    constructor(public http: HttpClient) {

    }


    getLeaderBoard(){
        return new Promise(resolve => {
            this
                .http
                .get('https://leaderboard.lp1.eu/api/json')
                .subscribe(data => {
                    resolve(data);
                });
        });
    }
    post(resource, data, apiUrl) {
		return this.http.post(apiUrl + resource, data)
	}

}
