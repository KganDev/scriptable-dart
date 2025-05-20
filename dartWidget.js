/**
 * Dart Dublin Train Widget for iOS Scriptable
 * This script fetches DART (Dublin Area Rapid Transit)
 * train data from Irish Rail and displays upcoming trains 
 * according to provided station and direction parameters.
 * 
 * Parameters, Seperated by comma (Example: "Connolly, Southbound, Home, Pearse, 12, 20"):
 * 1: Starting station (Connolly, Pearse, Tara etc..)
 * 2: Direction. (Northbound or Southbound)
 * 3: Homescreen or Lockscreen widget (Home or Lock) 
 * 4: Return station (Connolly, Pearse, Tara etc..)
 * 5: Return time From (12)
 * 6: Return time To (20)
 * 
 * @author Adam Keegan
*/

/**
 * Primary configuration object controlling:
 * - Station and return station details
 * - Directions
 * - Widget Display (Home or Lock Screen)
 * - Time-based logic for switching stations/directions
 */
let configuration = {
  station: "Dublin Connolly",
  direction: "Southbound",
  widgetType: "Home", // "Home" or "Lock"
  stationReturn: "Bray",
  stationReturnFlag: false,
  directionReturn: "Northbound",
  returnFrom: 12, // 24-hour range for switching
  returnTo: 20,
  trainAmount: 3 // Number of trains to display
};

let station = "";
let direction = "";
let homeFlag = true; // Flag to distinguish between Home and Lock screen

// List of valid stations to ensure input station is recognized
const validStations = [
  "Bayside",
  "Blackrock",
  "Booterstown",
  "Bray",
  "Clongriffin",
  "Clontarf Road",
  "Dalkey",
  "Dublin Connolly",
  "Dublin Pearse",
  "Dun Laoghaire",
  "Glenageary",
  "Grand Canal Dock",
  "Greystones",
  "Harmonstown",
  "Howth",
  "Howth Junction",
  "Kilbarrack",
  "Kilcoole",
  "Killester",
  "Killiney",
  "Lansdowne Road",
  "Malahide",
  "Portmarnock",
  "Raheny",
  "Salthill and Monkstown",
  "Sandycove",
  "Sandymount",
  "Seapoint",
  "Shankill",
  "Sutton",
  "Sydney Parade",
  "Tara Street"
];

// List of valid directions to ensure input direction is recognized
const validDirection = ["Northbound", "Southbound"];

/**
 * Maps partial or shorthand station names to their official names 
 * within the validStations list.
 * @param {string} stationInput - Raw station name input from user.
 * @returns {string} - Corrected station name if recognized, or the original input.
 */
function normalizeStationName(stationInput) {
  const lowerInput = stationInput.toLowerCase().trim();

  if (lowerInput === "connolly") return "Dublin Connolly";
  if (lowerInput === "pearse") return "Dublin Pearse";
  if (lowerInput === "clontarf") return "Clontarf Road";
  if (lowerInput.startsWith("grand canal")) return "Grand Canal Dock";
  if (lowerInput === "lansdowne") return "Lansdowne Road";
  if (lowerInput === "salthill") return "Salthill and Monkstown";
  if (lowerInput === "monkstown") return "Salthill and Monkstown";
  if (lowerInput === "sydney") return "Sydney Parade";
  if (lowerInput === "tara") return "Tara Street";

  return stationInput;
}

/**
 * Utility function to capitalize the first letter of all words in a sentence.
 * @param {string} sentence - The input string to capitalize.
 */
const capitalizeSentence = (sentence) => {
  const s = (sentence || "").toString();
  return s.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
};

/**
 * Formats hour and minute with leading zeros if needed,
 * returning "HH:MM".
 */
function formatTime(hour, minute) {
  const hh = hour < 10 ? `0${hour}` : `${hour}`;
  const mm = minute < 10 ? `0${minute}` : `${minute}`;
  return `${hh}:${mm}`;
}

/**
 * Parses the 3rd variable to determine if it's "Home" or "Lock".
 * The user can input: 
 *  - true, home, homescreen, h -> interpreted as "Home"
 *  - false, lock, lockscreen, l -> interpreted as "Lock"
 * Any other input defaults to "Home" for safety.
 * @param {string} rawWidgetValue - Raw string from parameter (3rd variable).
 */
function parseWidgetType(rawWidgetValue) {
  const val = rawWidgetValue.toLowerCase().trim();
  const homeWords = ["true", "home", "homescreen", "h"];
  const lockWords = ["false", "lock", "lockscreen", "l"];

  if (homeWords.includes(val)) return "Home";
  if (lockWords.includes(val)) return "Lock";
  return "Home";
}

/**
 * Checks if the given station is valid and updates the configuration object.
 * @param {string} givenStation - Station name to validate.
 */
function checkStation(givenStation) {
  const correctedStation = normalizeStationName(givenStation);
  if (validStations.includes(correctedStation)) {
    configuration.station = correctedStation;
  }
}

/**
 * Checks if the given direction is valid and updates the configuration object.
 * @param {string} givenDirection - Direction to validate.
 */
function checkDirection(givenDirection) {
  if (validDirection.includes(givenDirection)) {
    configuration.direction = givenDirection;
  }
}

/**
 * Checks if the return station is valid and updates the configuration object,
 * then calls checkDirectionReturn.
 * @param {string} givenStation - Station name for the return journey.
 */
function checkStationReturn(givenStation) {
  const correctedStation = normalizeStationName(givenStation);
  if (validStations.includes(correctedStation)) {
    configuration.stationReturn = correctedStation;
    checkDirectionReturn();
    configuration.stationReturnFlag = true;
  }
}

/**
 * Sets the return direction opposite to the main direction.
 */
function checkDirectionReturn() {
  if (configuration.direction === validDirection[0]) {
    // If main direction is Northbound, set return direction as Southbound
    configuration.directionReturn = validDirection[1];
  } else {
    configuration.directionReturn = validDirection[0];
  }
}

/**
 * Parses a comma-separated parameter string, updates configuration 
 * settings (station, direction, widget type, return station, returnFrom, returnTo).
 * @param {string} givenParameter - Widget parameter from Scriptable.
 */
function checkParameter(givenParameter) {
  if (givenParameter.includes(",")) {
    let credentials = givenParameter.split(",").map(item => item.trim());
    // 1: station
    // 2: direction
    // 3: widgetType
    // 4: returnStation
    // 5: returnFrom (hour)
    // 6: returnTo (hour)

    // Station
    if (credentials[0]) {
      checkStation(capitalizeSentence(credentials[0]));
    }
    // Direction
    if (credentials[1]) {
      checkDirection(capitalizeSentence(credentials[1]));
    }
    // Widget type
    if (credentials[2]) {
      configuration.widgetType = parseWidgetType(credentials[2]);
    }
    // Return station
    if (credentials[3]) {
      checkStationReturn(capitalizeSentence(credentials[3]));
    }
    // Return from hour
    if (credentials[4] && !isNaN(parseInt(credentials[4]))) {
      configuration.returnFrom = parseInt(credentials[4]);
    }
    // Return to hour
    if (credentials[5] && !isNaN(parseInt(credentials[5]))) {
      configuration.returnTo = parseInt(credentials[5]);
    }
  }
}

/**
 * Initializes the configuration by reading the widgetParameter
 * passed through Scriptable.
 */
async function initializeConfiguration() {
  if (args.widgetParameter && args.widgetParameter.length > 0) {
    checkParameter(args.widgetParameter);
  }
}

/**
 * Retrieves current time, sets station/direction for either normal or 
 * return logic, then adjusts design properties if we're rendering a Lock screen widget.
 */
const today = new Date();
const nowHour = today.getHours();
const nowMinute = today.getMinutes();

let visuals = {
  fonts: {
    header: 10, // Station name size
    last: 6,    // Secondary station/time label size
    destination: 8, 
    direction: 6,
    dueTime: 13,
    status: 8,
    error: 8,
    directionFontColor: "#5bc6ff"
  },
  spacing: {
    widgetPadding: 12,
    betweenTrains: 4,
    innerCardPadding: 6,
    elementSpacing: 10
  },
  icons: {
    headerSize: 0,
    directionSize: 6
  },
  card: {
    cornerRadius: 10,
    backgroundColor: "#2d2d2d"
  }
};

/**
 * Evaluates if the 'return station' parameters should be used based on current time.
 * If the widget type is 'Lock', adjusts the widget visual properties for smaller design.
 */
async function setCurrent() {
  // Check if we should switch to return station
  if (
    configuration.stationReturnFlag &&
    nowHour >= configuration.returnFrom &&
    nowHour <= configuration.returnTo
  ) {
    station = configuration.stationReturn;
    direction = configuration.directionReturn;
    visuals.fonts.directionFontColor = "#91f8b4"; // Different color to indicate return mode
  } else {
    station = configuration.station;
    direction = configuration.direction;
  }

  // Evaluate widget type for Lock or Home
  if (configuration.widgetType === "Lock") {
    visuals.fonts.header = 0.1;
    visuals.fonts.destination = 0.1;
    visuals.fonts.direction = 0.1;
    visuals.fonts.dueTime = 20;
    visuals.fonts.status = 5;
    visuals.fonts.error = 5;
    visuals.spacing.widgetPadding = 0;
    visuals.spacing.betweenTrains = 0.1;
    visuals.spacing.innerCardPadding = 0;
    visuals.spacing.elementSpacing = 0;
    visuals.icons.headerSize = 0;
    visuals.icons.directionSize = 0.1;
    visuals.card.cornerRadius = 0;
    visuals.card.backgroundColor = "#2d2d2d00";
    homeFlag = false;
  } else {
    homeFlag = true;
  }
}

/**
 * Main function creating the widget layout and populating data from Irish Rail.
 * @returns {ListWidget} - The constructed widget ready for Scriptable.
 */
async function createWidget() {
  await setCurrent();

  // Create widget
  const widget = new ListWidget();
  widget.backgroundColor = new Color("#1a1a1a");

  // Add header if it's a Home screen widget
  if (homeFlag) {
    widget.setPadding(
      visuals.spacing.widgetPadding,
      visuals.spacing.widgetPadding,
      visuals.spacing.widgetPadding,
      visuals.spacing.widgetPadding
    );
    const headerStack = widget.addStack();
    headerStack.layoutHorizontally();
    headerStack.spacing = visuals.spacing.elementSpacing;

    const nowTime = formatTime(nowHour, nowMinute);
    const titleText = `${station}`;
    const title = headerStack.addText(titleText);
    title.font = Font.boldRoundedSystemFont(visuals.fonts.header);
    title.textColor = Color.white();

    const lastUpdatedText = `Last updated: ${nowTime}`;
    const lastUpdated = headerStack.addText("  " + lastUpdatedText);
    lastUpdated.font = Font.boldRoundedSystemFont(visuals.fonts.last);
    lastUpdated.textColor = Color.white();

    widget.addSpacer(visuals.spacing.betweenTrains);
  }

  // Fetch train data
  try {
    const apiUrl = `https://api.irishrail.ie/realtime/realtime.asmx/getStationDataByNameXML?StationDesc=${encodeURIComponent(
      station
    )}`;
    const response = await new Request(apiUrl).loadString();
    let trains = parseXML(response);

    // Filter by direction if provided
    if (direction) {
      trains = trains.filter((train) => train.Direction === direction);
    }

    if (trains.length === 0) {
      addNoTrainsMessage(widget);
      return widget;
    }

    // Sort by time due
    trains.sort((a, b) => a.Duein - b.Duein);

    // Display up to configuration.trainAmount trains
    trains.slice(0, configuration.trainAmount).forEach((train) => {
      const trainStack = widget.addStack();
      trainStack.layoutHorizontally();
      trainStack.spacing = visuals.spacing.elementSpacing;

      if (homeFlag) {
        trainStack.setPadding(
          visuals.spacing.innerCardPadding,
          visuals.spacing.innerCardPadding,
          visuals.spacing.innerCardPadding,
          visuals.spacing.innerCardPadding
        );
      }
      trainStack.backgroundColor = new Color(visuals.card.backgroundColor);
      trainStack.cornerRadius = visuals.card.cornerRadius;

      // Left stack (destination/direction) for home widget
      if (homeFlag) {
        const leftStack = trainStack.addStack();
        leftStack.layoutVertically();
        leftStack.spacing = visuals.spacing.elementSpacing / 2;

        const destinationText = leftStack.addText(train.Destination);
        destinationText.font = Font.semiboldSystemFont(visuals.fonts.destination);
        destinationText.textColor = Color.white();
        destinationText.lineLimit = 1;

        const directionStack = leftStack.addStack();
        directionStack.spacing = visuals.spacing.elementSpacing / 2;

        const arrow = directionStack.addImage(
          SFSymbol.named("arrowtriangle.down.fill").image
        );
        arrow.imageSize = new Size(
          visuals.icons.directionSize,
          visuals.icons.directionSize
        );
        arrow.tintColor = new Color("#8E8E93");

        const directionText = directionStack.addText(train.Direction);
        directionText.font = Font.mediumSystemFont(visuals.fonts.direction);
        directionText.textColor = new Color(visuals.fonts.directionFontColor);

        trainStack.addSpacer();
      }

      // Right stack (due time/status)
      const rightStack = trainStack.addStack();
      rightStack.layoutVertically();
      rightStack.spacing = visuals.spacing.elementSpacing / 2;

      const timeStack = rightStack.addStack();
      timeStack.spacing = visuals.spacing.elementSpacing;

      const dueText = timeStack.addText(`${train.Duein}m`);
      dueText.font = Font.boldSystemFont(visuals.fonts.dueTime);
      dueText.textColor = Color.white();

      if (homeFlag) {
        const statusText = rightStack.addText(getDelayText(train.Late));
        statusText.font = Font.mediumSystemFont(visuals.fonts.status);
        statusText.textColor = getStatusColor(train.Late);
      }

      widget.addSpacer(visuals.spacing.betweenTrains);
    });
  } catch (error) {
    addErrorMessage(widget);
  }

  return widget;
}

/**
 * Displays a message if no trains are found for the chosen station/direction.
 * @param {ListWidget} widget - The widget to append the message.
 */
function addNoTrainsMessage(widget) {
  const message = widget.addText(
    direction ? `No ${direction} trains` : "No upcoming trains"
  );
  message.font = Font.mediumSystemFont(visuals.fonts.error);
  message.textColor = Color.gray();
}

/**
 * Displays an error message if data retrieval or parsing failed.
 * @param {ListWidget} widget - The widget to append the error message.
 */
function addErrorMessage(widget) {
  const errorStack = widget.addStack();
  errorStack.layoutVertically();
  errorStack.spacing = visuals.spacing.elementSpacing;
  const errorIcon = errorStack.addImage(
    SFSymbol.named("exclamationmark.triangle.fill").image
  );
  errorIcon.imageSize = new Size(
    visuals.icons.headerSize,
    visuals.icons.headerSize
  );
  errorIcon.tintColor = Color.red();

  const errorText = errorStack.addText("Update Failed");
  errorText.font = Font.mediumSystemFont(visuals.fonts.error);
  errorText.textColor = Color.red();
}

/**
 * Parses the XML response from Irish Rail's API to extract train data objects.
 * @param {string} xmlString - Raw XML response string.
 * @returns {Object[]} - Array of train data objects.
 */
function parseXML(xmlString) {
  const parser = new XMLParser(xmlString);
  const trains = [];
  let currentTrain = null;
  let currentElement = null;
  let currentValue = "";

  parser.didStartElement = (name) => {
    if (name === "objStationData") currentTrain = {};
    currentElement = name;
    currentValue = "";
  };

  parser.foundCharacters = (chars) => {
    if (currentTrain) currentValue += chars;
  };

  parser.didEndElement = (name) => {
    if (name === "objStationData") {
      currentTrain.Duein = parseInt(currentTrain.Duein || 0, 10);
      currentTrain.Late = parseInt(currentTrain.Late || 0, 10);
      // Only push the train if it's a valid entry
      if (currentTrain.Duein >= 0) {
        trains.push(currentTrain);
      }
      currentTrain = null;
    } else if (currentTrain) {
      currentTrain[currentElement] = currentValue.trim();
    }
  };

  parser.parse();
  return trains;
}

/**
 * Returns display text for how late a train is:
 * - "On time" when not delayed
 * - "<late>m late" otherwise
 * @param {number} late - The delay in minutes.
 */
function getDelayText(late) {
  return late > 0 ? `${late}m late` : "On time";
}

/**
 * Returns a color representing train status:
 * - Green if on time
 * - Red if delayed
 * @param {number} late - The train's delay in minutes.
 */
function getStatusColor(late) {
  return late > 0 ? new Color("#ff3b30") : new Color("#34c759");
}

// Begin execution flow
await initializeConfiguration();
const widget = await createWidget();

if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  widget.presentMedium();
}
Script.complete();
