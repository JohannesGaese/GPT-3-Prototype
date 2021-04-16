import React, { createContext, useState, useReducer, useContext } from "react";

export const FilterContext = createContext();
console.log(FilterContext)

const attributesFilter = ["esgGoals", "sustainableGoals", "metrics"];

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_DONATIONCARD_FILTER":
      return {
        ...state,
        cardFilter: action.payload,
      };
    case "UPDATE_ORGANISATION_FILTER":
      return {
        ...state,
        organisationFilter: action.payload,
      };
    default:
      throw new Error();
  }
};

export const FilterProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, {
      cardFilter: {
        sustainableGoals: [],
        esgGoals: [],
        metrics: [],
      },
      organisationFilter: {
        organisations: [],
        trackerPoints: [],
      },
    });


    const toggleFilter = async (
        filterName,
        criterium,
        whichFilter) => {

            let newFilter = 
                whichFilter === "DonationCards"
                    ? { ...state.cardFilter}
                    : { ...state.organisationFilter};

            if (newFilter[filterName].includes(criterium)) {

              newFilter[filterName] = newFilter[filterName].filter(
                (element) => element !== criterium
              );
            } else {
              newFilter[filterName].push(criterium);

            }
            dispatch({
                type:
                  whichFilter === "DonationCards"
                    ? "UPDATE_DONATIONCARD_FILTER"
                    : "UPDATE_ORGANISATION_FILTER",
                payload: newFilter,
            });
        };
    
    const clearFilter = async (filterName, whichFilter = "DonationCards") => {
        let newFilter =
          whichFilter === "DonationCards"
            ? { ...state.cardFilter }
            : { ...state.organisationFilter };
        console.log("clearFilter", newFilter)
        Object.keys(newFilter).map((attribute) => {
          newFilter[attribute] = [];
        })
        newFilter[filterName] = [];
        console.log("clearFilter", newFilter)

       
    
        dispatch({
          type:
            whichFilter === "DonationCards"
              ? "UPDATE_DONATIONCARD_FILTER"
              : "UPDATE_ORGANISATION_FILTER",
          payload: newFilter,
        });
    };

    const getFilteredDonationCards = (filter, donations) => {
        return donations.filter((donation) => {
            // convert isLaw in Law from Booelean to String
            let showDonation = true;
            let alreadyShown = false;
            // check if Law is used anyway
            for (let attribute in filter) {
                let attributeShow = false
                if (filter[attribute].includes(donation[attribute])) {
                    attributeShow = true;
                }
                showDonation = attributeShow
                  ? alreadyShown
                    ? showDonation
                      ? true
                      : false
                    : true
                  : false;
                alreadyShown = true;
            }
            return showDonation;
        })
    };
    
    return (
      <FilterContext.Provider
        value={{
          cardFilter: state.cardFilter,
          organisationFilter: state.organisationFilter,
          getFilteredDonationCards: getFilteredDonationCards,
          toggleFilter,
          clearFilter,        
        }}
      >
        {props.children}
      </FilterContext.Provider>
    );
};

