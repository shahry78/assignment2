import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable} from 'rxjs';
const data_loc = "../../../server/server_data";
import * as test from "../../../server/server_data/dbAuth.js";

const SERVER_URL = 'http://localhost:3000'

// declare function loginParse(em:string, pwd:string): any; //Meant to run the backend script to get info
// Provides front end and back end communication functionalities through multiple functions

@Injectable({
	providedIn: 'root'
})

export class DatamanagerService {

  	constructor( private router:Router, private http:HttpClient ) { }
// MULTI PAGE 
  	public userValid() {    // Checks to see if the user is valid according to local data, if not, sends them to login page
    	var valid=localStorage.getItem("valid");
    	if (!valid){
			this.router.navigate(["/login"]);
		} else {
			return (true)
		}
	}

	public groupParse(): Promise<Object> {
		//console.log("Reached DM for gPar")
		return new Promise((resolve, reject) => {
			this.http.post(`${SERVER_URL}/group`, {}).subscribe(res => {
				//console.dir(res)
				resolve(res as Object);
			})
		})
	}

	public channelParse(name:string): Promise<Object> {
		//console.log("Reached DM for cPar")
		return new Promise((resolve, reject) => {
			this.http.post(`${SERVER_URL}/channel`, {name}).subscribe(res => {
				//console.dir(res)
				resolve(res as Object);
			})
		})
	}

// LOGIN PAGE
	public loginParse(email:string, pass:string): Promise<boolean> {   // Provides login data from the Login Page to the backend sever for validation
		return new Promise((resolve, reject) => {
			this.http.post(`${SERVER_URL}/login`, {email, pass}).subscribe(res =>{
				resolve(res as boolean);
			});
		});
	}
// ACCOUNT PAGE
	public accountParse(email:string): Promise<Object> {
		//console.log("Reached DM for aPar")
		return new Promise((resolve, reject) => {
			this.http.post(`${SERVER_URL}/account`, {email}).subscribe(res => {
				//console.dir(res)
				resolve(res as Object);
			})
		})
	}
// CHAT PAGE
	public messageList(cID:string): Promise<Object> {
		console.log("Reached DM for mList")
		return new Promise((resolve, reject) => {
			this.http.post(`${SERVER_URL}/messageList`, {cID}).subscribe(res => {
				//console.dir(res)
				resolve(res as Object);
			})
		})
	}
}