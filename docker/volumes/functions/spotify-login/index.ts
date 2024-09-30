// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />

import * as queryString from "https://deno.land/x/querystring@v1.0.2/mod.js"
import { serve } from "https://deno.land/std/http/mod.ts"

import { corsHeaders } from "../_shared/cors.ts";

import { environment} from "../_shared/environment.ts";
/**
 * 
 * @param _req request from client which must contain the token representing the user's session
 * @returns response that redirects the user to the spotify login page
 * @todo update the scope to be more specific to the user's needs something like, user currently playing
 */
function handleSpotifyLogin(_req: Request) {

  const scope = "user-read-recently-played";
  const clientId = environment.SP_CID
  const redirectUrl = environment.SP_REDIRECT
  let authHeader = _req.headers.get("Authorization") 
  console.log("here is that state you need :" , authHeader )
  const spotifyString = "https://accounts.spotify.com/authorize?" +
              queryString.stringify({
                response_type: "code",
                client_id: clientId,
                scope: scope,
                redirect_uri: redirectUrl,
                state: authHeader,
              });
  return new Response( spotifyString, {headers: corsHeaders})
}
serve(handleSpotifyLogin);

