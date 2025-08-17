# Mars Rover Postcard

## Overview

Mars Rover Postcard is a web application that retrieves and displays
images taken by various Mars Rovers (Perseverance, Curiosity,
Opportunity, and Spirit) using NASA's Mars Rover Photos API. It presents
these images in a postcard-like interface, along with mission details
such as Earth date, Martian sol, mission days, camera used, and rover
status.

## Features

-   Select between different Mars Rovers.
-   Choose specific cameras or view photos from all cameras.
-   Displays key mission information (launch date, landing date, mission
    duration, status).
-   Randomly generates postcard views from available rover images.
-   Error handling for unavailable photos or connection issues.

## Technologies Used

-   **HTML5** for structure
-   **CSS3** for styling and layout
-   **JavaScript (ES6)** for logic and API interactions
-   **NASA Mars Rover Photos API** for real rover imagery and data

## Project Structure

    ├── index.html        
    ├── icon.ico          
    ├── js/
    ├── ui-service.js
    ├── api-service.js
    ├── main.js
    ├── styles.css/
    ├── main.css
    └── README.md         

## Getting Started

1.  Clone this repository:

    ``` bash
    git clone https://github.com/nullsec0x/mrp.git
    cd mrp
    ```

2.  Open `index.html` in your browser to run the application.

3.  Ensure you have a valid NASA API key (replace the placeholder in the
    script if needed).\
    You can request one from [NASA APIs](https://api.nasa.gov/).

## Acknowledgments

-   NASA's Mars Rover Photos API for providing real rover images and
    mission data.

------------------------------------------------------------------------

Created by **Nullsec0x**
