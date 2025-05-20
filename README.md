# <div align="center">DART Dublin Train Widget</div>
<div align="center">
<a href="#about-the-project">About</a> • 
<a href="#features">Features</a> • 
<a href="#installation">Installation</a> • 
<a href="#usage">Usage</a> • 
<a href="#parameters">Parameters</a> • 
<a href="#license">License</a> • 
<a href="#contact">Contact</a>

---

An iOS Scriptable widget that displays real-time DART (Dublin Area Rapid Transit) train information. Track northbound or southbound trains from your chosen stations, and configure automatic return stations for specific time periods.

<br>

<img 
  src="https://github.com/user-attachments/assets/26b01076-9869-4dbd-98ba-179922d50f3d" 
  alt="DART Dublin Train Widget Screenshot 1" 
  width="260"
  style="border: 1px solid #ddd; border-radius: 9px; box-shadow: 1px 1px 8px #ccc; margin: 0 12px 18px 0;"
/>
<img 
  src="https://github.com/user-attachments/assets/c175257e-d73a-40ac-ad10-67eff26ed05f" 
  alt="DART Dublin Train Widget Screenshot 2" 
  width="260"
  style="border: 1px solid #ddd; border-radius: 9px; box-shadow: 1px 1px 8px #ccc; margin-left: 12px;"
/>

</div>

---


## About the Project

This widget is designed for the [Scriptable app](https://scriptable.app/) on iOS. It presents upcoming DART trains for a selected station, using live data from the Irish Rail API. You can configure a primary station/direction and optionally a secondary "return" station/direction for specific hours of the day.

---

## Features

- **Live train schedules from Irish Rail API**
- **Configurable main and return stations**
- **Automatic time-based station switching** (e.g., from 12:00 to 20:00)
- **Color indicator for return time period**
- **Optimized for both Home and Lock Screen widgets**
- **Simple, modern design**

---

## Installation

**1.** Open the [Scriptable app](https://apps.apple.com/app/apple-store/id1405459188) on your iOS device.  
**2.** Create a new script and paste in the contents of [`dartWidget.js`](#).  
**3.** Save the script with a descriptive name, such as _DART Dublin Train Widget_.  
**4.** Add the widget to your Home or Lock Screen, and select this script in the widget’s settings.

---

## Usage

**1.** On your iOS device, enter edit mode on the Home or Lock Screen.  
**2.** Add or edit a Scriptable widget.  
**3.** Select the _DART Dublin Train Widget_ script from the widget configuration.  
**4.** Enter your desired parameters (see below) in the parameter field.

The widget will then show real-time train updates for your configured station(s). During your specified hours, it automatically switches to your return station/direction.

---

## Parameters

Provide widget parameters as a **comma-separated list**.

**Example:**  
```
Connolly, Southbound, Home, Pearse, 12, 20
```

| Position | Parameter        | Example Value                         | Description                                                          |
|:--------:|:----------------|:--------------------------------------|:---------------------------------------------------------------------|
| 1        | Starting Station | `Connolly`, `Pearse`, `Tara Street`   | Main station to check train times                                    |
| 2        | Direction        | `Northbound` or `Southbound`          | Direction of trains to display                                       |
| 3        | Widget Type      | `Home`, `Lock`, `true`, `false`, etc. | Widget style (see below for accepted values)                         |
| 4        | Return Station   | `Bray`, `Connolly`, `Tara Street`     | Optional, station to switch to during return hours                   |
| 5        | Return Start     | `12`                                  | Hour (24h) when to begin using return station/direction              |
| 6        | Return End       | `20`                                  | Hour (24h) when to stop using return station/direction               |

**Accepted Widget Type Values:**  
- For Home: `Home`, `true`, `homescreen`, `h`
- For Lock: `Lock`, `false`, `lockscreen`, `l`

**If you omit parameters, the script will fall back to defaults.**

---

## Example

**Typical usage:**  
```
Connolly, Southbound, Home, Pearse, 12, 20
```
- Shows southbound trains from Connolly by default.
- From 12:00 to 20:00, will show northbound trains from Pearse.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

<div align="center">

Maintainer: [KganDev](https://github.com/KganDev)  
Project Repository: [github.com/KganDev/scriptable-dart](https://github.com/KganDev/scriptable-dart)

</div>
