const imageMapping: Record<string, string> = {
  "Abbey Road":
    "https://beta.ctvnews.ca/content/dam/ctvnews/images/2019/8/8/1_2057917.jpg?cache_timestamp=1565257417804",
  Thriller:
    "https://upload.wikimedia.org/wikipedia/en/5/55/Michael_Jackson_-_Thriller.png",
  "Dark Side of the Moon":
    "https://1265745076.rsc.cdn77.org/1024/jpg/134180-pink-floyd-dark-side-of-the-moon-LP-64f198fb82963.jpg",
  "Kind of Blue":
    "https://cdn-p.smehost.net/sites/c5d2b1a28fd246bfafed3b8dbafc1352/wp-content/uploads/2021/05/cover-46.jpg",
  "Back in Black":
    "https://i.ebayimg.com/00/s/MTYwMFgxNjAw/z/FYwAAOSw3hpg4J7v/$_57.JPG?set_id=8800005007",
  Rumours: "https://upload.wikimedia.org/wikipedia/en/f/fb/FMacRumours.PNG",
  "Born to Run": "https://m.media-amazon.com/images/I/8127ICDt45L.jpg",
  "1989":
    "https://upload.wikimedia.org/wikipedia/en/f/f6/Taylor_Swift_-_1989.png",
  "Hotel California":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk2aTBenURjyZM1ezgPgYTS6v34oHLNiM0jQ&s",
  "Electric Ladyland":
    "https://1265745076.rsc.cdn77.org/1024/jpg/139548-the-jimi-hendrix-experience-electric-ladyland-LP-8-6565a33513092.jpg",
  Bad: "https://upload.wikimedia.org/wikipedia/en/5/51/Michael_Jackson_-_Bad.png",
  Graceland:
    "https://upload.wikimedia.org/wikipedia/commons/c/c3/Graceland_cover_-_Paul_Simon.jpg",
  "The Wall":
    "https://upload.wikimedia.org/wikipedia/commons/b/b1/The_Wall_Cover.svg",
  "Songs in the Key of Life":
    "https://1265745076.rsc.cdn77.org/1024/jpg/1543.jpg",
  s: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcEbjv680BlX8F7xQbgL2R-nMZaNsQ71HLcQ&s",
  "The Joshua Tree":
    "https://m.media-amazon.com/images/I/71nhNKvy+fL._UF1000,1000_QL80_.jpg",
};

export const getImageUrl = (title: string): string => {
  return imageMapping[title] || "https://example.com/images/default.jpg"; // Default billede
};
