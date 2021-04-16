import React, { useEffect, useContext, useState } from "react";
import useSWR from "swr";
import Fuse from "fuse.js";

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

  const fuseOptions = {
    shouldSort: true,
    threshold: 0.3,
    keys: ["titel", "orgName", "lawTypeOrg"],
    maxPatternLength: 30,
    location: 0,
    distance: 200,
  };

const x = axios.get("/api/donations/allCards")
    .then(res => console.log(res.data))
console.log(x)


const Home = () => {

  const { data: donations } = useSWR("/api/donations/allCards", {
    revalidateOnFocus: false,
  });
  
  useEffect(() => {
    console.log(donations)
  },[donations])
  console.log(donations)


    const [displayDonations, setDisplayDonations] = useState([]);
    const [filteredDonations, setFilteredDonations] = useState([]);
    const [search, setSearch] = useState("");
    const [pageSize, setPageSize] = useState(8);

    const [page, setPage] = useState(0);
    //const { data: laws } = useSWR("/api/laws/allMerged", {
    //  revalidateOnFocus: false,
    //});

    //useEffect(() => {
    //    if (dummySet) {
    //      setFilteredDonations(
    //        getFilteredAndSortedLaws(newsfeedFilter, sorterNewsfeed, laws)
    //      );
    //    }
    //}, [laws, sorterNewsfeed, newsfeedFilter]);
    // Set correct laws to display when either laws, fitler or search changes
    useEffect(() => {
        if (search !== "") {
          const fuse = new Fuse(filteredDonations, fuseOptions);
          setDisplayDonations(fuse.search(search));
          setPage(0);
        } else {
          setDisplayDonations(filteredDonations);
          setPage(0);
        }
    }, [filteredDonations, search, /*sorterNewsfeed*/]);
    const firstPage = () => {
        setPage(0);
    };
    const prevPage = () => {
        if (0 < page) {
          setPage(page - 1);
        }
    };
    const nextPage = () => {
        if (displayDonations.length - pageSize > page * pageSize) {
          setPage(page + 1);
        }
    };
    const lastPage = () => {
         setPage(Math.ceil(displayDonations.length / pageSize) - 1);
    };
    const changePageSize = (e) => {
        e.preventDefault();
        setPage(0);
        setPageSize(parseInt(e.target.pageSize.value));
    };

    const settingFilter = () => {
      return
    };

    const [showFeed, setShowFeed] = useState(false);
    const handleCloseFeed = () => setShowFeed(false);
    const handleShowFeed = () => setShowFeed(true);


    return (
        <>
            <Container  fluid className="text-center pt-3" /*style={{backgroundColor: "#e4d6ff"}}*/>
              
            </Container>
        </>
    );
};

export default Home;