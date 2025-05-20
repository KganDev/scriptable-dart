# DART Dublin Train Widget
![IMG_1266](https://github.com/user-attachments/assets/26b01076-9869-4dbd-98ba-179922d50f3d)
![IMG_1265](https://github.com/user-attachments/assets/c175257e-d73a-40ac-ad10-67eff26ed05f)
This repository contains an iOS Scriptable widget that displays real-time DART (Dublin Area Rapid Transit) train information. It fetches immediate train schedules from Irish Rail, enabling users to track northbound or southbound trains from their chosen stations and optionally configure return stations during specific time ranges.

---

## Table of Contents
1. [About the Project](#about-the-project)  
2. [Features](#features)  
3. [Installation](#installation)  
4. [Usage](#usage)  
5. [Parameters](#parameters)  
6. [License](#license)
7. [Contact](#contact)

---

## About the Project

This widget is built to run with [Scriptable](https://scriptable.app/) on iOS. It displays upcoming DART trains for a selected station, pulling live data from the Irish Rail API. Users can configure a primary station/direction and optionally a secondary "return" station/direction during specific hours of the day.

---

## Features

• Real-time train schedules from the Irish Rail API.  
• Configurable primary and return stations, along with time-based station switching (e.g., from 12:00 to 20:00).  
• Automated color changes indicating different station logic during return hours.  
• Automatically handles minimal or expanded layouts when displayed on the Lock Screen vs. the Home Screen.  
• Easy integration with Scriptable on iOS.

---

## Installation

1. Open the [Scriptable app](https://apps.apple.com/app/apple-store/id1405459188) on your iOS device.  
2. Create a new script and replace its contents with those from [dartWidget.js](#).  
3. Save the script under a descriptive name (e.g., "DART Dublin Train Widget").  
4. Optionally, add the widget to your Home or Lock Screen and choose this script within the widget settings.

---

## Usage

Once you have installed the script in Scriptable, configure your widget:

1. On your iOS device, long-press the Home or Lock Screen to enter edit mode.  
2. Add or edit a Scriptable widget.  
3. Select the "DART Dublin Train Widget" script from the widget configuration.  
4. Provide the necessary parameters in the widget's settings (see below).  

When the widget runs, it will display real-time train updates for the specified station(s). It automatically switches to the return station and direction during specified hours.

---

## Parameters

Provide widget parameters as a comma-separated list. For example:  
"Connolly, Southbound, Home, Pearse, 12, 20"

1. Starting station (e.g., "Connolly", "Pearse", "Tara Street", etc.).  
2. Direction ("Northbound" or "Southbound").  
3. Widget Type ("Home" or "Lock").  
4. Return station (e.g., "Connolly", "Bray", "Tara Street", etc.).  
5. Return time start (e.g., 12 in 24-hour format).  
6. Return time end (e.g., 20 in 24-hour format).

Example usage:

```
Connolly, Southbound, Home, Pearse, 12, 20
```

If only partial or no parameters are provided, the script falls back to default settings.

---

## License

This project is licensed under the [MIT License](LICENSE). Refer to the license file for details.

---

## Contact

• Maintainer: KganDev  
• Project Repository: https://github.com/KganDev/scriptable-dart
