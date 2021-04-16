const express = require("express");
const mongoose = require("mongoose");
const { sanitizeParam, check, validationResult } = require("express-validator");
const Donation = require("../models/donation");
const router = express.Router();

// find specific DonationCard
router.route("single/:donationID").get(
    
    async(req, res) => {
        try {
            let requestetDonation = await Donation.findById(req.params.donationID)
                if (!requestetDonation) {
                    return res.status(400).json({
                        msg: "there is no DonationCard with this id",
                    });
                }
            res.send(requestetDonation)
        } catch (err) {
            console.log(err);
            res.status(500).json({ msg: "Server error" });
        }
    }
);

router.route("/").post((req, res) => {
    let newDonationCard = Donation({
        titel: req.body.titel,
        orgName: req.body.orgName,
        orgDescription: req.body.orgDescription,
        donationDescribtion: req.body.donationDescribtion,
        amount: req.body.amount,
        currency: req.body.currency,
        impact: req.body.impact,
        linkToOrganisation: req.body.linkToOrganisation,
        esgGoals: req.body.esgGoals,
        sustainableGoals: req.body.sustainableGoals,
        dependentVariable: req.body.dependentVariable,
        independentVariables: req.body.independentVariables,
        esg: req.body.esg,
        sdg: req.body.sdg,
        metric: req.body.metric,
        percentPerValue: req.body.percentPerValue,
        impactInPercent: req.body.impactInPercent,
        dateCreated: Date.now(),
        });
    newDonationCard.save()
        .then(donation => res.json(donation))
        .catch(err => res.status(400).json("Error: "+ err));
});

// get all DonationCards
router.route("/allCards").get(
    async (req, res) => {
        console.log("ehy")
        try {
            let donationCards = await Donation.find();
            res.send(donationCards)


        } catch (err) {
            console.log(err);
            res.status(500).json({ msg: "Server error" });
        }
    }
);

// create new Donation Card
//router.post(
//    "/", 
//    async (req, res) => {
//        let newDonationCard = Donations({
//            titel: req.body.titel,
//            orgName: req.body.orgName,
//            orgDescription: req.body.orgDescription,
//            donationDescribtion: req.body.donationDescribtion,
//            amount: req.body.amount,
//            currency: req.body.currency,
//            impact: req.body.impact,
//            linkToOrganisation: req.body.linkToOrganisation,
//            esgGoals: req.body.esgGoals,
//            sustainableGoals: req.body.sustainableGoals,
//            dependentVariable: req.body.dependentVariable,
//            independentVariables: req.body.independentVariables,
//            esg: req.body.esg,
//            sdg: req.body.sdg,
//            metric: req.body.metric,
//            percentPerValue: req.body.percentPerValue,
//            impactInPercent: req.body.impactInPercent,
//            dateCreated: Date.now(),
//            });
//        try {
//            await newDonationCard.save();
//            res.json({ msg: "Creation successful!" });
//        } catch (err) {
//          logError(err);
//          res.status(500).json({ msg: "Server error" });
//        }
//    }
//);

// update Donation Card
router.route("/:donationID").put(   
    async (req, res) => {
        try {

            Donation.findById(req.params.donationID, async (err, card) => {
                if (err) res.status(400).json({ msg: "Donation Card not found" });
        
                let newDonationCard = Donation({
                    titel: req.body.titel,
                    orgName: req.body.orgName,
                    orgDescription: req.body.orgDescription,
                    donationDescribtion: req.body.donationDescribtion,
                    amount: req.body.amount,
                    currency: req.body.currency,
                    impact: req.body.impact,
                    linkToOrganisation: req.body.linkToOrganisation,
                    esgGoals: req.body.esgGoals,
                    sustainableGoals: req.body.sustainableGoals,
                    dependentVariable: req.body.dependentVariable,
                    independentVariables: req.body.independentVariables,
                    esg: req.body.esg,
                    sdg: req.body.sdg,
                    metric: req.body.metric,
                    percentPerValue: req.body.percentPerValue,
                    impactInPercent: req.body.impactInPercent,
                    dateCreated: req.body.dateCreated,
                    });
                console.log("test")
                card.overwrite(newDonationCard);
                
                await newDonationCard.save();
            })
            res.json({ msg: "Update successful!" });
        } catch (err) {
          console.log(err);
          res.status(500).json({ msg: "Server error" });
        }
    }
);


// delete DonationCard
router.route("/:donationID").delete(
    
    async (req, res) => {
        try {
            let donationCard = await Donation.findById(req.paramms.donationID);

            if (!donationCard) return res.status(400).json({ msg: "Donation Card not found" });

            await Donation.findByIdAndRemove(req.params.donationID);
            res.json({ msg: "Donation Card deleted" });
        } catch (err) {
            console.log(err);
            res.status(500).json({ msg: "Server error" });
        }
    }
);

module.exports = router;

