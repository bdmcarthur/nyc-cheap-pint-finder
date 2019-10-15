"use strict";
const mongoose = require("mongoose");
const Bars = require("../models/bar");

mongoose
  .connect(`mongodb://localhost/pint`, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

let barsList = [
  {
    name: "Double Down",
    address: "14 Ave. A, New York, NY 10009",
    lat: 40.7226778,
    lng: -73.9866644,
    type: "All the Time",
    description:
      "A pint of PBR is always $4. They have other $4 options during happy hour which is from 12pm-8pm. All beers are half off and they have a good selection. Very spacious bar and has a pool table. They have a big area with boothes in the back that would be good for groups.",
    neighborhood: "East Village",
    image: "NA"
  },
  {
    name: "Jeremy's Ale House",
    address: "228 Front St, New York, NY 10038",
    lat: 40.70772,
    lng: -74.002105,
    type: "All the Time",
    description:
      "Technically slightly over budget at $8.50 for a quart of beer but since there are very few places in this neighborhood, I'm including it. It is in a really neat area near the seaport and serves giant beers in giant cups which I love.",
    neighborhood: "Financial District",
    image: "NA"
  },
  {
    name: "Welcome To The Johnsons",
    address: "123 Rivington St, New York, NY 10002",
    lat: 40.71964,
    lng: -73.98725,
    type: "All the Time",
    description:
      "$2 12oz PBR cans all the time. Slightly more grungy than most dive bars but still bearable. They have some cool 70's couches(thankfully covered in plastic) and a pool table in the back.",
    neighborhood: "Lower East Side",
    image: "NA"
  },
  {
    name: "Walters Bar",
    address: "389 8th Ave, New York, NY 10001",
    lat: 40.74934,
    lng: -73.99584,
    type: "Happy Hour Only",
    description:
      "They have 2 for $5 12oz PBR cans during happy hour. It seemed a little weird at first to be handed two beers at once but it actually turned out to be pretty fun double fisting. Nice cozy dive bar, especially good find for this neighborhood.",
    neighborhood: "Chelsea",
    image: "NA"
  },
  {
    name: "169 Bar",
    address: "169 E Broadway, New York, NY 10002",
    lat: 40.71383,
    lng: -73.98975,
    type: "All the Time",
    description:
      "A range of basic 12oz PBR/Highlife/Black Label etc. that are always $3. They also have a $3 beer and shot deal from 12:30pm-7:30pm which can lead to a rowdy crowd. Everyone seemed wasted when I got there at 7pm on a Saturday night. Overall fun place with great decor.",
    neighborhood: "Lower East Side",
    image: "NA"
  },
  {
    name: "Sophies",
    address: "507 E 5th St, New York, NY 10009",
    lat: 40.72479,
    lng: -73.98383,
    type: "All the Time",
    description: "Haven't checked this one out yet!",
    neighborhood: "East Village",
    image: "NA"
  },
  {
    name: "KeyBar",
    address: "432 E 13th St, New York, NY 10009",
    lat: 40.7299,
    lng: -73.98187,
    type: "All the Time",
    description: "Haven't checked this one out yet!",
    neighborhood: "East Village",
    image: "NA"
  },
  {
    name: "Patriot Saloon",
    address: "110 Chambers St, New York, NY 10007",
    lat: 40.71495,
    lng: -74.00827,
    type: "All the Time",
    description:
      "They have several cheap draft beers in the $3-$4 range all the time. Cool bar with, big surprise, an American theme. Seems a little nicer than the average dive bar.",
    neighborhood: "Tribeca",
    image: "NA"
  },
  {
    name: "Tribeca Tavern",
    address: "110 Chambers St, New York, NY 10007",
    lat: 40.71964,
    lng: -74.00538,
    type: "All the Time",
    description:
      "No posted specials but they had $12 pitchers of Blue Moon when I visited on a Sunday afternoon. For NYC standards it is a pretty large bar, seems like an off the radar sort of place.",
    neighborhood: "Tribeca",
    image: "NA"
  },
  {
    name: "The Red Lion",
    address: "151 Bleecker St, New York, NY 10012",
    lat: 40.72844,
    lng: -73.99952,
    type: "All the Time",
    description:
      "They have $4 16oz PBR cans all the time. All other beers are signifigantly higher. They have live music several nights a week. They had someone playing when I visited but it was a pretty quiet set.",
    neighborhood: "Greenwich Village",
    image: "NA"
  },
  {
    name: "Barcelona Bar",
    address: "923 8th Ave, New York, NY 10019",
    lat: 40.76536,
    lng: -73.98422,
    type: "All the Time",
    description: "Haven't checked this one out yet!",
    neighborhood: "Hell's Kitchen",
    image: "NA"
  },
  {
    name: "Bravest",
    address: "700 2nd Ave, New York, NY 10016",
    lat: 40.74711,
    lng: -73.97396,
    type: "Happy Hour Only",
    description: "Haven't checked this one out yet!",
    neighborhood: "Murray Hill",
    image: "NA"
  },
  {
    name: "Biddy's",
    address: "301 E 91st St, New York, NY 10128",
    lat: 40.78098,
    lng: -73.94901,
    type: "All the Time",
    description: "Haven't checked this one out yet",
    neighborhood: "Greenwich Village",
    image: "NA"
  },
  {
    name: "The Library",
    address: "7 Ave A, New York, NY 10009",
    lat: 40.722608,
    lng: -73.9885519,
    type: "All the Time",
    description:
      "They always have $3 Piels cans but also a good selection of $3-$4 pints during Happy Hour. It runs from 5pm-8pm and is buy one get one free on almost all drinks. They give you a plastic toy to use to redeem your free drink. It was insanely loud when I was there but maybe that was just a weird night",
    neighborhood: "Greenwich Village",
    image: "NA"
  },
  {
    name: "The Stumble Inn",
    address: "1454 2nd Ave, New York, NY 10021",
    lat: 40.7226197,
    lng: 73.9885519,
    type: "All the Time",
    description: "Haven't Checked this one out yet!",
    neighborhood: "Greenwich Village",
    image: "NA"
  },
  {
    name: "Rudy's",
    address: "151 Bleecker St, New York, NY 10012",
    lat: 40.76002,
    lng: -73.99176,
    type: "All the Time",
    description:
      "They have a few pints that are always in the $3-$4 range including some of their own Rudy's beers. They also have free hotdogs. This place has been around forever and gets pretty crowded but is definitely worth a visit.",
    neighborhood: "Hell's Kitchen",
    image: "NA"
  },
  {
    name: "Whiskey Rebel",
    address: "129 Lexington Ave, New York, NY 10016",
    lat: 40.74292,
    lng: -73.98198,
    type: "All the Time",
    description: "Haven't checked this one out yet!",
    neighborhood: "Murrary Hill",
    image: "NA"
  },
  {
    name: "Art Bar",
    address: "52 8th Ave, New York, NY 10014",
    lat: 40.74292,
    lng: -73.98198,
    type: "Happy Hour Only",
    description:
      "Their Happy Hour runs from 4pm-7pm and all draught beers are $4. They have a small selection of good beers. This place feels like two bars in one. The front is regular bar seating and big comfy booths and it's a bit loud. The back room is a lounge type set up with vintage couches and candles and no loud music.",
    neighborhood: "Greenwich Village",
    image: "NA"
  }
];

Bars.create(barsList, err => {
  if (err) {
    throw err;
  }
  mongoose.connection.close();
});

module.exports = Bars;
