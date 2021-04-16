const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const donationSchema = new Schema({
    titel: {
        type: String,
    },
    orgName: {
        type: String,
    },
    orgDescription: {
        type: String,
    },
    donationDescribtion: {
        type: String,
    },
    amount: {
        type: String,
    },
    currency: {
        type: String,
    },
    impact: {
      achieved: String,
      hci2018: String,
      hci2020: String,
    },
    linkToOrganisation: {
        type: String,
    },
    esgGoals: {
        type: [String],
    },
    sustainableGoals: {
        type: [String],
    },
    dependentVariable: {
        type: String,
    },
    independentVariables: {
        type: String,
    },
    esg: {
        type: String,
    },
    sdg: {
        type: String,
    },
    metric: {
        type: String,
    },
    percentPerValue: {
        type: String,
    },
    impactInPercent: {
        type: String,
    },
    dateCreated: {
        type: Date,
        default: Date.now(),
      },

});

const Donation = mongoose.model("Donations", donationSchema);
module.exports = Donation;