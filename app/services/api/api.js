
const API_URL = 'https://stg.starzly.io';

export default class api {
    constructor() {
        this.staging_url = API_URL;
    }

    getQuery = (query) => {
        return this.staging_url + '/api';
    }

    urlFetch = (url, options) => {
        return fetch(url, options).then(res => res.json()).then(res => {
            return Promise.resolve({"data": res, "success": true, "error": ""});
        }).catch((error) => {
            return {"data": "", "success": false, "error": error.message }
        })
    }

    getFeed = ({page = 1, per_page = 1, app = 1, newFeed = 1,}) => {
        let options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
				'Content-Type': 'application/json',
            }
        }

        let url = `https://stg.starzly.io/api/featurd_videos?page=${page}&per_page=${per_page}&app=${app}&new=${newFeed}`

        return this.urlFetch(url, options)
    }
}