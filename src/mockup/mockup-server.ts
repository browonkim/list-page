import {createServer} from 'miragejs'
import {mockData} from "@/mockup/mock-data";

export function makeServer() {
   return createServer({
       routes() {
           this.urlPrefix = 'http://localhost:8080'
           this.get('/api/list', () => ({
               list: mockData
           }))
       }
   })
}

