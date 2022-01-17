# Magic Mirror Module: Rejseplanen

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
        routes: routes: [
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
* Go to https://xmlopen.rejseplanen.dk/bin/rest.exe/location?input=slettebjerget&format=json

