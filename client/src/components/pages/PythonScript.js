import React, { useEffect, useContext, useState } from "react";
import useSWR from "swr";
import Fuse from "fuse.js";

//import { PythonShell } from "python-shell";

import axios from "axios";

import {
    Container,
    Col,
    Row,
    InputGroup,
    FormControl,
    Pagination,
    Form,
    Button,
    Spinner,
    Card,
    Modal,
    Tooltip,
    OverlayTrigger,
    Image
  } from "react-bootstrap";

const Script = () => {


//let pyshell = new PythonShell('Scraper_1.py');
//
//// sends a message to the Python script via stdin
//pyshell.send('hello');
//
//pyshell.on('message', function (message) {
//  // received a message sent from the Python script (a simple "print" statement)
//  console.log(message);
//});
//
//// end the input stream and allow the process to exit
//pyshell.end(function (err,code,signal) {
//  if (err) throw err;
//  console.log('The exit code was: ' + code);
//  console.log('The exit signal was: ' + signal);
//  console.log('finished');
//});
  return (
    <div>
      test
    </div>
  )
};

export default Script;
