# Magic Mirror Module: Rejseplanen
A Rejseplanen modules for magic mirror

## Installation

### Quick install
This will hopefully soon be a feature

### Manual install

- (1) Clone this repository in your `modules` folder, and install dependencies:
```bash
cd ~/MagicMirror/modules # adapt directory if you are using a different one
git clone https://github.com/runeharlyk/MMM-Rejseplanen
cd MMM-Rejseplanen
npm install
```

- (2) Add the module to your `config/config.js` file.
```js
{
    module: 'Rejseplanen',
    position: 'bottom_left',
    config: {
        updateInterval:60000,
        header: "Rejseplanen",
        routes: [
          {
            stopID: "<StopID>",
            destID: "<DestID>",
          },
          {
            stopID: "<StopID>",
            destID: "<DestID>",
          }
        ]
    }
},
```

### Configuration
| Entry | Description |
| --- | --- |
| header | Header showed above |
| routes* | List of trips you want to see travel times for |
| stopID* | The ID of the public transport depature stop |
| destID* | The ID of the public transport destination stop |

### stopID and destID
The stopID and destID can be optained from the following steps:
* Go to https://xmlopen.rejseplanen.dk/bin/rest.exe/location?format=json&input=YOUR_LOCATION_INPUT
* Replace "YOUR_LOCATION_INPUT" with a location near the stop you want to use
* Copy the id from the desired transportation stop under "StopLocation"

## License

### The MIT License (MIT)

Copyright © 2016 Joseph Bethge

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the “Software”), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

**The software is provided “as is”, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.**
