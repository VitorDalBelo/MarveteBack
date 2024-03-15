import { Injectable ,ExecutionContext, UnauthorizedException, BadRequestException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {HeaderAPIKeyStrategy} from "passport-headerapikey"
import { Reflector } from '@nestjs/core';
import axios from "axios"
import "dotenv/config"

@Injectable()
export class GoogleApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy,"googlecode") {
    constructor(private reflector: Reflector){
        super({header:"code",prefix:""},true, async (code,done) =>{
            if(!code) done(new BadRequestException("the code was not provided"),null);

            const url = 
            `https://oauth2.googleapis.com/token?code=${code}&redirect_uri=${process.env.FRONT_URL}/oauthPage.html&client_id=${process.env.GOOGLE_ID}&client_secret=${process.env.GOOGLE_SECRET}&grant_type=authorization_code`            
            
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url
              };
              
              axios.request(config)
              .then((response) => done(null,response.data))
              .catch((error) => {
                console.log(error);
                done(new UnauthorizedException("Failed to communicate with the Google server, check if the code is correct",error.response),null)
              });
            
        })
    }

}