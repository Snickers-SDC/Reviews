const charScales = {
  Size: {
    "1": "A size too small",
    "2": "1/2 a size too small",
    "3": "Perfect",
    "4": "1/2 a size too big",
    "5": "A size too big",
  },
  Width: {
    "1": "Too narrow",
    "2": "Slightly narrow",
    "3": "Perfect",
    "4": "Slightly Wide",
    "5": "Too wide",
  },
  Comfort: {
    "1": "Uncomfortable",
    "2": "Slightly uncomfortable",
    "3": "Ok",
    "4": "Comfortable",
    "5": "Perfect",
  },
  Quality: {
    "1": "Poor",
    "2": "Below average",
    "3": "What I expected",
    "4": "Pretty great",
    "5": "Perfect",
  },
  Length: {
    "1": "Runs short",
    "2": "Runs slightly short",
    "3": "Perfect",
    "4": "Runs slightly long",
    "5": "Runs long",
  },
  Fit: {
    "1": "Runs tight",
    "2": "Runs slightly tight",
    "3": "Perfect",
    "4": "Runs slightly big",
    "5": "Runs big",
  },
};

const ratingScale = {
  "1": "Poor",
  "2": "Fair",
  "3": "Average",
  "4": "Good",
  "5": "Great",
};

module.exports.charScales = charScales;
module.exports.ratingScale = ratingScale;
