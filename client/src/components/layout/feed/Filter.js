import React, { useEffect, Fragment, useState, useContext } from "react";
import useSWR from "swr";
import { Form, Button, Collapse, Dropdown } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo } from "@fortawesome/free-solid-svg-icons";

import { FilterContext } from "../../../context/FilterContext";

const esgsToSDG = [{
  "Environmental": {
    "Air (climate) - GHG emissions": [],
    "Air (health) - other pollution": [],
    "Water": [],
    "Ground / Contamination": [],
    "Noise and Light": [], 
    "Biodiversity": [],
    "(Raw) materials incl. supply chain": [],
    "Energy": [],
    "Water": [],
    "Waste": [],
  },
  "Social": {
    "Child labour": [],
    "Discrimination / Inclusion": [],
    "Gender and diversity (inclusion)": [],
    "Freedom of association": [],
    "Health and safety (employees, customers suppliers)": [],
    "Labour standards and working conditions": [],
    "Employee engagement": [],
    "Societal preferences": [],
    "Community benefit (e.g. access, inclusion,development, social enterprise partnering)": [],
    "Other stakeholder relations": [],

  },
  "Governance": {
    "Independence of board chair": [],
    "Board composition": [],
    "Committee structure / independence (e.g. audit, risk, compensation)": [],
    "Executive compensation": [],
    "Voting system (one share / one vote)": [],
    "Fiduciary duty": [],
    "Bribery and corruption": [],
    "Fraud / cyber security": [],
    "Lobbying activities": [],
    "Political contributions": [],
    "Whistle-blower protection": [],
  },
}]





const esgs = [
  {"Environmental": {
    "Affordable and clean energy": [
      "Access to electricity",
      "Access to clean fuels for cooking",
      "Renewable energy",
      "Energy efficiency",
      "Access and investments in clean energy",
      "Domestic material consumption",
    ],
    "Industry innovation and infrastructure": [
      "Passenger and freight volumes",
      "Manufacturing value",
      "Manufacturing employment",
      "Value of small-scale industry",
      "Small-scale industries with affordable credit",
      "CO2 emissions per unit value added",
      "Research and Development (R&D) spending",
      "Researchers per million inhabitants",
      "Development assistance for infrastructure",
      "Medium and high-tech industry",
      
      ""
    ],
    "Responsible consumption and production": [
      "Sustainable consumption and production action plans",
      "Material footprint",
      "Domestic material consumption",
      "Global food loss",
      "International agreements on hazardous waste",
      "Hazardous waste generation",
      "Recycling rates",
      "Companies publishing sustainability reports",
      "National sustainable procurement plans",
      "Understanding of sustainable lifestyles",
      "Support for developing countries' capacity for sustainable production",
      "Monitoring sustainable tourism",
      "Removing fossil fuel subsidies",
      
    ],
    "Climate action": [
      "Deaths and injuries from natural disasters",
      "National disaster risk management",
      "Local disaster risk management",
      "Integration of climate change into national policies",
      "Education on climate change",
      "Capacity-building for climate change",
      "Green Climate Fund mobilization of $100 billion",
      "Support for planning and management in least-developed countries",
      
    ],
    "Life below water": [
      "Reduce marine pollution",
      "Protect and restore ecosystems",
      "Reduce ocean acidification",
      "Fish stocks within sustainable levels",
      "Protected marine areas",
      "Combat illegal, unreported and unregulated fishing",
      "Income from sustainable fisheries",
      "Research resources for marine technology",
      "Support small scale fishers",
      "Implementing international sea law"
    ],
    "Life on land": [
      "Forest Area",
      "Terrestrial Protected areas",
      "Land degradation",
      "Mountain Green Cover Index",
      "Red List Index",
      "Official development assistance for biodiversity",
      "Official development assistance for forest management",

    ],
  }},
  {"Social": {
    "No poverty": [
      "Eradicate extreme poverty",
      "Halve population below national poverty line",
      "Population in poverty according to national definitions",
      "Population covered by social protection floors/systems",
      "Access to basic services",
      "Deaths and affected persons from natural disasters",
      "Direct economic loss from natural disasters",
      "Disaster risk reduction strategies",
      "Local disaster risk reduction",
      "Government spending on essential services",
    ],
    "Zero hunger": [
      "Prevalence of Undernourishment (PoU)",
      "Food Insecurity Experience (FIES)",
      "Prevalence of childhood stunting",
      "Prevalence of childhood malnutrition (wasting or overweight)",
      "Production per labour unit",
      "Income of small-scale food producers",
      "Genetic resources in conservation facilities",
      "Agriculture orientation index", 
      "Official flows to agriculture",
      "Agricultural export subsidies",
      "Food price anomalies",
    ],
    "Good health and well-being": [
      "Maternal mortality ratio",
      "Skilled birth attendance",
      "Under-5 mortality rate",
      "Neonatal mortality rate",
      "Number of new HIV infections per 1,000 uninfected population, by sex, age and key populations",
      "Tuberculosis incidence per 100,000 population",
      "Malaria incidence per 1,000 population",
      "Hepatitis B incidence per 100,000 population",
      "Number of people requiring interventions against neglected tropical diseases",
      "Mortality rate attributed to cardiovascular disease, cancer, diabetes or chronic respiratory disease",
      "Suicide mortality rate",
      "Alcohol consumption per capita",
      "Halve the number of road traffic deaths",
      "Proportion of women of reproductive age (aged 15–49 years) who have their need for family planning satisfied with modern methods",
      "Adolescent birth rate",
      "Coverage of essential health services",
      "Household expenditures on health",
      "Mortality rate from air pollution",
      "Mortality rate from unsafe water, sanitation, hygiene (WASH)",
      "Mortality rate attributed to unintentional poisoning",
      "Prevalence of tobacco use",
      "Vaccine coverage",
      "Development assistance to medical research & basic healthcare",
    ],
    "Quality education": [
      "Achieving proficiency in reading and mathematics",
      "Participation in pre-primary education",
      "Equal access to further education",
      "Information and communications technology (ICT) skills",
      "Total net enrolment rate",
      "Literacy rate",
      "Inclusive and safe schools",
      "Scholarships for developing countries",
    ],
    "Gender equality": [
      "Legal frameworks for gender equality and non-discrimination",
      "Violence against women from an intimate partner",
      "Violence against women from persons other than an intimate partner",
      "Women married before age 15 or 18",
      "Female genital mutilation/cutting",
      "Time spent on unpaid domestic and care work",
      "Women in political positions",
      "Women in managerial positions",
      "Women decision-making on contraceptive use and healthcare",
      "Female land rights or ownership",
      "Equal rights to land ownership",
      "Systems to track gender equality",
    ],
    "Clean water and sanitation": [
      "Safe drinking water",
      "Safe sanitation and hygiene",
      "Ambient water quality",
      "Levels of freshwater stress",
      "Access to electricity",
      "Access to clean fuels for cooking",
      "Renewable energy",
      "Energy efficiency",
      "Access and investments in clean energy",
      "Integrated water management",
      "Transboundary water cooperation",
      "Protect and restore water-related ecosystems",
    ],
    "Decent work and economic growth": [
      "GDP per capita growth rate",
      "GDP per capita growth rate per employed person",
      "Informal employment",
      "Hourly earnings",
      "Youth employment, education and training",
      "Child labour",
      "Occupational injuries",
      "Access to financial services",
      "Population with financial account",
      "Aid for trade",
    ],
    "Reduced inequalities": [
      "Income growth inequalities",
      "People living below 50 per cent of median income",
      "Eliminating discriminatory practices",
      "Policies for greater equality",
      "Regulating financial markets",
      "Voting rights for developing countries",
      "Migration recruitment costs",
      "Well-planned migration policies",
      "Differential tariffs for least developed countries",
      "Development assistance and investment",
      "Remittance costs",
    ],
    "Sustainable cities and communities": [
      "Urban population living in slums",
      "Public transport access",
      "Sustainable urbanization rates",
      "Urban planning management",
      "Protecting cultural heritage",
      "Deaths and injuries from natural disasters",
      "Economic losses from natural disasters",
      "Solid waste management",
      "Urban air pollution",
      "Open spaces in cities",
      "Safe spaces in cities",
      "Urban and regional planning",
      "Integrated disaster risk management",
      "Local disaster risk management",
      "Sustainable and resilient buildings in least developed countries",
    ]
  }},
  {
    "Governance": {
    "Peace justice and strong institutions": [
      "Violence against children",
      "Victim reports of crime",
      "Unsentenced detainees",
      "Bribery prevalence",
      "Human trafficking",

    ],
    "Partnerships for the goals": [
      "Government revenue",
      "Domestic taxes",
      "Foreign direct investment",
      "Volume of remittances",
      "Debt service",
      "SDG support for developing countries",
      "Exports from developing countries",
      "Tariffs for developing countries",
      "Statistical Capacity",

    ]
  }}
];



/**
 * @name Filter
 * @desc Filter component which is used besides a DonationCard feed to filter the displayed donations.
 * @param {Object} props
 */

const Filter = (props) => {
    const {
        cardFilter,
        toggleFilter,
        clearFilter
    } = useContext(FilterContext);

    const correctFilter = cardFilter;

    const updateFilter = (e, filterName) => {
        toggleFilter(
            filterName,
            e.target.id,
            "DonationCards");
        console.log(correctFilter)
    };

    const renderMetrics = (sdg, esg) => {
     //console.log(correctFilter.sustainableGoals.includes(sdg), sdg)

      return (
        <div key={sdg}>
          <div>
            <Form.Check
              checked={correctFilter.sustainableGoals.includes(sdg)}
              custom
              type="checkbox"
              key={`${sdg}`}
              id={`${sdg}`}
              label={`${sdg}`}
              onChange={(e) => updateFilter(e, "sustainableGoals")}/>
            </div>
            <Collapse in={correctFilter.sustainableGoals.includes(sdg) ? true : false}>
            <div className="pl-5">
                {esg[`${Object.keys(esg)[0]}`][sdg].map((metric) => (
                  <Form.Check
                  checked={correctFilter.metrics.includes(metric)}
                  custom
                  type="checkbox"
                  key={`${metric}`}
                  id={`${metric}`}
                  label={`${metric}`}
                  onChange={(e) => updateFilter(e, "metrics")}/>
                ))
              }
            </div>
          </Collapse>
        </div>
      )
    }

    const renderSDG = (esg) => {
      //console.log(correctFilter.sustainableGoals.includes(sdg), sdg)
      return (
        <div key={Object.keys(esg)[0]}>
          <div>
            <Form.Check
              checked={correctFilter.esgGoals.includes(Object.keys(esg)[0])}
              custom
              type="checkbox"
              key={`${Object.keys(esg)[0]}`}
              id={`${Object.keys(esg)[0]}`}
              label={`${Object.keys(esg)[0]}`}
              onChange={(e) => updateFilter(e, "esgGoals")}
            />
          </div>
          <Collapse in={correctFilter.esgGoals.includes(Object.keys(esg)[0]) ? true : false}>
            <div className="pl-5">
                {Object.keys(esg[`${Object.keys(esg)[0]}`]).map((sdg) => 
                  renderMetrics(sdg, esg)
                )
              }
            </div>
          </Collapse>
          
          
         
        </div>
      )
    }

    return (
        <div>
            <div className="mt-4 mb-2">
            <h5 className="d-lg-inline">ESG</h5>{" "}
            {correctFilter.esgGoals.length !== 0 ? (
              <FontAwesomeIcon
                className="resetFilter"
                size="xs"
                onClick={() => clearFilter("esgGoals", "DonationCards")}
                icon={faUndo}
              />
            ) : (
              ""
            )}
            </div>
            {esgs.map((item) => 
              renderSDG(item))}
      </div>
    )



};

export default Filter;