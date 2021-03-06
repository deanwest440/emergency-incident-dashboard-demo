# Emergency Incident Dashboard Demo

An application that displays key information regarding 911 emergency incidents, including weather conditions at the time of the incident and geospatial data for incidents and responders

## Quick Start

```bash
npm install
npm run build
npm start
```

Navigate to http://localhost:8080

**Note**: For the purposes of this demo, the dashboard only displays one incident at a time. The incident ID is supplied as a query parameter. With the current data set, you can switch it between `F01705150050` and `F01705150090`. As noted below, ideally, the user would be able to select the incident they want from a list. 

## Screenshots

### Zoomed Out
![Zoomed-Out Screenshot](public/img/screenshot.png)
---
### Zoomed In, With Weather Conditions
![Zoomed-In Screenshot with Weather Conditions](public/img/screenshot-2.png)


## What I Would Change, Given More Time

So much. Off the top of my head:

**General**:

- Tests! I would want as close to 100% test coverage as I could get. And put the app through its paces. Mainly because I like to sleep at night.
- I wouldn't expose any API keys right in the code :P. I'd store them in AWS Secrets Manager.
- Ideally, the UI application would be entirely from API(s), which would federate and aggregate relevant data from other systems (like internal micro services)
- General organization: Given enough time, I like to organize files and functions into small, reusable, composable, (ideally generalized), documented, logical, testable units. (You know, [Unix philosophy](https://en.wikipedia.org/wiki/Unix_philosophy) stuff)
- Clear up any ESLint errors

**Front End**:

- Reduce the size of Webpack `bundle.js`
- Allow the user to select an incident from a list of incidents (rather than passing an ID as a query param)
- Use Redux for state management (Not as relevant for this demo, which renders a single incident and then doesn't change)
- Thoroughly test in multiple browsers and on multiple devices and make sure that the dashboard looks great at any resolution.
- Better leverage SASS and make the overall UI more polished and less bland.
- Use more interesting and meaningful map icons for incidents and responders. For example, incidents like Fires, Hazmat, and EMS incidents could be represented with flame, haz-mat/biohazard, and EMS (star of life) icons. Similarly, responding units could have different icons for different types.
- Generally, make as much use of general and reusable components as possible. The `IncidentMap` component for example, ideally should just be a `Map` that just displays generic map data.
- Make sure all components have `propTypes`, `defaultProps` and any needed PropType shapes defined.
- I would use CSS styles for vertical spacing instead of just throwing in `<br />` tags when needed.

**Back End**:

- Use an actual database instead of a pretend one
- Depending on how deep we need to go with enriching incident data, there could be a whole network of internal and external services and APIs that our API would coordinate with.
- Organize routes separate from app startup
- Use ES module imports instead of `require`

**Time Spent**: Approximately 9 Hours
