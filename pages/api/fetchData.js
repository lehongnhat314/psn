// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import React, {useState, useEffect} from "react"
import {
    exchangeNpssoForCode,
    exchangeCodeForAccessToken,
    getUserTitles
} from 'psn-api';


export default async function handler(req, res) {
  try {
      const myNpsso = process.env.NEXT_PUBLIC_PSN_KEY;                
      // We'll exchange your NPSSO for a special access code.
      const accessCode = await exchangeNpssoForCode(myNpsso);

      // We can use the access code to get your access token and refresh token.
      const authorization = await exchangeCodeForAccessToken(accessCode);

      // This returns a list of all the games you've earned trophies for.
      const userTitlesResponse = await getUserTitles(
        { accessToken: authorization.accessToken },
        "me"
      );
      res.status(200).json({ data: userTitlesResponse })
  } catch (err) {
      console.log(err);
  }
  
}

