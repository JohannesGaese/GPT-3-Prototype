import React, { useEffect, useContext, useState, Component } from "react";
import useSWR from "swr";
import Fuse from "fuse.js";

const Test = () => {
    
        
          return (
            <div>
              <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet" /><link href="https://fonts.gdoogleapis.com/css?family=Cabin&display=swap" rel="stylesheet" /><link href="./main.css" rel="stylesheet" /><title>Document</title><div className="v369_173"><div className="v369_181"><div className="v369_182" /><span className="v369_183">Trade</span><div className="v369_184" /><div className="v369_185" /><span className="v369_186">  Main Page</span></div><div className="v369_187"><div className="v369_188" /></div><div className="v369_189" /><div className="v369_190"><div className="v369_191" /><div className="v369_192"><div className="v369_193" /><div className="v369_194" /></div><div className="v369_195"><div className="v369_196" /><span className="v369_197">Dhaka Oke, Product Designer</span><span className="v369_198">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span><span className="v369_199">Your Best Value Proposition</span><span className="v369_200">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span></div></div><div className="v369_201"><div className="v369_202" /><div className="v369_203"><div className="v369_204" /><div className="v369_205" /></div><div className="v369_206"><div className="v369_207" /><span className="v369_208">Dhaka Oke, Product Designer</span><span className="v369_209">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span><span className="v369_210">Your Best Value Proposition</span><span className="v369_211">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span></div></div><div className="v369_212" /><div className="v369_213" /><div className="v369_214" /><div className="v369_215"><div className="v369_216" /><div className="v369_217"><div className="v369_218" /><div className="v369_219" /></div><div className="v369_220"><div className="v369_221" /><span className="v369_222">Dhaka Oke, Product Designer</span><span className="v369_223">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span><span className="v369_224">Your Best Value Proposition</span><span className="v369_225">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span></div></div><div className="v369_226"><div className="v369_227" /><div className="v369_228" /><div className="v369_229" /><div className="v369_230" /><div className="v369_231" /><div className="v369_232" /><div className="v369_233" /><div className="v369_234" /></div><div className="v369_235"><div className="v369_236" /><div className="v369_237"><div className="v369_238"><div className="v369_239" /><span className="v369_240">Read More</span><span className="v369_241">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore...</span><span className="v369_242">Keys to writing copy that actually converts and sells users</span></div></div><div className="v369_243"><div className="v369_244"><div className="v369_245" /><span className="v369_246">Read More</span><span className="v369_247">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore...</span><span className="v369_248">Keys to writing copy that actually converts and sells users</span></div></div><div className="v369_249"><div className="v369_250" /><span className="v369_251">The best way to wireframe a website</span><div className="v369_252" /><span className="v369_253">Author name</span><span className="v369_254">Read More</span></div></div><div className="v369_255"><div className="v369_256" /><div className="v369_257" /><div className="v369_258" /><div className="v369_259" /><div className="v369_260" /></div><div className="v369_261"><div className="v369_262" /><span className="v369_263">Maria Lopez, VP of Design at Meshery</span><div className="v369_264" /><span className="v369_265">“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.”</span><div className="v369_266" /><div className="v369_267" /><span className="v369_268">Open Manual</span></div><div className="v369_269"><div className="v369_270" /><span className="v369_271">Trade</span><span className="v369_272">© 2010 — 2020</span><span className="v369_273">Privacy — Terms</span><div className="v369_274" /><div className="v369_275"><span className="v369_276">Product</span><span className="v369_277">Product</span><span className="v369_278">Product</span><span className="v369_279">Product</span><span className="v369_280">Product</span><span className="v369_281">Product</span><span className="v369_282">Company</span><span className="v369_283">Company</span><span className="v369_284">Company</span><span className="v369_285">Company</span><span className="v369_286">Company</span><span className="v369_287">Company</span></div><div className="v369_288"><span className="v369_289">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</span><span className="v369_290">Ready to get started?</span><span className="v369_291">Latest Blog Post</span></div></div><div className="v369_292"><div className="v369_293" /><div className="v369_294"><div className="v369_295"><div className="v369_296" /><span className="v369_297">Start free trial</span></div><span className="v369_298">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span><span className="v369_299">Ready to get started?</span></div></div><div className="v369_300"><div className="v369_301"><div className="v369_302"><div className="v369_303" /><span className="v369_304">Impact Score Result</span><div className="v369_305"><div className="v369_306" /><div className="v369_307" /><div className="v369_308"><div className="v369_309" /></div></div></div><div className="v369_310"><div className="v369_311"><div className="v369_312" /><div className="name" /><span className="v369_314">Pick another organization</span><div className="v369_315"><div className="name" /><div className="name" /><div className="v369_322"><div className="v369_323" /></div></div></div><div className="v369_324"><div className="v369_325" /><div className="name" /><span className="v369_327">+0,02 (1 month dinamic)</span><div className="v369_328"><div className="v369_329" /><div className="v369_330" /><div className="v369_331"><div className="v369_332" /></div></div></div><div className="v369_333"><div className="v369_334" /><div className="name" /><span className="v369_336">3.6</span><div className="v369_337"><div className="name" /><div className="name" /><div className="v369_348"><div className="v369_349" /></div></div></div></div><div className="v369_350" /></div><div className="v369_351"><div className="v369_352" /><span className="v369_353">DBG User History </span></div><div className="v369_354" /><div className="v369_355"><div className="v369_356"><div className="v369_357" /><span className="v369_358">Weight (Importance)</span><div className="v369_359"><div className="v369_360" /><div className="v369_361" /><div className="v369_362"><div className="v369_363" /></div></div></div><div className="v369_364"><div className="v369_365"><div className="v369_366" /><div className="name" /><span className="v369_368">Check other factors</span></div><div className="v369_369"><div className="v369_370" /><div className="name" /><span className="v369_372">40% </span></div><div className="v369_373"><div className="v369_374" /><div className="name" /><span className="v369_376">Early Primary Education </span></div></div><div className="v369_377" /></div><div className="v369_378"><div className="v369_379"><div className="v369_380" /><span className="v369_381">Nature of the weights</span><div className="v369_382"><div className="v369_383" /><div className="v369_384" /><div className="v369_385"><div className="v369_386" /></div></div></div><div className="v369_387"><div className="v369_388"><div className="v369_389" /><div className="name" /><span className="v369_391">Customized</span></div><div className="v369_392"><div className="v369_393" /><div className="name" /><span className="v369_395">Automatic</span></div><div className="v369_396"><div className="v369_397" /><div className="name" /><span className="v369_399">Manual</span></div></div></div><div className="v369_400"><div className="v369_401"><div className="v369_402" /><span className="v369_403">Early Primary Education</span><div className="v369_404"><div className="name" /><div className="name" /><div className="v369_411"><div className="v369_412" /></div></div></div><div className="v369_413"><div className="v369_414"><div className="v369_415" /><div className="name" /><span className="v369_417">Actual outcome is being computed....</span></div><div className="v369_418"><div className="v369_419" /><div className="name" /></div><div className="v369_421"><div className="v369_422" /><div className="name" /><span className="v369_424">Enter Current outcome</span><span className="v369_425">Enter Target outcome</span></div></div></div><div className="v369_426"><div className="v369_427" /><div className="v369_428"><div className="v369_429" /><div className="v369_430" /><div className="v369_431"><div className="v369_432" /></div></div><span className="v369_433">Early Primary Education</span></div><div className="v369_434"><div className="v369_435" /><span className="v369_436">Quality Education</span></div><div className="v369_437"><div className="v369_438" /><span className="v369_439">SDG 4</span><div className="v369_440"><div className="name" /><div className="name" /><div className="v369_447"><div className="v369_448" /></div></div></div><div className="v369_449"><span className="v369_450">Impact Score Calculator</span></div><div className="v369_451" /></div><div className="name" /></div>
            </div>
          
      );

    
}

export default Test;
